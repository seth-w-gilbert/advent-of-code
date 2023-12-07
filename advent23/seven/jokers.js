const { log } = require('console')
const fs = require('fs')

// GOLD STAR

const text = fs.readFileSync('./input.txt').toString('utf-8')
// const text = fs.readFileSync('./sample.txt').toString('utf-8')

const lines = text.split("\n")

// "J" is now joker, which is wild for hand type, but lowest rank here.
const cardsOrder = ["J","2", "3", "4", "5", "6", "7", "8", "9", "T","Q","K","A"];

// parse lines with relevant info.
// hand, bid, type, rank array
const hands = [];
for (const line of lines) {
    const [hand, bid] = line.split(" ");

    hands.push({
        hand,
        bid: Number(bid),
        type: getTypeFromHand(hand),
        ranks: getRanksFromHand(hand)
    })
}

// log(hands)

// sort
hands.sort(sortHandObjects)

// log("Sorted: ")
// log(hands)

// calculate total bid
// add each bid multiplied by rank

let finalSum = 0;
for (let i = 0; i < hands.length; i++) {
    const hand = hands[i];
    finalSum += (hand.bid * (i+1))
}

log("Final sum: " + finalSum)





//
// Helpers
// 

function getTypeFromHand(hand) {
    let histogram = createHandHistogram(hand)

    // handle the Js
    const jokerEntry = histogram.find(value => value.card === "J")
    if (jokerEntry) {
        histogram = histogram.filter(value => value.card !== "J");

        histogram.sort((entry1, entry2) => {
            return entry2.numCards - entry1.numCards
        })
        
        if (histogram.length > 0) {
            histogram[0].numCards += jokerEntry.numCards
        } else {
            // all jokers, that needs to be present.
            histogram.push(jokerEntry)
        }

        // log(histogram)
    }

    if (histogram.length === 1) {
        // five of a kind
        return 6;
    } else if (histogram.length === 2) {
        // four of a kind or full house
        if (histogram.some((value) => value.numCards === 4)) {
            // four of a kind
            return 5
        } else {
            // must be full house
            return 4
        }
    } else if (histogram.length === 3) {
        // two pair or three of a kind
        if (histogram.some((value) => value.numCards === 3)) {
            // three of a kind
            return 3
        } else {
            // must be two pair
            return 2
        }
    } else if (histogram.length === 4) {
        // one pair
        return 1
    } else {
        // high card
        return 0
    }
}

function createHandHistogram(hand) {
    const histogram = [];
    let mutableHand = hand;
    while(mutableHand.length > 0) {
        const initialLength = mutableHand.length
        const card = mutableHand.charAt(0)
        mutableHand = mutableHand.replaceAll(card, "")
        const endLength = mutableHand.length
        const numCards = initialLength - endLength;

        histogram.push({
            card, numCards
        })
    }

    return histogram
}

function getRanksFromHand(hand) {
    const ranks = [];
    for (let i = 0; i < hand.length; i++) {
        const card = hand.charAt(i);
        ranks.push(cardsOrder.indexOf(card))
    }
    return ranks;
}

function sortHandObjects(hand1, hand2) {
    const typeDiff = hand1.type - hand2.type;

    if (typeDiff !== 0 ) {
        return typeDiff;
    } else {
        for(let i = 0; i < hand1.ranks.length; i++) {
            const rankDiff = hand1.ranks[i] - hand2.ranks[i];
            if (rankDiff !== 0) {
                return rankDiff
            }
        }
    }

    return 0; // same hand?
}