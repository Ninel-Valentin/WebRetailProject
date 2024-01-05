const sql = require('mssql');

async function CheckEmailUniqueness(pool, email) {
    return await pool
        .request()
        .input('Email', sql.VarChar(50), email)
        .execute('CheckEmailUniqueness');
}

module.exports = {
    CheckEmailUniqueness
};