/*
Find all the anagrams of a word from a list given two inputs: a word, and an array with words. 
Return an array of all the anagrams, or an empty array if there are none. 
For example:
    anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']) ===> ['aabb', 'bbaa']
    anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']) ===> ['carer', 'racer']
*/

function anagrams(word, words) {
    let result = [];
    let sortedWord = [...word].sort().join('')

    for (let i = 0; i < words.length; i++) {
        if (word.length === words[i].length) {
            let curWord = [...words[i]].sort().join('');
            if (sortedWord === curWord) result.push(words[i]);
        }
    }
    return result;
}