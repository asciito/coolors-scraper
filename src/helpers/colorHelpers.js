import { repeatWord } from "./stringHelpers";

export const COLORS = {
    white: 'FFFFFF',
};

/**
 * Check if the given string is a hex number
 * 
 * @param {String|Number} hex The string to check if is a hex numebr
 * @returns
 */
const isHex = (hex) => Boolean(hex.toString().match(/[0-9a-f]+$/i));

export const isColor = color => {
    const white = 0xFFFFFF;
    const black = 0x000000;

    
    if (! isHex(color)) {
        return false;
    }

    return color >= white && color <= black;
}

/**
 * Expand the color to a full 6 digit hezadecimal
 * 
 * @param {string} color the color to expand from 1 to 3 digits only
 * @returns {string} The expanded color
 * @throws Throws an error if the value is not a color
 */
export const expand = color => {

    if (! isColor(color)) {
        throw Error('The value is not a color');
    }

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
 * Add transparency to the color
 * 
 * @param {String } color 
 * @param {Number} procentage  The porcentage needs to be greater or equal to 0, and less or equal to 1
 */
export const addTransparency = (color, porcentage = 0) => {

    if (! isColor(color)) {
        throw Error('You cannot add transparency to a non color');        
    }

    if (porcentage < 0) {
        return `${color}00`;
    } else if (porcentage > 1.0) {
        return `${color}ff`
    }

    return color + parseInt(0xFF * porcentage, 16);
}

/**
 * Normalize the color
 * 
 * @param {String} color 
 * @returns 
 */
 export const normalizeColor = color => {
    /**
     * TODO:
     * - Validate is a color
     * - Expand the color
     */
    return expand(color.toUpperCase());
}

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