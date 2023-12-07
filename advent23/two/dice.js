
const fs = require('node:fs');
const readline = require('node:readline');

// GOLD STAR

// The Elf would first like to know which games would have been possible if the bag contained only 
// 12 red cubes, 13 green cubes, and 14 blue cubes?

const redlimit = 12;
const greenlimit = 13;
const bluelimit = 14;

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

        var input = line.substring(line.indexOf(":")+ 2)
        // loop for chunks
        const rounds = input.split(';')
        const isGameValid = testRounds(rounds)

        if (isGameValid) {
            sum+= Number(id);
        }
		console.log(sum);
		console.log()
	}
})();

function testRounds(rounds) {
    for (round of rounds) {
        // split rounds by color
        const colors = round.split(',').map(color => color.trim());
        for (color of colors) {
            console.log(color);
            const [_, amt, colorName] = /^(\d+) (.*)$/.exec(color)

            if (
                (colorName === "red" && Number(amt) > redlimit) ||
                (colorName === "green" && Number(amt) > greenlimit) ||
                (colorName === "blue" && Number(amt) > bluelimit)
            ) {
                return false
            }
        }
    }

    return true;
}