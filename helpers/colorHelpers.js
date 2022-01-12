import { repeatWord } from "./stringHelpers";

export const COLORS = {
    white: 'FFFFFF',
};

/**
 * Expand the color to a full 6 digit hezadecimal
 * 
 * @param {string} color the color to expand from 1 to 3 digits only
 * @returns {string} The expanded color
 */
export const expand = color => {

    if (color.length > 3 || color.length <= 0) return color;

    if (color.length === 3) {
        return repeatWord(color.charAt(0), 2) + repeatWord(color.charAt(1), 2) + repeatWord(color.charAt(2), 2);
    } else if (color.length === 2) {
        return repeatWord(color.charAt(0), 3) + repeatWord(color.charAt(1), 3);
    } else {
        return repeatWord(color.charAt(0), 6);
    }
}

/**
 * Check if the given color is white
 * 
 * @param {string} color 
 * @returns {boolean}
 */
export const isWhite = color => expand(color) === COLORS.white;


/**
 * Callback function to be use it with the selection of the palette elements
 * 
 * @param {NodeList} palette
 * @returns {Object} The information about the palette
 */
export const paletteStripe = palette => {
    const paletteData = {};

    palette.forEach(color => {
        const hex = color.querySelector('span').innerText;
        const classes = Array.from(color.classList);

        colorData[hex] = {
            active: classes.includes('is-active'),
            isLight: Array.from(color.classList).includes('is-light'),
        }
    });

    return paletteData;
};