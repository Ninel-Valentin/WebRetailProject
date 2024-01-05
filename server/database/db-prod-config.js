const sql = require('mssql');

async function getProductData(pool, sku) {
    return await pool
        .request()
        .input('Sku', sql.VarChar(50), sku)
        .execute('GetProductData');
}

async function getReviewData(pool, sku) {
    return await pool
        .request()
        .input('Sku', sql.VarChar(50), sku)
        .execute('GetReviews');
}

module.exports = {
    getProductData,
    getReviewData
};