const { log } = require('console')
const fs = require('fs')

// Two gold stars. Didn't bother to make a separate file for this one, so the first answer is lost.

const text = fs.readFileSync('./input.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

// parse times
const time = lines[0].substring(lines[0].indexOf(":") + 1).trim()
    .split(/( )+/)
    .filter(val => /\d/.test(val))
    .map(val => val.trim())
    .reduce((previous, current) => previous + current)

log(time)

// parse distances
const distanceRecord = lines[1].substring(lines[1].indexOf(":") + 1).trim()
    .split(/( )+/)
    .filter(val => /\d/.test(val))
    .map(val => val.trim())
    .reduce((previous, current) => previous + current)

log(distanceRecord)

// for each race
const raceResults = [0]
for (let timeWaited = 1; timeWaited < time; timeWaited++) {
    const speed = timeWaited
    const timeLeft = time - timeWaited
    const distanceAchieved = speed * timeLeft
    
    if (distanceAchieved > distanceRecord) {
        // add one to that race
        raceResults[0] += 1
    }
}

log(raceResults)