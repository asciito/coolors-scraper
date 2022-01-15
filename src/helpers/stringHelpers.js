/**
 * 
 * @param {string} word 
 * @param {number} times 
 */
exports.repeatWord = (word, times) => {
    let words = [];

    while(words.length < times) {
        words.push(word);
    }

    return words.join('');
}