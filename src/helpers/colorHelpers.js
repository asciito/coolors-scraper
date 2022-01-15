const { repeatWord } = require("./stringHelpers.js");

exports.COLORS = {
    white: 'FFFFFF',
};

/**
 * Check if the given string is a hex number
 * 
 * @param {String|Number} hex The string to check if is a hex numebr
 * @returns
 */
const isHex = (hex) => Boolean(hex.toString().match(/[0-9a-f]+$/i));

exports.isColor = color => {
    const white = 0xFFFFFF;
    const black = 0x000000;
    
    if (! isHex(color)) {
        return false;
    }

    return parseInt(color, 16) <= white && parseInt(color, 16) >= black;
}

/**
 * Expand the color to a full 6 digit hezadecimal
 * 
 * @param {string} color the color to expand from 1 to 3 digits only
 * @returns {string} The expanded color
 * @throws Throws an error if the value is not a color
 */
 exports.expand = color => {
    const length = color.length;

    if (! this.isColor(color)) {
        throw Error('The value is not a color');
    }

    if (length > 6 || length <= 0) return color;

    if (length > 3) {
        return color.slice(0, length - 1) + repeatWord(color.charAt(length - 1), 7 - length);
    } else if (length === 3) {
        return repeatWord(color.charAt(0), 2) + repeatWord(color.charAt(1), 2) + repeatWord(color.charAt(2), 2);
    } else if (length === 2) {
        return repeatWord(color, 3);
    } else {
        return repeatWord(color, 6);
    }
}

/**
 * Check if the given color is white
 * 
 * @param {string} color 
 * @returns {boolean}
 */
 exports.isWhite = color => expand(color) === COLORS.white;

/**
 * Add transparency to the color
 * 
 * @param {String } color 
 * @param {Number} procentage  The porcentage needs to be greater or equal to 0, and less or equal to 1
 */
 exports.addTransparency = (color, porcentage = 0) => {

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
 exports.normalizeColor = color => {
    /**
     * TODO:
     * - Validate is a color
     * - Expand the color
     */
    return this.expand(color.toUpperCase());
}