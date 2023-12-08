const { log } = require('console')
const fs = require('fs')

const text = fs.readFileSync('./input.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

// parse directions
const directions = lines[0].split('').map(value => value === 'L' ? 0 : 1)

log(directions)

// parse map
const nodeMap = new Map()
for (let i = 2; i < lines.length; i++) {
    const node = lines[i];
    const [key, left, right] = node.match(/[A-Z]{3}/g)
    nodeMap.set(key, [left, right])
}

log(nodeMap)

// loop through directions until we land at ZZZ
let nextKey = 'AAA'
let visitCount = 0
while(nextKey !== 'ZZZ') {
    log(nextKey)
    const directionIndex = visitCount % directions.length
    const currentNode = nodeMap.get(nextKey)
    nextKey = currentNode[directions[directionIndex]]
    visitCount++
}

log(visitCount)