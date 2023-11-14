const SPADES = '♠️';
const HEARTS = '❤️';
const CLUBS = '♣️';
const DIAMONDS = '♦️';
const rankList = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
const suitsNames = ['SPADES', 'HEARTS', 'CLUBS', 'DIAMONDS'];
let deck = [];

const bothHands = [[], []];

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

        deck = generateDeck();
        deck = shuffle(deck);
        
        if (cardFaces[0] !== '') {
            console.log("Here");
            console.log(cardFaces);
            for (let i = 0; i < cardFaces.length; i++) {
                if (sameCount[cardFaces[i]] === undefined) {
                    sameCount[cardFaces[i]] = 0;
                }
                else {
                    sameCount[cardFaces[i]] += 1;
                }
                topCards.push({ suit: suits[suitsNames[sameCount[cardFaces[i]]]], rank: cardFaces[i] });
            }
            deck = [...topCards, ...deck]
        }
        dealCards();
        displayCards();
        displayButtons();
        calculateTotals();
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
            bothHands[0].push(card);
        } else {
            bothHands[1].push(card);
        }
        deck.shift();
    }
}

function displayCards() {
    const newDivs = ["computerTotal", "userTotal", "computerHands", "userHands"];
    newDivs.forEach(function (divName) {
        const makeNewDiv = document.createElement('div');
        makeNewDiv.classList.add(divName);
        document.querySelector('.game').appendChild(makeNewDiv);
    });

    for (let i = 0; i < bothHands.length; i++) {
        for (let j = 0; j < bothHands[i].length; j++) {
            if (i === 0 && j === 0) {
                addCardToDiv(bothHands[i][j], '.computerHands', true);
            } else if (i === 0) {
                addCardToDiv(bothHands[i][j], '.computerHands', false);
            }
            else if (i === 1) {
                addCardToDiv(bothHands[i][j], '.userHands', false);
            }
        }
    }
}


// function addCardToDiv(card, parentDiv, isHidden) {
//     const newCard = document.createElement('div');
//     newCard.classList.add('card');

//     const cardTopLeft= document.createElement('div')
//     cardTopLeft.classList.add('cardTopLeft');
//     cardTopLeft.innerHTML = card.rank + card.suit;
//     newCard.appendChild(cardTopLeft);

//     const cardBottomRight = document.createElement('div')
//     cardBottomRight.classList.add('cardBottomRight');
//     cardBottomRight.innerHTML = card.rank + card.suit;
//     newCard.appendChild(cardBottomRight);

//     if (isHidden) {
//         newCard.classList.add('hiddenCard');
//     }
//     document.querySelector(parentDiv).appendChild(newCard);
// }

function addCardToDiv(card, parentDiv, isHidden) {
    const newCard = document.createElement('div');
    newCard.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardTopLeft = document.createElement('div');
    cardTopLeft.classList.add('card-corner', 'top-left');
    cardTopLeft.innerHTML = `<span class="rank">${card.rank}</span><span class="suit">${card.suit}</span>`;
    cardInner.appendChild(cardTopLeft);

    const cardBottomRight = document.createElement('div');
    cardBottomRight.classList.add('card-corner', 'bottom-right');
    cardBottomRight.innerHTML = `<span class="rank">${card.rank}</span><span class="suit">${card.suit}</span>`;
    cardInner.appendChild(cardBottomRight);

    newCard.appendChild(cardInner);

    if (isHidden) {
        newCard.classList.add('hiddenCard');
    }

    document.querySelector(parentDiv).appendChild(newCard);
}


document.addEventListener('DOMContentLoaded', main);
