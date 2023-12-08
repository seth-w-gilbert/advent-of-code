const { log } = require('console')
const fs = require('fs')
var lcm = require( 'compute-lcm' );

const text = fs.readFileSync('./input.txt').toString('utf-8')
// const text = fs.readFileSync('./sample2.txt').toString('utf-8')

const lines = text.split("\n")

// parse directions
const directions = lines[0].split('').map(value => value === 'L' ? 0 : 1)

log(directions)

// parse map
const nodeMap = new Map()
const currentNodes = []
for (let i = 2; i < lines.length; i++) {
    const node = lines[i];
    const [key, left, right] = node.match(/[A-Z1-2]{3}/g)
    nodeMap.set(key, [left, right])
    if (key.charAt(2) === 'A') {
        currentNodes.push(key)
    }
}

log(nodeMap)

// loop through directions until we land at all nodes ending in Z
// not going to work in a reasonable amount of time.
// let visitCount = 0
// while(!currentNodes.every(val => val.charAt(2) === 'Z')) {
//     // log(currentNodes)
//     const directionIndex = visitCount % directions.length
//     for(let i = 0; i < currentNodes.length; i++) {
//         const currentKey = currentNodes[i];
//         const map = nodeMap.get(currentKey)

//         currentNodes[i] = map[directions[directionIndex]]
//     }
//     visitCount++

//     if(visitCount % 1000000 == 0) {
//         log(visitCount)
//     }
//     // log(currentNodes)
// }

// loop through directions until we land at **Z
const firstZCount = []
for (let i = 0; i < currentNodes.length; i++) {
    let nextKey = currentNodes[i];
    let visitCount = 0
    let zs = [];
    while (zs.length < 1) {
        const directionIndex = visitCount % directions.length
        const currentNode = nodeMap.get(nextKey)
        nextKey = currentNode[directions[directionIndex]]
        visitCount++
        if (nextKey.charAt(2) === 'Z') {
            firstZCount.push(visitCount)
            zs.push(visitCount)
        }
    }
}
log(firstZCount)
log(lcm(...firstZCount))

// lesson learned, do some research on the input set and intermidiary results.
// I don't feel good about this, but I went to the subreddit and saw a lot of LCM in
// the title of posts, so I used that information to come to the solution.
// I knew to abandon brute force once that was taking a long time to come to a 10 digit
// answer and reddit was saying things around 14 digits.

// log(visitCount)