function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);
    const v = document.getElementsByTagName('video')[0];
    document.getElementById('camera-div').appendChild(v);

    let navAvailable = false;
    if ('geolocation' in navigator) {
        navAvailable = true;
        console.log('Navigator available');
        navigator.geolocation.getCurrentPosition((position) => {
            let latitude = position.coords.latitude.toFixed(2);
            let longitude = position.coords.longitude.toFixed(2);
            document.getElementById('latitude').innerText = latitude.toString();
            document.getElementById('longitude').innerText = longitude.toString();
        });
    } else {
        console.log('Navigator not available');
    }

    // Example POST method implementation:
    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    // post the data to the server
    function sendGeolocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude.toFixed(2);
            const longitude = position.coords.longitude.toFixed(2);
            const timestamp = Date.now();
            const inputValue = document.getElementById('input-text').value;
            const feeling = inputValue ? inputValue : 'NULL';
            video.loadPixels();

            const image64 = video.canvas.toDataURL();
            const data = {
                latitude: latitude,
                longitude: longitude,
                timestamp: timestamp,
                feeling: feeling,
                image64: image64
            }

            postData('http://localhost:3000/api', data)
                .then(data => {
                    console.log(data)
                });
        });
    }

    document.getElementById('send-btn').addEventListener('click', function () {
        if (navAvailable) {
            sendGeolocation();
        }

    })
}