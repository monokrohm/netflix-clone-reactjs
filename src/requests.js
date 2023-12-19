const API_KEY = "a0e94928deedd50aac529d441cb486d3"

const requests = {
    fectchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fectchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fectchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fectchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fectchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fectchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fectchDoco: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fectchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
}

export default requests;