const express = require('express');
const app = express();

// add listener to port 3000
app.listen(3000, ()=>console.log('listening to port'));

app.use(express.static('public'));