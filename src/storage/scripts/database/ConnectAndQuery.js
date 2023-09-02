const sql = require('mssql');

const config = {
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASSWORD,
    server: process.env.REACT_APP_DB_SERVER,
    port: process.env.REACT_APP_DB_PORT,
    database: process.env.REACT_APP_DB_DATABASE,
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
};

export default async function ConnectAndQueryDB(queryFunction) {
    console.log('Connecting...');
    try {
        var poolConnection = await sql.connect(config);
        console.log('Connected successfully!');

        var results = await poolConnection.request().query(queryFunction);

        poolConnection.close();
        return results;
    }
    catch (err) {
        console.log(err.message);
    }
}