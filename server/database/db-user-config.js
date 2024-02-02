const sql = require('mssql');
const { EncryptionService } = require('./security/encryptionService.js');

async function CheckEmailUniqueness(pool, email) {
    return await pool
        .request()
        .input('Email', sql.VarChar(50), email)
        .execute('CheckEmailUniqueness');
}

async function CreateAccount(pool, userData) {
    const {
        user,
        email,
        password,
        birthday,
        secQuestion,
        secAnswer
    } = userData;
    const encryptedPassword = EncryptionService.Encrypt(password);

    return await pool
        .request()
        .input('Name', sql.VarChar(100), user || null)
        .input('Email', sql.VarChar(100), email)
        .input('Password', sql.VarChar(255), encryptedPassword)
        .input('SecurityQuestionId', sql.VarChar(50), secQuestion)
        .input('SecurityAnswer', sql.VarChar(100), secAnswer)
        .input('Birthday', sql.Date, birthday || null)
        .execute('CreateUser');
}

module.exports = {
    CheckEmailUniqueness,
    CreateAccount
};