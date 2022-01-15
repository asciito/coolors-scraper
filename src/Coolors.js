const getPage = require('./core/page');
const { normalizeColor } = require('./helpers/colorHelpers');


class Coolors
{
    constructor(color)
    {
        this._page = getPage(color);
        this._colors = {
            hex: `#${normalizeColor(color)}`,
            stripes: {},
        };
    }

    /**
     * Extract the shades of the color you choose
     * 
     * @returns 
     */
    async getShades() {
        if (! this._colors.stripes['shades']) {
            const { page } = await this._page;
            await page.waitForSelector('.palette-stripe_colors');

            this._colors.stripes['shades'] = await page.$$eval(this._selectStripe('shades'), this._paletteStripe);
        }
    }

     /**
     * Extract the tints of the color you choose
     * 
     * @returns 
     */
    async getTints() {
        if (! this._colors.stripes['tints']) {
            const { page } = await this._page;
            await page.waitForSelector('.palette-stripe_colors');

            this._colors.stripes['tints'] = await page.$$eval(this._selectStripe('tints'), this._paletteStripe);
        }
    }

    /**
     * Extract the tones of the color you choose
     * 
     * @returns 
     */
    async getTones() {
        if (! this._colors.stripes['tones']) {
            const { page } = await this._page;
            await page.waitForSelector('.palette-stripe_colors');

            this._colors.stripes['tones'] = await page.$$eval(this._selectStripe('tones'), this._paletteStripe);
        }
    }

    /**
     * Extract the hues of the color you choose
     * 
     * @returns 
     */
    async getHues() {
        if (! this._colors.stripes['hues']) {
            const { page } = await this._page;
            await page.waitForSelector('.palette-stripe_colors');

            this._colors.stripes['hues'] = await page.$$eval(this._selectStripe('hues'), this._paletteStripe);
        }
    }

    colors() {
        return this._colors;
    }

    async close() {
        const {page, browser} = await this._page;

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

    _selectStripe(option) {
        return `#color-picker-page_variations_${ option } .palette-stripe_colors > div[style]`;
    }
}

module.exports = Coolors;