
const { log } = require('console')
const fs = require('fs')

// GOLD STAR

const text = fs.readFileSync('./input3.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

var finalSum = 0; // Sum of power of each gear

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

    // find the * symbols
    const numPotentialGears = (currentLine.match(/\*/g) || []).length

    log(numPotentialGears)

    let previousPotentialGearIndex = -1;
    for(let i = 0; i < numPotentialGears; i++) {
        finalSum += gearValue(previousPotentialGearIndex, [lineAbove.split(""), currentLine.split(""), lineBelow.split("")]); // zero if not a gear.
        previousPotentialGearIndex = currentLine.indexOf('*', previousPotentialGearIndex+1)
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

function gearValue(prevGearIndex, lines) {
    const gearIndex = lines[1].indexOf('*', prevGearIndex+1)
    const length = 1

    const startLeft = Math.max(gearIndex - 1, 0)
    const endRight = Math.min(gearIndex + length + 1, currentLine.length)

    log("gear index: " + gearIndex)
    // log("start left: " + startLeft)
    // log("end right, " + endRight)

    // return multiple of two values 
    const adjacentNumbers = getNumbersTouchingPotentialGear(startLeft, endRight, lines)
    log(adjacentNumbers)

    if (adjacentNumbers.length === 2) {
        return adjacentNumbers[0] * adjacentNumbers[1]
    } else {
        return 0;
    }
}

function getNumbersTouchingPotentialGear(startIndex, endIndex, lines) {
    const numbers = [];
    // start at top left
    for(let y = 0; y < 3; y++) { // loop through lines
        for (let x = startIndex; x < endIndex; x++) { // loop across line
            if (lines[y][x].match(/\d/)) {
                log("is integer")
                // find the whole number
                const numberParts = [lines[y][x]]
                let dx = x - 1
                while (dx >= 0 && lines[y][dx].match(/\d/)) {
                    numberParts.unshift(lines[y][dx])
                    lines[y][dx] = '.'
                    dx -= 1
                }

                dx = x + 1
                while (dx < lines[y].length && lines[y][dx].match(/\d/)) {
                    numberParts.push(lines[y][dx])
                    lines[y][dx] = '.'
                    dx += 1
                }
                log(numberParts)

                const compiledNumber = numberParts.join("")
                log(compiledNumber)
                numbers.push(Number(compiledNumber))
            }
        }
    }

    return numbers
}