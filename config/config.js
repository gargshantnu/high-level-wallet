const path = require("path");
const fs = require("fs");


const getEnvId = function () {
    return process.env.NODE_ENV || "default";
};

const configPath = path.resolve(
    __basedir,
    "config/" + getEnvId() + ".json"
);
var config = JSON.parse(fs.readFileSync(configPath));


module.exports = config;
module.exports.getEnvId = getEnvId;