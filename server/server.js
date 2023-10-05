const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
const localhost = 'http://localhost';
const ipv4 = '192.168.1.5';
const ipv6 = '2a02:2f0e:d10b:dd00:d9d8:1735:6efe:3fd1';

const { connectToDatabase, queryDatabase } = require('./db-config.js');

app.get('/api/p/:sku', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Change '*' to your domain for production

    try {
        const result = await queryDatabase.getProductData(req.params.sku);
        res.json(ParseValuesToJson(result));
    } catch (err) {
        console.error(`Error querying the database`, err);
        res.status(500).json({ error: 'Server error' });
    }

});

connectToDatabase();

app.listen(port, () => {
    console.log(`Server listening on port ${ipv4}:${port}`);
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