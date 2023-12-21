const tmdb = require("./tmdb.js");
module.exports = (app) => {
    // Déclarer notre première route
    app.get('/',(request, response) => {
        // affichage du rendu de notre fichier ./views/home.pug
        response.render('home')
    })

    app.get('/search', (request, response) => {
        tmdb.search(request.query.q, 1).then(movies => {
            response.render('home', {keyword: request.query.q, movies })
        })
    })
};