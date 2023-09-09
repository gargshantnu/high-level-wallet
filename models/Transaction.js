const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    walletId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        set: v => mongoose.Types.Decimal128.fromString(v.toFixed(4)),
        default: 0
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["CREDIT", "DEBIT"],
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Transaction", transactionSchema);