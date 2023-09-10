const Wallet = require("../models/Wallet");
const Transaction = require("../models/Transaction");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

exports.setupWallet = async (balance = 0, name) => {
    // Check if a wallet with the same name already exists
    const existingWallet = await Wallet.findOne({ name });
    if (existingWallet) {
        return {
            errorCode: "WalletAlreadyExist",
            message: "Wallet with the same name already exists",
        };
    }

    const wallet = new Wallet({ balance, name });

    // Save the wallet to the database
    await wallet.save();

    // Create an initial transaction for the setup
    const initialTransaction = new Transaction({
        walletId: wallet._id,
        amount: balance,
        balance: balance,
        description: "Initial setup",
        type: "CREDIT", // Assuming it's a credit for setup
        date: new Date(),
    });

    // Save the initial transaction to the database
    await initialTransaction.save();

    // Respond with the wallet and initial transaction details
    return {
        id: wallet._id,
        balance: wallet.balance,
        name: wallet.name,
        date: wallet.date,
        transactionId: initialTransaction._id, // Provide the transaction ID in the response
    };
};

exports.transactWallet = async (walletId, amount, description) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
        // Find the wallet by ID
        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            return {
                errorCode: "InvalidWallet",
                message: "Please enter a correct wallet id",
            };
        }

        // // uncomment below code if you want to test optimistic concurrency approach - i.e. check version error
        // const wallet2 = await Wallet.findById(walletId);
        // wallet2.balance += 1;
        // await wallet2.save();

        // Determine if it's a credit or debit
        const transactionType = amount < 0 ? "DEBIT" : "CREDIT";

        // Calculate the new balance
        const newBalance = wallet.balance + amount;

        if (newBalance < 0) {
            //     session.abortTransaction();
            //   session.endSession();
            return {
                errorCode: "InsufficientFunds",
                message:
                    "Wallet does not have enough funds to complete this transaction",
            };
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
        if (error.name == "VersionError") {
            // The document has already been updated by someone else. Reject this transaction.
            console.error(
                "Version error, someone else have already updated the document",
                error
            );
            return {
                errorCode: "VersionError",
                message:
                    "Version error, someone else have already updated the document",
            };
        }
        if (error?.message == "WALLET_NOT_FOUND") {
            console.error("Invalid wallet", error);
            return {
                errorCode: "InvalidWallet",
                message: "Please enter a correct wallet id",
            };
        }
        // session.abortTransaction();
        // session.endSession();
        throw new Error(error);
    }
};

// Fetch transactions for a wallet with optional pagination, sorting, and filtering
exports.getTransactions = async (
    walletId,
    skip,
    limit,
    sortBy = { date: -1, amount: -1 }
) => {
    try {
        // Find the wallet by ID to validate its existence
        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            return {
                errorCode: "InvalidWallet",
                message: "Please enter a correct wallet id",
            };
        }

        // Query transactions based on walletId, skip, and limit
        const query = { walletId };
        const count = await Transaction.countDocuments(query);

        const transactions = await Transaction.find(query)
            .sort(sortBy)
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

exports.generateTransactionCSV = async (
    walletId,
    sortBy = { date: -1, amount: -1 }
) => {
    try {
        // Find the wallet by ID to validate its existence
        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            return {
                errorCode: "InvalidWallet",
                message: "Please enter a correct wallet id",
            };
        }

        // Query transactions based on walletId, skip, and limit
        const query = { walletId };
        const fileName = `transactions-${walletId}.csv`;

        const transactions = await Transaction.find(query)
            .sort(sortBy)
            .limit(500)
            .lean();

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: "_id", title: "Transaction ID" },
                { id: "date", title: "Date" },
                { id: "amount", title: "Amount" },
                { id: "type", title: "Type" },
                { id: "balance", title: "Balance" },
                { id: "description", title: "Description" },
            ],
        });

        // TODO: we need to create some async service - where we will create a CSV file slowly and upload to S3, whose link later can be shared with customer.
        await csvWriter.writeRecords(transactions);

        return fileName;
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
            return {
                errorCode: "InvalidWallet",
                message: "Please enter a correct wallet id",
            };
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
