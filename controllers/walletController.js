const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { isValidObjectId } = require("mongoose");

const walletService = require("../services/walletService");
const transactionService = require("../services/transactionService");

// Create a new wallet with initial balance
exports.setupWallet = async (req, res) => {
    try {
        const { balance, name } = req.body;

        let savedWallet = await walletService.setupWallet(balance, name);

        return res.status(201).json({
            id: savedWallet._id,
            balance: savedWallet.balance,
            transactionId: "4349349843", // Generate a transaction ID
            name: savedWallet.name,
            date: savedWallet.date,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Credit/Debit amount to the wallet
exports.transactWallet = async (req, res) => {
    try {
        const { amount, description } = req.body;
        const walletId = req.params.walletId;

        if (!isValidObjectId(walletId)) {
            return res.status(400).json({ error: "Invalid wallet ID" });
        }

        let result = await walletService.transactWallet(
            walletId,
            amount,
            description
        );

        if (result.error) {
            return res.status(404).json({ error: result.error });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const walletId = req.query.walletId;
        const skip = parseInt(req.query.skip || 0);
        const limit = parseInt(req.query.limit || 10);

        if (!isValidObjectId(walletId)) {
            return res.status(400).json({ error: "Invalid wallet ID" });
        }

        const result = await walletService.getTransactions(
            walletId,
            skip,
            limit
        );

        if (result.error === "Wallet not found") {
            return res.status(404).json({ error: "Wallet not found" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get wallet information
exports.getWallet = async (req, res) => {
    try {
        const walletId = req.params.walletId;

        // Validate that walletId is a valid ObjectId
        if (!isValidObjectId(walletId)) {
            return res.status(400).json({ error: "Invalid wallet ID" });
        }

        // Find the wallet by ID
        const result = await walletService.getWallet(walletId);

        if (result.error === "Wallet not found") {
            return res.status(404).json({ error: "Wallet not found" });
        }

        return res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};