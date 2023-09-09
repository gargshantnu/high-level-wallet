const express = require("express");
const mongoose = require("mongoose");
const app = express();


mongoose.connect("mongodb+srv://mongo:mongo@cluster0.twuqxlt.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
const walletRoutes = require("./routes/walletRoutes");
app.use("/", walletRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
