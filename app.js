const express = require('express');
const app = express();

// add listener for port 3000
app.listen(3000, ()=>console.log('listening to port'));

app.use(express.static('public'));

app.post('/', function (req, res) {
    res.send('Data received!');
})