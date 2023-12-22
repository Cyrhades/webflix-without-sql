const tmdb = require("./tmdb.js");
module.exports = (app) => {
    // Déclarer notre première route
    app.get('/',(request, response) => {
        // affichage du rendu de notre fichier ./views/home.pug
        response.render('home')
    })

    app.get("/inscription", (request, response) => {
        response.render('register')
    })

    app.post("/inscription", (request, response) => {
        console.log(request.body)
        response.send("todo faire l'inscription");
    })


    app.get("/connexion", (request, response) => {
        response.render('connection')
    })

    app.post("/connexion", (request, response) => {
        console.log(request.body)        
        response.send("todo faire la connexion");
    })

    app.get('/search', (request, response) => {
        if(request.query.q != undefined && request.query.q != "") {            
            tmdb.search(request.query.q, request.query.page).then(results => {
                response.render('search', {
                    last: results.total_pages,
                    page: request.query.page||1,
                    movies: results.movies,
                    keyword: request.query.q,
                    route : `/search?q=${request.query.q}&`
                })
            })
        } else {
            response.render('search', {
                route : `/search?q=${request.query.q}&`
            })
        }
    })

    app.get('/news', (request, response) => {
        tmdb.news().then(results => {
            response.render('new', {
                movies: results.movies
            })
        })
    })

    app.get('/series', (request, response) => {
        tmdb.series().then(results => {
            response.render('series', {
                movies: results.movies
            })
        })
    })


    app.get('/movie/:id', (request, response) => {
        tmdb.details(request.params.id).then(movie => {
            response.render('movie', { movie })
        })
    })
};