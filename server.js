const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Me');
});

const port = process.env.port || 3000;

app.listen(port);
console.log('Web Server is listening at port ' + port);
