const express = require('express');
const app = express();

const serverPort = process.env.PORT || 5000;
const localhost = 'http://localhost';
const ipv4 = '127.0.0.1';
const ipv6 = '2a02:2f0e:d10b:dd00:d9d8:1735:6efe:3fd1';


const { ConnectToDatabase } = require('./database/db-config.js');
const { GetProductData, GetReviewData } = require('./database/db-prod-config.js');
const { CheckEmailUniqueness, CreateAccount } = require('./database/db-user-config.js');
const { GetSecQuestions } = require('./database/db-access-config.js');

app.get('/api/p/:sku', async (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');

    try {
        const result = await GetProductData(pool, req.params.sku);
        res.json(ParseValuesToJson(result));
    } catch (err) {
        console.error(`Error querying the database`, err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/p/:sku/reviews', async (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');

    try {
        const result = await GetReviewData(pool, req.params.sku);
        res.json(ParseValuesToJson(result));
    } catch (err) {
        console.error(`Error querying the database`, err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/secQ', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    try {
        const result = await GetSecQuestions(pool);
        res.json(ParseValuesToJson(result));
    } catch (err) {
        console.error(`Error querying the database`, err);
        res.status(500).json({ error: 'Server error' });
    }
})

// Handling preflight requests
app.options('/api/post/create-account', (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).send();
});

app.post('/api/post/create-account', async (req, res) => {
    // Change '*' to your domain for production
    res.header('Access-Control-Allow-Origin', '*');

    const dataParams = new URLSearchParams(req.url.split('?').pop());
    const userData = ParseDataParams(dataParams);

    const isEmailUnique = await CheckEmailUniqueness(pool, userData.email);
    if (isEmailUnique.recordset[0].Count) {
        res.status(409).json({
            "statusCode": "409",
            "message": "Conflict: Email already exists"
        });
    }
    else {
        const result = await CreateAccount(pool, userData);
        res.json({
            "statusCode": "200",
            "message": "OK: Account created",
            result
        });
    }
});

var pool;
(async () => {
    pool = await ConnectToDatabase();
})();

app.listen(serverPort, ipv4, () => {
    console.log(`Server listening on port ${ipv4}:${serverPort}`);
});

/**
 * Parses Stringified JSON into JSON object. (Recursive function)
 * @param {Object} value 
 * @returns The parsed object
 */
function ParseValuesToJson(value) {
    if (typeof value === 'object' && value !== null)
        for (let key of Object.keys(value))
            value[key] = ParseValuesToJson(value[key]);
    else if (typeof value === 'string')
        try { return JSON.parse(value); }
        catch (ex) { }
    return value;
}

/**
 * Parses an URLParams object into an key-value pair object
 * @param {*} params 
 * @returns 
 */
function ParseDataParams(params) {
    const obj = {};
    for (let [key, value] of [...params.entries()])
        obj[key] = value;
    return obj;
}