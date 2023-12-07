const { log } = require('console')
const fs = require('fs')

// GOLD STAR

const text = fs.readFileSync('./input4.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

// log(lines)

var cardInstances = Array(lines.length).fill(1) // one of each card to start.

for (let i = 0; i < lines.length; i++) {
    log(cardInstances)
    const line = lines[i]
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
    log(count)

    // add number of instances of this card to the cards won
    for (let card = i+1; card < i + count + 1 && card < cardInstances.length; card++){
        cardInstances[card] += cardInstances[i]
    }
}

// count up all cards won
const finalCardsAmount = cardInstances.reduce((previous, current) => previous + current);

log("Total number of cards: " + finalCardsAmount);