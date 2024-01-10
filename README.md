# One Hand of Blackjack (Client Side JavaScript)

## Overview
A client-side JavaScript implementation of a two-player (user vs computer) card game - a single hand of blackjack. The game follows standard blackjack rules, where players aim to construct a hand with a total value as close to 21 as possible without exceeding it. The game involves dealing two cards to each player initially and providing options for players to "hit" or "stand" during their turns. Moreover, the after each hand the game also displays the history of played hands. 

The main point of creating this game was to practice dynamically creating and modifying DOM elements using JavaScript. The game also uses AJAX to make background requests. The game is implemented using the Express framework for Node.js and uses a MongoDB database to store the history of played hands.

## How to Play
1. **Setup and Initial Screen:**
   - Access the game through http://localhost:3000.
   - Enter a series of comma-separated face values (2 - 10, J, Q, K, A) in the provided form to set the deck or leave it blank for randomness.
   - Click the "Play" button to start the game.

2. **Game Progression:**
   - Players are dealt two cards each, with the computer receiving the first card.
   - The user can choose to "hit" (receive another card) or "stand" (stop receiving cards).
   - If the user's total exceeds 21, they lose automatically.
   - Once the user stands, the computer makes decisions to "hit" or "stand."

3. **Determining the Winner:**
   - Compare the total values of the computer's and user's hands.
   - The player closest to or equal to 21 without exceeding it wins.
   - Ties are possible.

## How the Computer Works
- The computer continues to "hit" until its hand total is underneath the player's hand total.
- If the computer's hand total exceeds 21, the player wins automatically.


## Overview of the Code
1. **Initial Screen:**
   - Allows users to input initial card values.
   - Form submission triggers card dealing and game start.

2. **JavaScript Implementation:**
   - Client-side JavaScript handles game logic.
   - Dynamically generates and modifies DOM elements.
   - Uses AJAX to make background requests for extra credit.

3. **Styling:**
   - Cards are visually polished and displayed adjacent to each other.
   - Effort is made to create a visually appealing game interface.

4. **Setup and Initial Screen:**
   - Express application serves static files.
   - Initial HTML, CSS, and JavaScript files are set up.
   - Form is created for user input.

5. **Game Progression:**
   - Cards are dealt alternately to the computer and user.
   - Players can "hit" or "stand" based on game rules.
   - Player and computer hands are visually represented.
   - Hand totals are calculated, considering the value of aces as 1 or 11.

6. **Determining the Winner:**
   - Game compares computer and user scores.
   - Displays the winner or indicates a tie.

## Saving Game History
- A button shows the history of played hands.
- Previous hands' details, including computer score, user score, and initials, are displayed.
- Background requests with fetch are used to retrieve data from an API endpoint.
- A form allows users to enter their initials, and the results are saved in the database.

