const express = require('express');
const app = express();

const fs = require('fs');

const Datastore = require('nedb');

// add listener for port 3000
app.listen(3000, () => console.log('listening to port'));

app.use(express.static('public'));

// getting the post request
app.use(express.json({limit: '10mb'}));

// saving the data received from the client using NeDB
const fileName = 'database.db';
let dataBase = new Datastore(fileName);
dataBase.loadDatabase();
console.log('Now storing data in ' + fileName);

/// handling post request
app.post('/api', (req, res) => {
    const data = req.body;

    const imageFileName = createImageFileName(data); // creating unique code for each image file name
    saveImageToFile(imageFileName, data.image64);

    let editedData = data; // replace image data by image file name
    editedData.image64 = imageFileName;
    dataBase.insert(editedData);  // save new data to database

    // send something as respond
    res.json({
            status: 'success',
            data: 'geolocation-data'
        }
    )
});


app.get('/api', function (req, res) {
    dataBase.find({}, (err, data) => {  // get all the database
        if (err) { // just get out
            res.end();
            return;
        }
        let outputData = []
        for (let item of data) {
            item.image64 = loadImageFromFile(createImageFileName(item));
            outputData.push(item);
        }

        res.json(outputData);
    });

});

function createImageFileName(data) {
    return 'image_' + data.timestamp.toString();
}

function loadImageFromFile(imageFileName) {
    return fs.readFileSync(imageFileName, "utf-8");
}

function saveImageToFile(fileName, imageData) {
    fs.writeFileSync(fileName, imageData);
}
