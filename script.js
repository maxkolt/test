const xhr = new XMLHttpRequest();
xhr.open("GET", 'http://api.weatherstack.com/current?access_key=a54d1451af691342e975fde0186820bf&query=Moscow');
xhr.addEventListener("load", () => {
    console.log(xhr.responseText);
});

xhr.addEventListener("error", () => {
    console.log('error');
})

xhr.send();