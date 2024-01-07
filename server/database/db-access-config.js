async function GetSecQuestions(pool) {
    return await pool
        .request()
        .execute('GetSecurityQuestions');
}

module.exports = {
    GetSecQuestions
};