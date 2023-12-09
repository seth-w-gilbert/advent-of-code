const { log } = require('console')
const fs = require('fs')
const interpolatingPolynomial = require('interpolating-polynomial')

const text = fs.readFileSync('./input.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

let sum = 0;
for(line of lines) {
    const points = line.split(" ").map((val, index) => [index, Number(val)])
    // log(points)

    const f = interpolatingPolynomial(points)
    // const nextVal = f(points.length) // part 1
    // log(nextVal)
    // sum += nextVal

    const prevVal = f(-1) // part 2
    sum += prevVal
}

log(sum)