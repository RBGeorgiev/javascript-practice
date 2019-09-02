// Check if palindrome

function palindrome(str) {
    return str === str.split('').reverse().join('');
}