const express = require('express');
const app = express();

const path = require('path');

app.listen(8080, () => {
    console.log('Running at Port 8080...');
});

app.use(express.static(path.join(__dirname, 'src')));

app.use((req, res) => {
    res.sendStatus(404);
});
