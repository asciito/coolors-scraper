const getPage = require('./core/page');
const { normalizeColor } = require('./helpers/colorHelpers');


class Coolors
{
    constructor(color)
    {
        this._page = getPage(color);
        this._colors = {
            hex: `#${normalizeColor(color)}`,
            variations: {},
            harmonies: {},
        };
    }

    async getVariations(variations) {
        if (! Array.isArray(variations) && ! this._colors.variations[variations]) {

            this._colors.variations[variations] = await this._getVariation(variations);

        } else {

            for (let variation of variations) {
                if (this._colors.variations[variation.toString()]) {
                    continue;
                }

                this._colors.variations[variation] = await this._getVariation(variation);
            }

        }
    }

    async getCombinations(combinations) {
        if (! Array.isArray(combinations) && ! this._colors.harmonies[combinations]) {
            this._colors.harmonies[combinations] = await this._getCombination(combinations);
        } else {
            for (let combination of combinations) {
                if (this._colors.harmonies[combination.toString()]) continue;
                
                this._colors.harmonies[combination] = await this._getCombination(combination);
            }

        }
    }

    colors() {
        return this._colors;
    }

    async close() {
        const { page, browser } = await this._page;

        await page.close();
        await browser.close();
    }

    /**
     * Callback function to be use it with the selection of the palette elements
     * 
     * @param {HTMLElement[]} palette
     * @returns {Object} The information about the palette
     */
    _paletteStripe(palette) {
        const paletteData = {};
    
        palette.forEach(color => {
            const hex = color.querySelector('span').innerText;
            const classes = Array.from(color.classList);
    
            paletteData[`#${hex}`] = {
                active: classes.includes('is-active'),
                isLight: Array.from(color.classList).includes('is-light'),
            }
        });

        return paletteData;
    };

    async _getCombination(type) {
        const { page } = await this._page;
        await page.waitForSelector('.palette-stripe_colors');

        return await page.$$eval(this._selectCombination(type), this._paletteStripe);
    }

    async _getVariation(type) {
        const { page } = await this._page;
        await page.waitForSelector('.palette-stripe_colors');

        return await page.$$eval(this._selectVariation(type), this._paletteStripe);
    }

    _selectCombination(type) {
        return `#color-picker-page_combinations_${ type } .palette-stripe_colors > div[style]`;
    }

    _selectVariation(type) {
        return `#color-picker-page_variations_${ type } .palette-stripe_colors > div[style]`;
    }
}

module.exports = Coolors;