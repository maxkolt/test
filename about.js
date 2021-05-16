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

const weatherService = (function () {
    //const apiKey = "a54d1451af691342e975fde0186820bf";
    const apiUrl = "http://api.weatherstack.com/current?access_key=a54d1451af691342e975fde0186820bf&query=Moscow";

    return {
        topHeadLines(country = 'Russia', cb) {
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
    weatherService.topHeadLines('ru', onGetResponse);
}

function onGetResponse(err, res) {
    renderWeather(res.current);
}

function renderWeather(weather) {
const weatherContainer = document.querySelector('.news-container .row');

    weather.forEach(weatherItem => {
        const el = weatherTemplate(weatherItem);
    })
}

function weatherTemplate({ urlToImage, title, url, description }) {
    return `
    <div class="col s12">
      <div class="card">
        <div class="card-image">
          <img src="${urlToImage}">
          <span class="card-title">${title || ''}</span>
        </div>
        <div class="card-content">
          <p>${description || ''}</p>
        </div>
        <div class="card-action">
          <a href="${url}">Read more</a>
        </div>
      </div>
    </div>
  `;
}

function showAlert(msg, type = 'success') {
    M.toast({ html: msg, classes: type });
}

//  Show loader function
function showLoader() {
    document.body.insertAdjacentHTML(
        'afterbegin',
        `
    <div class="progress">
      <div class="indeterminate"></div>
    </div>
  `,
    );
}

// Remove loader function
function removePreloader() {
    const loader = document.querySelector('.progress');
    if (loader) {
        loader.remove();
    }
}
