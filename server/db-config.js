const sql = require('mssql');
var pool;

async function connectToDatabase() {

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
            // TODO: replace code from a static map
            console.log(`ERROR (code 1): Error connecting to the MSSQL database (Retry ${retryCount}).\n Err: ${err}`);
        }
        retryCount++;
    }

    if (!pool && retryCount == process.env.SERVER_RETRY_LIMIT) {
        console.error(`Retry limit reached... shutting server down!`)
        return 1;
    }
}

async function getProductData(sku) {
    const queryResult = await pool
        .request()
        .input('Sku', sql.VarChar(50), sku)
        .execute('GetProductData');
    return queryResult;
}


module.exports = {
    connectToDatabase,
    queryDatabase: {
        getProductData

    }
};