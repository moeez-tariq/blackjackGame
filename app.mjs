import './config.mjs';
import './db.mjs';
import express from 'express';
import mongoose from 'mongoose';
const app = express();

const gameResult = mongoose.model('gameResult');

app.use(express.json());

import url from 'url';
import path from 'path';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/game-history', async (req, res) => {
    try {
        const gameHistory = await gameResult.find().sort('-date');
        res.json(gameHistory);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/save-game-result', async (req, res) => {
    const { userInitials, userScore, computerScore } = req.body;

    try {
        const newGameResult = new gameResult({ userInitials, userScore, computerScore });
        await newGameResult.save();
        res.status(200).send('Game result saved successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3000);
