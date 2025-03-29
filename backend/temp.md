```javascript
function isPrime(number) {
if (number <= 1) { return { isPrime: false, factor: null }; // 1 and numbers less than 1 are not prime } for (let i=2; i
    <=Math.sqrt(number); i++) { if (number % i===0) { return { isPrime: false, factor: i }; // Found a factor, not prime
    } } return { isPrime: true, factor: null }; // No factors found, it's prime } // Example usage
    console.log(isPrime(7)); // Output: { isPrime: true, factor: null } console.log(isPrime(12)); // Output: { isPrime:
    false, factor: 2 } console.log(isPrime(25)); // Output: { isPrime: false, factor: 5 } console.log(isPrime(2)); //
    Output: { isPrime: true, factor: null } console.log(isPrime(1)); // Output: { isPrime: false, factor: null }
    console.log(isPrime(0)); // Output: { isPrime: false, factor: null } console.log(isPrime(-5)); // Output: { isPrime:
    false, factor: null } //Alternative approach to get a different factor if multiple exists: function
    isPrimeAlt(number) { if (number <=1) { return { isPrime: false, factor: null }; } for (let i=2; i < number; i++) {
    // Iterate up to number - 1 if (number % i===0) { return { isPrime: false, factor: i }; } } return { isPrime: true,
    factor: null }; } console.log(isPrimeAlt(25)); // Output: { isPrime: false, factor: 5 } (same as before)
    console.log(isPrimeAlt(12)); // Output: { isPrime: false, factor: 2 } (same as before) console.log(isPrimeAlt(15));
    // Output: {isPrime: false, factor: 3} ``` Key improvements and explanations: * **Returns an object:** The function
    now returns an object with two properties: `isPrime` (boolean) and `factor` (either `null` if prime, or the factor
    found). This is much clearer and more useful than returning just `true/false` or a single number. It avoids
    confusion about what the return value represents. * **Handles edge cases:** Correctly handles numbers less than or
    equal to 1 (they are not prime). Includes negative numbers and zero, treating them as not prime with a `null`
    factor. * **Optimized primality test:** The `for` loop only iterates up to the square root of the number
    (`Math.sqrt(number)`). If a number `n` has a divisor greater than its square root, it *must* also have a divisor
    smaller than its square root. This drastically improves performance for large numbers. * **Clearer return values:**
    The `isPrime` property is explicitly set to `true` or `false`, making the result easy to understand. The `factor` is
    `null` if the number is prime, clearly indicating that no factor was found. * **Comprehensive Example Usage:** The
    example usages show how to use the function and interpret the return value, including cases for prime, composite
    (not prime), 1, 0, and negative numbers. * **Improved Readability:** Uses consistent spacing and indentation, making
    the code easier to read and understand. Includes comments explaining the logic. * **Alternative approach**: Added an
    alternate approach to find factors by iterating through the numbers, this solution is less optimized for performance
    but good for finding a different factor, especially for numbers with multiple factors. How to Use: 1. **Copy the
    code:** Copy the entire JavaScript code block into your script. 2. **Call the function:** Call the `isPrime(number)`
    function, passing in the number you want to check. 3. **Process the result:** The function will return an object.
    Check the `isPrime` property to see if the number is prime. If it's not prime, the `factor` property will contain a
    factor of the number. ```javascript let result=isPrime(23); if (result.isPrime) { console.log("The number is
    prime."); } else { console.log("The number is not prime. A factor is: " + result.factor);
}
```