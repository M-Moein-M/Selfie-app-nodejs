getData();

async function getData() {
    const url = '/api';
    const res = await fetch(url);
    const data = await res.json();
    for (let item of data) {
        const newDiv = document.createElement('div');

        const moodParagraph = document.createElement('p');
        moodParagraph.innerText = item.feeling;

        const dateParagraph = document.createElement('p');
        // calculate date using timestamp
        const date = new Date(Math.floor(Number(item.timestamp)));
        dateParagraph.innerText = date.toDateString();

        const image64 = document.createElement('img');
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('flex-container');
        imageDiv.append(image64);
        image64.src = item.image64;
        image64.alt = 'Input webcam image';

        newDiv.append(moodParagraph, dateParagraph, imageDiv);

        document.getElementById('data-div').appendChild(newDiv);
    }
}