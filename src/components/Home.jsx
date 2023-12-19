import React from 'react'
import requests from '../requests'
import Rows from './Rows';
import Banner from './Banner';

function Home() {
    return (
        <div>
            <Banner />
            <Rows title="NETFLIX ORIGINALS" fetchURL={requests.fectchNetflixOriginals} isLargeRow />
            <Rows title="Trending Now" fetchURL={requests.fectchTrending} />
            <Rows title="Top Rated" fetchURL={requests.fectchTopRated} />
            <Rows title="Action Movies" fetchURL={requests.fectchActionMovies} />
            <Rows title="Comedy Movies" fetchURL={requests.fectchComedyMovies} />
            <Rows title="Horror Movies" fetchURL={requests.fectchHorrorMovies} />
            <Rows title="Romance Movies" fetchURL={requests.fectchRomanceMovies} />
            <Rows title="Documentaries" fetchURL={requests.fectchDoco} />
        </div>
    )
}

export default Home