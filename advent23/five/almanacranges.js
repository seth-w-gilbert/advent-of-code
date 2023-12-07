const { log } = require('console')
const fs = require('fs')

// Takes too long to run
// But got the GOLD STAR
// 1493866

const text = fs.readFileSync('./input.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

// parse seeds
const seeds = lines[0].substring(lines[0].indexOf(":") + 1).trim().split(" ").map(value => Number(value))

log("Seeds:")
log(seeds)

// parse each range map
// {destinationRangeStart, sourceRangeStart, rangeLength}
const maps = []; // 2D array holding all maps in order
let i = 3;
for (let mapIndex = 0; mapIndex < 7; mapIndex++) {
    const almanacMap = [];
    while (i < lines.length && lines[i].length > 0) {
        const [destinationRangeStart, sourceRangeStart, rangeLength] = lines[i].split(" ").map(value => Number(value))
        almanacMap.push({
            destinationRangeStart,
            sourceRangeStart,
            rangeLength
        })

        i++;
    }

    maps.push(almanacMap)
    i += 2
}

log(maps)
// log(maps.length)

// conversion
let min = Infinity;
for(let seedIndex = 0; seedIndex < seeds.length; seedIndex += 2){
    const seedStart = seeds[seedIndex];
    const seedRange = seeds[seedIndex + 1]
    for (let currentSeedValue = seedStart; currentSeedValue < seedStart + seedRange; currentSeedValue++) {
        let seed = currentSeedValue
        // log(seed)

        // follow seed along the maps to find location value.
        for (let mapsIndex = 0; mapsIndex < maps.length; mapsIndex++) {
            const currentMap = maps[mapsIndex]
            let converted = false
            for (let i = 0; i < currentMap.length && !converted; i++) {
                const range = currentMap[i];
                const isInRange = seed >= range.sourceRangeStart && seed < (range.sourceRangeStart + range.rangeLength)
                if (isInRange) {
                    // convert value to use against next map
                    seed = seed - range.sourceRangeStart + range.destinationRangeStart;
                    converted = true
                }
            }
            // log(seed)
        }

        // log()
        if (seed < min) {
            min = seed
            log("New min: " + min)
        }
    }
}

log("min location: " + min)
