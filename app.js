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
    // const latitude = req.body.latitude;
    // const longitude = req.body.longitude;
    // const timeStamp = req.body.timeStamp;
    console.log('\nData received');
    console.log(JSON.stringify(data));
    res.json({
            status: 'success',
            data: 'geolocation-data'
        }
    )
});

