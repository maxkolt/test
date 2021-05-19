function getPost(id) {
    return new Promise((resolve, reject) => {
        fetch(`http://api.weatherstack.com/current?access_key=a54d1451af691342e975fde0186820bf&query=Moscow${id}`)
            .then(response => response.json())
            .then(post => resolve(post))
            .catch(err => reject(err))
    })
}
getPost(1).then(post => console.log(post))