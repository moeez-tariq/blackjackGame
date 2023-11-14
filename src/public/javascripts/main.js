const SPADES = '♠️';
const HEARTS = '❤️';
const CLUBS = '♣️';
const DIAMONDS = '♦️';
const rankList = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
const suitsNames = ['SPADES', 'HEARTS', 'CLUBS', 'DIAMONDS'];
let deck = [];
const computerHand = [];
const userHand = [];

function main() {
    console.log("MAIN INITIATED")
    const form = document.querySelector('form');
    const submitButton = document.querySelector('.playBtn');
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        form.classList.add('hidden');
        const startValuesInput = document.getElementById('startValues');
        const cardFaces = startValuesInput.value.trim().split(',');

        const sameCount = {}
        const topCards = [];

        let preAddDeck;
        preAddDeck = generateDeck();
        preAddDeck = shuffle(deck);
        
        if (cardFaces.length !== 0) {
            for (let i = 0; i < cardFaces.length; i++) {
                if (sameCount[cardFaces[i]] === undefined) {
                    sameCount[cardFaces[i]] = 0;
                }
                else {
                    sameCount[cardFaces[i]] += 1;
                }
                console.log(sameCount[cardFaces[i]])
                topCards.push({ suit: suits[suitsNames[sameCount[cardFaces[i]]]], rank: cardFaces[i] });
            }
            deck = [...topCards, ...preAddDeck]
        }
        dealCards();
    });
}

function generateDeck() {
    for (let i = 0; i < suitsNames.length; i++) {
        for (let j = 0; j < rankList.length; j++) {
            deck.push({suit: suits[suitsNames[i]], rank: rankList[j]});
        }
    }
    return deck;
};

function shuffle(deck) {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (shuffledDeck.length));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
};

function dealCards() {
    for (let i = 0; i < 4; i++) {
        const card = deck[0];
        if (i % 2 === 0) {
            computerHand.push(card);
        } else {
            userHand.push(card);
        }
        deck.shift();
    }
}
  
document.addEventListener('DOMContentLoaded', main);
  