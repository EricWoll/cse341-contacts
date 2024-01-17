const express = require('express');
const mongodb = require('./data/database');

const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.port || port, () => {
            console.log(`Database is listening, node running on port ${port}`);
        });
    }
});
