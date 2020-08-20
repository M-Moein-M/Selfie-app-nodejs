const express = require('express');
const app = express();

// add listener for port 3000
app.listen(3000, ()=>console.log('listening to port'));

app.use(express.static('public'));


const bodyParser = require('body-parser')

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body);
})

