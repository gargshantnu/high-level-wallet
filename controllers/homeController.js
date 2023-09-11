const config = require("../config/config");

exports.getHomePage = async (req, res) => {
    res.send(
        "High level Backend build: " +
            config.getEnvId()
    );
}