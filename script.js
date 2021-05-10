 const btn = document.querySelector('button');


function getPosts(cb) {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://api.weatherstack.com/current?access_key=a54d1451af691342e975fde0186820bf&query=Moscow');
    xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });

    xhr.addEventListener("error", () => {
        console.log('error');
    })

    xhr.send();
}

btn.addEventListener('click', (e) => {
    getPosts((response) => {
        console.log(response);
    });
});

