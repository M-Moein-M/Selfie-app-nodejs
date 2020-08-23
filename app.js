const express = require('express');
const app = express();

const Datastore = require('nedb');

// add listener for port 3000
app.listen(3000, () => console.log('listening to port'));

app.use(express.static('public'));

// getting the post request
app.use(express.json());

// saving the data received from the client using NeDB
const fileName = 'database.db';
let dataBase = new Datastore(fileName);
dataBase.loadDatabase();
console.log('Now storing data in '+fileName);

/// handling post request
app.post('/api', (req, res) => {
    const data = req.body;

    dataBase.insert(data);  // save new data to database

    // send something as respond
    res.json({
            status: 'success',
            data: 'geolocation-data'
        }
    )
});


app.get('/api', function (req, res) {
    dataBase.find({}, (err, data)=>{
        if (err){ // just get out
            res.end();
            return;
        }
        res.json(data);
    })

})
