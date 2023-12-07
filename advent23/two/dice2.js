
const fs = require('node:fs');
const readline = require('node:readline');

// The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. 

// For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?

(async function processLines() {
    const rl = readline.createInterface({
        input: fs.createReadStream('input2.txt'),
        crlfDelay: Infinity,
    });

    // What is the sum of the IDs of valid games?
    var sum = 0
    for await (const line of rl) {
        console.log(`Line from file: ${line}`);

        // first digit: id
        const [_, id] = /Game (\d+):/.exec(line)
        console.log('id: ' + id)

        var input = line.substring(line.indexOf(":") + 2)
        // loop for chunks
        const rounds = input.split(';')
        var blues = [];
        var reds = [];
        var greens = []
        for (round of rounds) {
            // split rounds by color
            const colors = round.split(',').map(color => color.trim());
            for (color of colors) {
                console.log(color);
                const [_, amt, colorName] = /^(\d+) (.*)$/.exec(color)

                if (colorName === "red") {
                    reds.push(Number(amt))
                } else if (colorName === "green") {
                    greens.push(Number(amt))
                } else if (colorName === "blue") {
                    blues.push(Number(amt))
                }
            }

        }
        const power = Math.max(...reds) * Math.max(...greens) * Math.max(...blues)
        sum += power
        console.log(sum);
        console.log()
    }
})();