const fetch = require('node-fetch');

exports.search = (keyword, page) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=${page || 1}`;
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
                total_pages: 500,
                movies : json.results.map(movie => {
                    return {
                        tmdb_id: movie.id, 
                        vote_average: movie.vote_average, 
                        release_date: movie.release_date, 
                        title: movie.title, 
                        poster_path: movie.poster_path 
                    } 
                }),

            }
        })
        .catch(err => console.error('error:' + err));
};