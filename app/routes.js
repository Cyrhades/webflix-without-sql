const tmdb = require("./tmdb.js");
module.exports = (app) => {
    // Déclarer notre première route
    app.get('/',(request, response) => {
        // affichage du rendu de notre fichier ./views/home.pug
        response.render('home')
    })

    app.get('/search', (request, response) => {
        tmdb.search(request.query.q, request.query.page).then(results => {
            response.render('home', {
                last: results.total_pages,
                page: request.query.page||1,
                movies: results.movies,
                keyword: request.query.q,
                route : `/search?q=${request.query.q}&`
            })
        })
    })
};