const fs = require('node:fs');
const readline = require('node:readline');

// GOLD STAR

(async function processLines() {
	const rl = readline.createInterface({
		input: fs.createReadStream('input4.txt'),
		// input: fs.createReadStream('sample.txt'),
		crlfDelay: Infinity,
	});

	var sum = 0
	for await (const line of rl) {
		console.log(`Line from file: ${line}`);
        const trimmed = line.substring(line.indexOf(":") + 1);

        const [winners, pickedNumbers] = trimmed.split("|")
            .map((value) => value.trim()
                .split(" ")
                .filter((num) => /\d/.test(num)))

        console.log(winners);
        console.log(pickedNumbers);

        let count = 0;
        for (number of pickedNumbers) {
            if (winners.includes(number)) {
                count++;
            }
        }

        const score = count > 0 ? Math.pow(2, count-1) : 0;
        console.log(score);

        sum += score;
	}

    console.log(sum);
})();