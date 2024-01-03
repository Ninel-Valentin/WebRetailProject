const { Consts } = require('../../src/storage/scripts/Consts.js');

const sql = require('mssql');

async function connectToDatabase() {
    var pool;
    const config = {
        user: process.env.REACT_APP_db_User,
        password: process.env.REACT_APP_db_Pass,
        server: process.env.REACT_APP_db_Server,
        database: process.env.REACT_APP_db_Database
    };

    let retryCount = 0;
    const retryLimit = process.env.SERVER_RETRY_LIMIT || 5;
    while (retryCount < retryLimit && !pool) {
        try {
            pool = await sql.connect(config);
            console.log('Successfully connected!');
        } catch (err) {
            console.log(Consts.errors(1, err, retryCount));
        }
        retryCount++;
    }

    if (!pool && retryCount == process.env.SERVER_RETRY_LIMIT) {
        throw (`Retry limit reached... shutting server down!`)
    }
    return pool;
}

module.exports = {
    connectToDatabase
};