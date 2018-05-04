'use strict';

/**
 * Returns true if word occurrs in the specified word snaking puzzle.
 * Each words can be constructed using "snake" path inside a grid with top, left, right and bottom directions.
 * Each char can be used only once ("snake" should not cross itself).
 *
 * @param {array} puzzle
 * @param {array} searchStr
 * @return {bool}
 *
 * @example
 *   var puzzle = [ 
 *      'ANGULAR',
 *      'REDNCAE',
 *      'RFIDTCL',
 *      'AGNEGSA',
 *      'YTIRTSP',
 *   ]; 
 *   'ANGULAR'   => true   (first row)
 *   'REACT'     => true   (starting from the top-right R adn follow the ↓ ← ← ↓ )
 *   'UNDEFINED' => true
 *   'RED'       => true
 *   'STRING'    => true
 *   'CLASS'     => true
 *   'ARRAY'     => true   (first column)
 *   'FUNCTION'  => false
 *   'NULL'      => false 
 */
function findStringInSnakingPuzzle(puzzle, searchStr) {
    let masbool;
    function check(ii, jj, index) {
        masbool[ii][jj] = 1;
        if (index === searchStr.length) {
            return true;
        }

        let boolean = false;
        if (ii > 0 && masbool[ii - 1][jj] === 0 && puzzle[ii - 1][jj] === searchStr[index]) {
            masbool[ii - 1][jj] = 1;
            boolean = boolean || check(ii - 1, jj, index + 1);
        }
        if (ii + 1 < puzzle.length && masbool[ii + 1][jj] === 0 && puzzle[ii + 1][jj] === searchStr[index]) {
            masbool[ii + 1][jj] = 1;
            boolean = boolean || check(ii + 1, jj, index + 1);
        }
        if (jj > 0 && masbool[ii][jj - 1] === 0 && puzzle[ii][jj - 1] === searchStr[index]) {
            masbool[ii][jj - 1] = 1;
            boolean = boolean || check(ii, jj - 1, index + 1);
        }
        if (jj + 1 < puzzle[0].length && masbool[ii][jj + 1] === 0 && puzzle[ii][jj + 1] === searchStr[index]) {
            masbool[ii][jj + 1] = 1;
            boolean = boolean || check(ii, jj + 1, index + 1);
        }
        masbool[ii][jj] = 0;
        return boolean
    }

    for (let i = 0; i < puzzle.length; i++) {
        for (let j = 0; j < puzzle[i].length; j++) {
            masbool = Array(puzzle.length).fill().map((value) => Array(puzzle[0].length).fill(0));
            if (puzzle[i][j] === searchStr[0] && check(i, j, 1)) {
                return true;
            }
        }
    }
    return false;
}


/**
 * Returns all permutations of the specified string.
 * Assume all chars in the specified string are different.
 * The order of permutations does not matter.
 * 
 * @param {string} chars
 * @return {Iterable.<string>} all posible strings constructed with the chars from the specfied string
 *
 * @example
 *    'ab'  => 'ab','ba'
 *    'abc' => 'abc','acb','bac','bca','cab','cba'
 */
function* getPermutations(chars) {
    function generate(str) {
        if (str.length === 0) {
            return;
        }
        let ans = [];
        for (let i = 0; i < str.length; i++) {
            let arr = generate(str.slice(0, i) + str.slice(i + 1));
            if (arr) {
                for (let j = 0; j < arr.length; j++) {
                    ans.push(str[i] + arr[j]);
                }
            } else {
                ans.push(str[i]);
            }
        }
        return ans;
    }

    for (let a of generate(chars)) {
        yield a;
    }
}


/**
 * Returns the most profit from stock quotes.
 * Stock quotes are stores in an array in order of date.
 * The stock profit is the difference in prices in buying and selling stock.
 * Each day, you can either buy one unit of stock, sell any number of stock units you have already bought, or do nothing. 
 * Therefore, the most profit is the maximum difference of all pairs in a sequence of stock prices.
 * 
 * @param {array} quotes
 * @return {number} max profit
 *
 * @example
 *    [ 1, 2, 3, 4, 5, 6]   => 15  (buy at 1,2,3,4,5 and then sell all at 6)
 *    [ 6, 5, 4, 3, 2, 1]   => 0   (nothing to buy)
 *    [ 1, 6, 5, 10, 8, 7 ] => 18  (buy at 1,6,5 and sell all at 10)
 */
function getMostProfitFromStockQuotes(quotes) {
    throw new Error('Not implemented');
}


/**
 * Class representing the url shorting helper.
 * Feel free to implement any algorithm, but do not store link in the key\value stores.
 * The short link can be at least 1.5 times shorter than the original url.
 * 
 * @class
 *
 * @example
 *    
 *     var urlShortener = new UrlShortener();
 *     var shortLink = urlShortener.encode('https://en.wikipedia.org/wiki/URL_shortening');
 *     var original  = urlShortener.decode(shortLink); // => 'https://en.wikipedia.org/wiki/URL_shortening'
 * 
 */
function UrlShortener() {
    this.urlAllowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
                           "abcdefghijklmnopqrstuvwxyz"+
                           "0123456789-_.~!*'();:@&=+$,/?#[]";
}

UrlShortener.prototype = {

    encode: function(url) {
        throw new Error('Not implemented');
    },
    
    decode: function(code) {
        throw new Error('Not implemented');
    } 
}


module.exports = {
    findStringInSnakingPuzzle: findStringInSnakingPuzzle,
    getPermutations: getPermutations,
    getMostProfitFromStockQuotes: getMostProfitFromStockQuotes,
    UrlShortener: UrlShortener
};
