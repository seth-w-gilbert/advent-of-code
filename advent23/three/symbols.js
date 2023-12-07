
const { log } = require('console')
const fs = require('fs')

// GOLD STAR

const text = fs.readFileSync('./input3.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

// log(lines)

var finalSum = 0; // Sum all numbers adjacent to symbols

// for (let i = 108; i < 109; i++) {
for (let i = 0; i < lines.length; i++) {
    var lineAbove;
    var currentLine = lines[i];
    var lineBelow;

    // find the right lines
    if (i === 0) {
        lineAbove = Array(lines[0].length)
            .fill(".", 0, lines[0].length)
            .reduce((prev, current) => prev + current)
    } else {
        lineAbove = lines[i-1];
    }

    if (i < lines.length - 1) {
        lineBelow = lines[i+1];
    } else {
        lineBelow = Array(lines[0].length)
            .fill(".", 0, lines[0].length)
            .reduce((prev, current) => prev + current)
    }

    log(lineAbove)
    log(currentLine)
    log(lineBelow)

    const numbers = currentLine.match(/\d+/g) || []

    log(numbers)

    for(let i = 0; i < numbers.length; i++) {
        // log(isNumberAdjacentToSymbol(number, lineAbove, currentLine, lineBelow))
        let prevNumber = i > 0 ? numbers[i-1] : '';
        if (isNumberAdjacentToSymbol(prevNumber, numbers[i], lineAbove, currentLine, lineBelow)) {
            log("adding")
            finalSum += Number(numbers[i]);
        } else {
            // log("not adding")
        }
    }
    log()
}

log("final sum: " + finalSum)

// Guesses:
// 545225 is too high
// 527306 is too low...

/**
 * 
 *  Helper Functions
 * 
 */

function isNumberAdjacentToSymbol(previousNumberString, numberString, lineAbove, currentLine, lineBelow) {
    const indexOfNumber = currentLine.indexOf(numberString, currentLine.indexOf(previousNumberString)+previousNumberString.length)
    const length = numberString.length

    const startLeft = Math.max(indexOfNumber - 1, 0)
    const endRight = Math.min(indexOfNumber + length + 1, currentLine.length)

    log(numberString)
    // log("start left: " + startLeft)
    // log("end right, " + endRight)

    return isSymbolInRange(lineAbove, startLeft, endRight)
        || isSymbolInRange(currentLine, startLeft, endRight)
        || isSymbolInRange(lineBelow, startLeft, endRight)

}

function isSymbolInRange(line, startIndex, endIndex) {
    // log(/[^0-9.]/.exec(line.substring(startIndex, endIndex)))
    log(line.substring(startIndex, endIndex))
    return /[^0-9.]/.test(line.substring(startIndex, endIndex))
}