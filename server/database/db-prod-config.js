const sql = require('mssql');

async function GetProductData(pool, sku) {
    return await pool
        .request()
        .input('Sku', sql.VarChar(50), sku)
        .execute('GetProductData');
}

async function GetReviewData(pool, sku) {
    return await pool
        .request()
        .input('Sku', sql.VarChar(50), sku)
        .execute('GetReviews');
}

module.exports = {
    GetProductData,
    GetReviewData
};