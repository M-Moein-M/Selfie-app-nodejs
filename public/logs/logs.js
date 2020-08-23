getData();
async function getData(){
    const url = '/api';
    const res = await fetch(url);
    const data = await res.json();
    for (let item of data){
        const newDiv = document.createElement('div');

        const moodDiv = document.createElement('div');
        moodDiv.innerText = item.feeling;

        const dateDiv = document.createElement('div');
        // calculate date using timestamp
        const date = new Date(Math.floor(Number(item.timestamp)));
        dateDiv.innerText = date.toDateString();

        const image64 = document.createElement('img');
        image64.src = item.image64;

        newDiv.append(moodDiv, dateDiv, image64);
        document.getElementById('data-div').appendChild(newDiv);
    }
}