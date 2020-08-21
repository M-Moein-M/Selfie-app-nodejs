const express = require('express');
const app = express();

// add listener for port 3000
app.listen(3000, () => console.log('listening to port'));

app.use(express.static('public'));

// getting the post request
app.use(express.json());

/// handling post request
app.post('/', (req, res) => {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    console.log('lat: '+latitude.toString() + '\tlon: '+longitude.toString());
});

