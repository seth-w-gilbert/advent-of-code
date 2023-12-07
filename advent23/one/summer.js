const fs = require('node:fs');
const readline = require('node:readline');

// GOLD STAR

(async function processLines() {
	const rl = readline.createInterface({
		input: fs.createReadStream('input1.txt'),
		crlfDelay: Infinity,
	});

	var sum = 0
	for await (const line of rl) {
		console.log(`Line from file: ${line}`);

		var first = ''
		var last = ''

		if (/(\d).*(\d).*$/.test(line)){
			const results = /(\d).*(\d).*$/.exec(line)
			first = results[1]
			last = results[2]
		} else {
			const results = /\d/.exec(line)
			first = results[0]
			last = results[0]
		}

		console.log("first: " + first + " last: " + last)


		const calibration = first + last

		console.log("calibration from line: " + calibration)

		sum += Number(calibration)
		console.log(sum);
		console.log()
	}
})();