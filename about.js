// Custom Http Module
function customHttp() {
    return {
        get(url, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener('error', () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                xhr.send();
            } catch (error) {
                cb(error);
            }
        },
        post(url, body, headers, cb) {
            try {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.addEventListener('load', () => {
                    if (Math.floor(xhr.status / 100) !== 2) {
                        cb(`Error. Status code: ${xhr.status}`, xhr);
                        return;
                    }
                    const response = JSON.parse(xhr.responseText);
                    cb(null, response);
                });

                xhr.addEventListener('error', () => {
                    cb(`Error. Status code: ${xhr.status}`, xhr);
                });

                if (headers) {
                    Object.entries(headers).forEach(([key, value]) => {
                        xhr.setRequestHeader(key, value);
                    });
                }

                xhr.send(JSON.stringify(body));
            } catch (error) {
                cb(error);
            }
        },
    };
}

const http = customHttp();

const newsService = (function () {
    //const apiKey = "a54d1451af691342e975fde0186820bf";
    const apiUrl = "http://api.weatherstack.com/current?access_key=a54d1451af691342e975fde0186820bf&query=Moscow";

    return{
        topHeadLines(country = 'Russia', cb){
            http.get(`${apiUrl}/current?country=${country}`, cb);
        },
       // everything(query, cb) {
         //   http.get(`${apiUrl}/current?country=${country}&apiKey=${apiKey}`);
       // }
    }
})()

document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
    loadweather();
});

function loadweather() {
newsService.topHeadLines('ru', onGetResponse);
}

function onGetResponse(err, res) {
console.log(res);
}