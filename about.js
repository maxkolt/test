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
    //const apiKey = '9c27b0f722b84da5a08312d2b125351b';
    const apiUrl = "http://api.weatherstack.com/current?access_key=a54d1451af691342e975fde0186820bf&query=Moscow"

    return {
        topHeadlines(country = 'Russia', cb) {
            http.get(
                (`${apiUrl}/current?country=${country}`, cb)
            )
        },
       // everything(query, cb) {
         //   http.get(`${apiUrl}/everything?q=${query}`, cb);
        //},
    };
})();


const form = document.forms['newsControls'];
const countrySelect = form.elements['country'];
const searchInput = form.elements['search'];

form.addEventListener('submit', e => {
    e.preventDefault();
    loadNews();
});


document.addEventListener('DOMContentLoaded', function () {
   // M.AutoInit();
    loadNews();
});


function loadNews() {
    showLoader();

    const country = countrySelect.value;
    const searchText = searchInput.value;

    if (!searchText) {
        newsService.topHeadlines(country, onGetResponse);
    } else {
        console.log('Error')
        //newsService.everything(searchText, onGetResponse);
    }
}


function onGetResponse(err, res) {
    removePreloader();

    if (err) {
        showAlert(err, 'error-msg');
        return;
    }

    if (!res.articles.length) {
        return;
    }

    renderNews(res.articles);
}


function renderNews(news) {
    const newsContainer = document.querySelector('.news-container .row');
    if (newsContainer.children.length) {
        clearContainer(newsContainer);
    }
    let fragment = '';

    news.forEach(newsItem => {
        const el = newsTemplate(newsItem);
        fragment += el;
    });

    newsContainer.insertAdjacentHTML('afterbegin', fragment);
}


function clearContainer(container) {
    let child = container.lastElementChild;
    while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function newsTemplate({weather_icons, temperature, url, location}) {
    return `
    <div class="col s12">
      <div class="card">
        <div class="card-image">
          <img src="${weather_icons}">
          <span class="card-title">${temperature || ''}</span>
        </div>
        <div class="card-content">
          <p>${location || ''}</p>
        </div>
        <div class="card-action">
          <a href="${url}">Read more</a>
        </div>
      </div>
    </div>
  `;
}


function showAlert(msg, type = 'success') {
    M.toast({html: msg, classes: type});
}

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

function removePreloader() {
    const loader = document.querySelector('.progress');
    if (loader) {
        loader.remove();
    }
}
