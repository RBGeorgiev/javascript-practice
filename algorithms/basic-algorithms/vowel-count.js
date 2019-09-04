// Count number of vowels in the text. Report a sum of each vowel found

function vowelCount(str) {
    let vowels = {
        'total': 0,
        'a': 0,
        'e': 0,
        'i': 0,
        'o': 0,
        'u': 0
    };

    str = str.toLowerCase();

    for (let l of str) {
        if (vowels.hasOwnProperty(l)) {
            vowels[l]++;
            vowels['total']++;
        }
    }

    return vowels;
}