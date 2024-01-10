import mongoose from 'mongoose';

const gameResultSchema = new mongoose.Schema({
    userInitials: String,
    userScore: Number,
    computerScore: Number,
    date: { type: Date, default: Date.now },
});

export const gameResult = mongoose.model('gameResult', gameResultSchema);

mongoose.connect(process.env.DSN || "mongodb://localhost/hw05");