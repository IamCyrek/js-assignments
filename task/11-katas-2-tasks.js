'use strict';

/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
function parseBankAccount(bankAccount) {
    function sum(ii, jj) {
        let kol = 0;
        for(let i = ii; i < ii + 3; i++) {
            for (let j = jj; j < jj + 3; j++) {
                if (arr[i][j] !== " ") {
                    kol++;
                }
            }
        }
        return kol;
    }

    let arr = bankAccount.split("\n");
    let ans = "";
    for(let i = 0; i < arr[0].length; i+= 3) {
        let ansfromfunc = sum(0, i);

        if (ansfromfunc === 6) {
            if (arr[2][i] === " ") {
                ans += "9";
            } else if (arr[1][i + 2] === " ") {
                ans += "6";
            } else {
                ans += "0";
            }
        } else if (ansfromfunc === 2) {
            ans += "1";
        } else if (ansfromfunc === 5) {
            if (arr[2][i] !== " ") {
                ans += "2";
            } else if (arr[1][i + 2] !== " ") {
                ans += "3";
            } else {
                ans += "5";
            }
        } else if (ansfromfunc === 4) {
            ans += "4";
        } else if (ansfromfunc === 3) {
            ans += "7";
        } else  {
            ans += "8";
        }
    }
    return ans;
}


/**
 * Returns the string, but with line breaks inserted at just the right places to make sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>  'The String global object',
 *                                                                                                'is a constructor for',
 *                                                                                                'strings, or a sequence of',
 *                                                                                                'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>  'The String',
 *                                                                                                'global',
 *                                                                                                'object is a',
 *                                                                                                'constructor',
 *                                                                                                'for strings,',
 *                                                                                                'or a',
 *                                                                                                'sequence of',
 *                                                                                                'characters.'
 */
function* wrapText(text, columns) {
    let arr = text.split(" ");
    let kol = 0;
    let substr = "";
    while (kol < arr.length) {
        if (substr.length + arr[kol].length < columns) {
            if (substr.length === 0) {
                substr = arr[kol++];
            } else {
                substr += " " + arr[kol++];
            }
        } else {
            yield substr;
            substr = "";
        }
    }
    if (substr.length > 0) {
        yield substr;
    }
}


/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
const PokerRank = {
    StraightFlush: 8,
    FourOfKind: 7,
    FullHouse: 6,
    Flush: 5,
    Straight: 4,
    ThreeOfKind: 3,
    TwoPairs: 2,
    OnePair: 1,
    HighCard: 0
}

function getPokerHandRank(hand) {
    let arr = hand.map((value) => {
        let curval;
        if (parseInt(value[0]) >= 2 && parseInt(value[0]) <= 9) {
            curval = parseInt(value[0]);
        } else if (value[0] === "1") {
            curval = 10;
        } else if (value[0] === "J") {
            curval = 11;
        } else if (value[0] === "Q") {
            curval = 12;
        } else if (value[0] === "K") {
            curval = 13;
        } else {
            curval = 14;
        }

        if (value[value.length - 1] === "♠") {
            curval += 100;
        } else if (value[value.length - 1] === "♥") {
            curval += 1000;
        } else if (value[value.length - 1] === "♣") {
            curval += 10000;
        } else {
            curval += 100000;
        }
        return curval;
    }).sort((a, b) => {
        if (a % 100 < b % 100) {
            return -1;
        }
        if (a % 100 === b % 100) {
            return 0;
        }
        return 1;
    });

    if (arr[0] + 1 === arr[1] &&
        arr[1] + 1 === arr[2] &&
        arr[2] + 1 === arr[3] &&
        arr[3] + 1 === arr[4] ||
        arr[4] % 100 === 14 &&
        2 === arr[0] % 100 &&
        parseInt(arr[0] / 100) === parseInt(arr[1] / 100) &&
        arr[0] + 1 === arr[1] &&
        arr[1] + 1 === arr[2] &&
        arr[2] + 1 === arr[3]) {
        return PokerRank.StraightFlush;
    }
    if (arr[0] % 100 === arr[1] % 100 &&
        arr[1] % 100 === arr[2] % 100 &&
        arr[2] % 100 === arr[3] % 100 ||
        arr[1] % 100 === arr[2] % 100 &&
        arr[2] % 100 === arr[3] % 100 &&
        arr[3] % 100 === arr[4] % 100) {
        return PokerRank.FourOfKind;
    }
    if (arr[0] % 100 === arr[1] % 100 &&
        arr[1] % 100 === arr[2] % 100 &&
        arr[3] % 100 === arr[4] % 100 ||
        arr[0] % 100 === arr[1] % 100 &&
        arr[2] % 100 === arr[3] % 100 &&
        arr[3] % 100 === arr[4] % 100) {
        return PokerRank.FullHouse;
    }
    if (parseInt(arr[0] / 100) === parseInt(arr[1] / 100) &&
        parseInt(arr[1] / 100) === parseInt(arr[2] / 100) &&
        parseInt(arr[2] / 100) === parseInt(arr[3] / 100) &&
        parseInt(arr[3] / 100) === parseInt(arr[4] / 100)) {
        return PokerRank.Flush;
    }
    if (arr[0] % 100 + 1 === arr[1] % 100 &&
        arr[1] % 100 + 1 === arr[2] % 100 &&
        arr[2] % 100 + 1 === arr[3] % 100 &&
        arr[3] % 100 + 1 === arr[4] % 100 ||
        arr[4] % 100 === 14 && 2 === arr[0] % 100 &&
        arr[0] % 100 + 1 === arr[1] % 100 &&
        arr[1] % 100 + 1 === arr[2] % 100 &&
        arr[2] % 100 + 1 === arr[3] % 100) {
        return PokerRank.Straight;
    }
    if (arr[0] % 100 === arr[1] % 100 &&
        arr[1] % 100 === arr[2] % 100 ||
        arr[1] % 100 === arr[2] % 100 &&
        arr[2] % 100 === arr[3] % 100 ||
        arr[2] % 100 === arr[3] % 100 &&
        arr[3] % 100 === arr[4] % 100) {
        return PokerRank.ThreeOfKind;
    }
    if (arr[0] % 100 === arr[1] % 100 &&
        arr[2] % 100 === arr[3] % 100 ||
        arr[0] % 100 === arr[1] % 100 &&
        arr[3] % 100 === arr[4] % 100 ||
        arr[1] % 100 === arr[2] % 100 &&
        arr[3] % 100 === arr[4] % 100) {
        return PokerRank.TwoPairs;
    }
    if (arr[0] % 100 === arr[1] % 100 ||
        arr[2] % 100 === arr[3] % 100 ||
        arr[3] % 100 === arr[4] % 100) {
        return PokerRank.OnePair;
    }
    return PokerRank.HighCard;
}


/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +, vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 * 
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 * 
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+              '+------------+\n'+
 *    '|            |\n'+              '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+       =>     '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+              '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'               '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
function* getFigureRectangles(figure) {
   throw new Error('Not implemented');
}


module.exports = {
    parseBankAccount : parseBankAccount,
    wrapText: wrapText,
    PokerRank: PokerRank,
    getPokerHandRank: getPokerHandRank,
    getFigureRectangles: getFigureRectangles
};
