/**
 * 
 * @param {string} word 
 * @param {number} times 
 */
export const repeatWord = (word, times) => {
    let words = [];

    while(words.toString().length < times) {
        words.push(word);
    }

    return words.join('');
}