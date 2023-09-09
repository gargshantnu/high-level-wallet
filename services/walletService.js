const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const { isValidObjectId, Types } = require("mongoose");

exports.setupWallet = async (balance, name) => {
    // Check if a wallet with the same name already exists
    const existingWallet = await Wallet.findOne({ name });
    if (existingWallet) {
        return res
            .status(400)
            .json({ error: "Wallet with the same name already exists" });
    }

    const wallet = new Wallet({ balance, name });

    return await wallet.save();
};

exports.transactWallet = async (walletId, amount, description) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        // Find the wallet by ID
        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            throw new Error("Wallet not found");
        }

        // Determine if it's a credit or debit
        const transactionType = amount < 0 ? "DEBIT" : "CREDIT";

        // Calculate the new balance
        const newBalance = wallet.balance + amount;

        if (newBalance < 0) {
            //     session.abortTransaction();
            //   session.endSession();
            throw new Error("Insufficient balance");
        }

        // Create a new transaction record
        const transaction = new Transaction({
            walletId: wallet._id.toString(),
            amount,
            balance: newBalance,
            description,
            type: transactionType,
            date: new Date(),
        });

        // Save the transaction to the database
        await transaction.save();

        // Update the wallet balance
        wallet.balance = newBalance;
        await wallet.save();

        // Commit the transaction
        // await session.commitTransaction();
        // session.endSession();

        return {
            balance: parseFloat(newBalance.toFixed(4)),
            transactionId: transaction._id,
        };
    } catch (error) {
        console.error(error);
        // session.abortTransaction();
        // session.endSession();
        throw error;
    }
};

// Fetch transactions for a wallet with optional pagination, sorting, and filtering
exports.getTransactions = async (walletId, skip, limit) => {
    try {
        // Find the wallet by ID to validate its existence
        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            throw new Error("Wallet not found");
        }

        // Query transactions based on walletId, skip, and limit
        const query = { walletId };
        const count = await Transaction.countDocuments(query);

        const transactions = await Transaction.find(query)
            .sort({ date: -1, amount: -1 }) // Sort by date (descending) and amount (descending)
            .skip(skip)
            .limit(limit);

        return {
            totalTransactions: count,
            transactions,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Get wallet information by its ID
exports.getWallet = async (walletId) => {
    try {
        // Find the wallet by ID
        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            throw new Error("Wallet not found");
        }

        return {
            id: wallet._id,
            balance: wallet.balance,
            name: wallet.name,
            date: wallet.date,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};