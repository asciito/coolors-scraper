const { isColor, expand } = require("../src/helpers/colorHelpers.js");


const color = 'f';


// Test if is a color
test(`Check if '${color}' is a color`, () => expect(isColor(color)).toBe(true));

test(`f is expanded to ffffff`, () => expect(expand('f')).toBe('ffffff'));
test(`ab is expanded to aaabbb`, () => expect(expand('ab')).toBe('ababab'));
test(`abcd is expanded to abcddd`, () => expect(expand('abcd')).toBe('abcddd'));