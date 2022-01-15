const { repeatWord } = require('../src/helpers/stringHelpers');

test(`f is expanded to ffffff`, () => expect(repeatWord('f', 6)).toBe('ffffff'));
test(`ab is expanded to ababab`, () => expect(repeatWord('ab', 3)).toBe('ababab'));
