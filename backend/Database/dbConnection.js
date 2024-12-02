const mongoose = require('mongoose');

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "assignment-submission"
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log(`Some error occurred while connecting to database: ${err}`);
    });
};

module.exports = dbConnection;