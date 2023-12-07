const fs = require('node:fs');
const readline = require('node:readline');

// GOLD STAR

const digits  = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9"
};

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

		const results = /(\d|one|two|three|four|five|six|seven|eight|nine).*(\d|one|two|three|four|five|six|seven|eight|nine).*$/.exec(line)
		console.log(results)
		first = isNaN(results[1]) ? parseWordDigitToValue(results[1]) : results[1]
		last = isNaN(results[2]) ? parseWordDigitToValue(results[2]) : results[2]

		console.log("first: " + first + " last: " + last)


		const calibration = first + last

		console.log("calibration from line: " + calibration)

		sum += Number(calibration)
		console.log(sum);
		console.log()
	}
})();

function parseWordDigitToValue(digit) {
	return digits[digit];
}