const express = require('express');
const app = express();

// add listener for port 3000
app.listen(3000, () => console.log('listening to port'));

app.use(express.static('public'));

// getting the post request
app.use(express.json());


/// handling post request
app.post('/', (req, res) => {
    const data = req.body;

    geolocationData.push(data);
    // console.log('saved' + JSON.stringify(data));
    console.clear();
    console.log(geolocationData);

    // send something as respond
    res.json({
            status: 'success',
            data: 'geolocation-data'
        }
    )
});

// saving the data received from the client
let geolocationData = [];