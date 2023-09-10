const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    balance: {
        type: Number,
        required: true,
        set: (v) => mongoose.Types.Decimal128.fromString(v.toFixed(4)),
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: '__v', optimisticConcurrency: true });

module.exports = mongoose.model("Wallet", walletSchema);
