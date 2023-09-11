global["__mainPath"] = __dirname;

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("./config/config");

const cors = require("cors");

app.use(cors());

mongoose.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.use(express.json());

// Routes
const homeRoutes = require("./routes/homeRoutes");
const walletRoutes = require("./routes/walletRoutes");
app.use("/home", homeRoutes);
app.use("/", walletRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
