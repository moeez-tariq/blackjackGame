const SPADES = '♠️';
const HEARTS = '❤️';
const CLUBS = '♣️';
const DIAMONDS = '♦️';
const rankList = ['2', '3', '4', '5', '6', '7', '8', '9', '10','J', 'Q', 'K', 'A'];
const suits = {SPADES: '♠️', HEARTS: '❤️', CLUBS: '♣️', DIAMONDS: '♦️'};
const suitsNames = ['SPADES', 'HEARTS', 'CLUBS', 'DIAMONDS'];
let deck = [];
let playerBusted = false;
let computerState = 'playing';
let userStood = false;

const bothHands = [[], []];

function main() {
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

        const newDivs = ["computerTotal", "computerHands", "userTotal", "userHands"];
        newDivs.forEach(function (divName) {
            const makeNewDiv = document.createElement('div');
            makeNewDiv.classList.add(divName);
            document.querySelector('.game').appendChild(makeNewDiv);
        });

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
    document.querySelector('.computerHands').innerHTML = '';
    document.querySelector('.userHands').innerHTML = '';


    for (let i = 0; i < bothHands.length; i++) {
        for (let j = 0; j < bothHands[i].length; j++) {
            if (i === 0 && j === 0) {
                if (userStood) {
                    addCardToDiv(bothHands[i][j], '.computerHands', false);
                }
                else {
                    addCardToDiv(bothHands[i][j], '.computerHands', true);
                }
                
            } else if (i === 0) {
                addCardToDiv(bothHands[i][j], '.computerHands', false);
            }
            else if (i === 1) {
                addCardToDiv(bothHands[i][j], '.userHands', false);
            }
        }
    }
}

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

function displayButtons() {
    console.log("DISPLAY BUTTONS")
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons');

    const hitButton = document.createElement('button');
    hitButton.textContent = 'Hit';
    hitButton.addEventListener('click', hit);

    const standButton = document.createElement('button');
    standButton.textContent = 'Stand';
    standButton.addEventListener('click', stand);

    buttonDiv.appendChild(hitButton);
    buttonDiv.appendChild(standButton);

    document.querySelector('.game').appendChild(buttonDiv);
}

function hit() {
    const card = deck[0];
    bothHands[1].push(card);
    deck.shift();

    displayCards();
    calculateTotals();

    if (calculateHandTotal(bothHands[1]) > 21) {
        playerBusted = true;
        stand();
    }
}

function stand() {
    userStood = true;
    if (!playerBusted) {
        while (calculateHandTotal(bothHands[0]) < calculateHandTotal(bothHands[1])) {
            const card = deck[0];
            bothHands[0].push(card);
            deck.shift();
        }
    }

    if (calculateHandTotal(bothHands[0]) > 21) {
        computerState = 'busted';
    } else if (calculateHandTotal(bothHands[0]) === calculateHandTotal(bothHands[1])) {
        computerState = 'push';
    } else if (calculateHandTotal(bothHands[0]) > calculateHandTotal(bothHands[1])) {
        computerState = 'won';
    } else if (playerBusted) {
        computerState = 'won';
    }

    calculateTotals();
    displayCards();
    displayWinner();
}

function calculateTotals() {
    const userTotalElement = document.querySelector('.userTotal');
    const computerTotalElement = document.querySelector('.computerTotal');

    const userTotal = calculateHandTotal(bothHands[1]);
    const computerTotal = calculateHandTotal(bothHands[0]);

    userTotalElement.textContent = `User Total: ${userTotal}`;
    if (userStood) {
        computerTotalElement.textContent = `Computer Total: ${computerTotal}`;
    } else {
        computerTotalElement.textContent = `Computer Total: ?`;
    }
}

function calculateHandTotal(hand) {
    let total = 0;
    let aceCount = 0;

    for (let i = 0; i < hand.length; i++) {
        const cardValue = getCardValue(hand[i]);
        total += cardValue;

        if (hand[i].rank === 'A') {
            aceCount++;
        }
    }

    while (aceCount > 0 && total > 21) {
        total -= 10;
        aceCount--;
    }

    return total;
}

function getCardValue(card) {
    if (card.rank === 'A') {
        return 11; 
    } else if (['K', 'Q', 'J'].includes(card.rank)) {
        return 10;
    } else {
        return parseInt(card.rank, 10);
    }
}

function displayWinner() {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    if (computerState === 'busted') {
        resultDiv.textContent = 'Computer Busted. You Win!';
    } else if (computerState === 'push') {
        resultDiv.textContent = 'It\'s a Push!';
    } else if (computerState === 'won' && !playerBusted) {
        resultDiv.textContent = 'Computer Wins!';
    } else if (computerState === 'won' && playerBusted) {
        resultDiv.textContent = 'You Busted. Computer Wins!';
    }

    document.querySelector('.game').appendChild(resultDiv);
    
    // Remove the buttons
    const buttonsDiv = document.querySelector('.buttons');
    if (buttonsDiv) {
        buttonsDiv.remove();
    }
}

document.addEventListener('DOMContentLoaded', main);
