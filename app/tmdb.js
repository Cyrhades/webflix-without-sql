const fetch = require('node-fetch');

function getInfos(url) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TOKEN_API_TMDB}`
        }
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(json => {
            return {
                total_pages: json.total_pages,
                movies : json.results.map(movie => {
                    return {
                        tmdb_id: movie.id, 
                        vote_average: movie.vote_average, 
                        release_date: movie.release_date, 
                        title: movie.title || movie.name, 
                        poster_path: movie.poster_path 
                    } 
                }),

            }
        })
        .catch(err => console.error('error:' + err));
}

exports.search = (keyword, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=fr-FR&page=${page || 1}`;
    return getInfos(url);
};

exports.news = () => {
    return getInfos(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`);
};

exports.series = () => {
    return getInfos(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`);
};

exports.details = (id) => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TOKEN_API_TMDB}`
        }
    };

    return fetch(url, options)
        .then(responseHttp => responseHttp.json())
        .then((json) => { 
            console.log( {
                tmdb_id: json.id, 
                vote_average: json.vote_average, 
                release_date: json.release_date,
                title: json.title, 
                poster_path: json.poster_path,
                backdrop_path: json.backdrop_path,
                genres: json.genres,
                overview: json.overview,
                tagline: json.tagline
            } );
            return {
                tmdb_id: json.id, 
                vote_average: json.vote_average, 
                release_date: json.release_date,
                title: json.title, 
                poster_path: json.poster_path,
                backdrop_path: json.backdrop_path,
                genres: json.genres,
                overview: json.overview,
                tagline: json.tagline
            } 
        })
        .catch(err => console.error('error:' + err));
};