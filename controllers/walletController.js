const { isValidObjectId } = require("mongoose");
const walletService = require("../services/walletService");
const fs = require("fs");
const path = require("path");

exports.setupWallet = async (req, res) => {
    try {
        const { balance, name } = req.body;

        let savedWallet = await walletService.setupWallet(balance || 0, name);

        if (savedWallet.errorCode) {
            return res.status(404).json(savedWallet);
        }

        return res.status(201).json({
            id: savedWallet.id,
            balance: savedWallet.balance,
            transactionId: savedWallet.transactionId,
            name: savedWallet.name,
            date: savedWallet.date,
        });
    } catch (error) {
        console.error(error);
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

        if (result.errorCode == "InvalidWallet") {
            return res.status(404).json(result);
        }

        if (
            ["VersionError", "InsufficientFunds"].indexOf(result.errorCode) !=
            -1
        ) {
            return res.status(412).json(result);
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
        let sort;

        if (req?.query?.sort) {
            sort = Object.fromEntries(
                Object.entries(req.query.sort).map(([key, value]) => [
                    key,
                    Number(value),
                ])
            );
        }

        if (!isValidObjectId(walletId)) {
            return res.status(404).json({ error: "Invalid wallet ID" });
        }

        const result = await walletService.getTransactions(
            walletId,
            skip,
            limit,
            sort
        );

        if (result.errorCode === "InvalidWallet") {
            return res.status(404).json({ error: "Wallet not found" });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.exportTransactions = async (req, res) => {
    try {
        const walletId = req.query.walletId;
        let sort;

        if (req?.query?.sort) {
            sort = Object.fromEntries(
                Object.entries(req.query.sort).map(([key, value]) => [
                    key,
                    Number(value),
                ])
            );
        }

        if (!isValidObjectId(walletId)) {
            return res.status(404).json({ error: "Invalid wallet ID" });
        }

        const fileName = await walletService.generateTransactionCSV(
            walletId,
            sort
        );

        if (fileName.errorCode === "InvalidWallet") {
            return res.status(404).json({ error: "Wallet not found" });
        }
        const file = fs.createReadStream(fileName);
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=${fileName}`
        );
        res.setHeader("Content-Type", "text/csv");
        res.sendFile(path.join(__mainPath, fileName), (err) => {
            if (err) {
                console.error(err);
            } else {
                fs.unlink(path.join(__mainPath, fileName), (unlinkErr) => {
                    if (unlinkErr) {
                        console.error(
                            "Error deleting the CSV file:",
                            unlinkErr
                        );
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get wallet information
exports.getWallet = async (req, res) => {
    try {
        const walletId = req.params.walletId;

        if (!isValidObjectId(walletId)) {
            return res.status(404).json({ error: "Invalid wallet ID" });
        }

        // Find the wallet by ID
        const result = await walletService.getWallet(walletId);

        if (result.errorCode === "InvalidWallet") {
            return res.status(404).json({ error: "Wallet not found" });
        }

        return res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
