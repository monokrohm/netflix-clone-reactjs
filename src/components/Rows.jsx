import React, { useState, useEffect } from 'react'
import './Rows.css'
import styled from 'styled-components'
import axios from '../axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const baseImgURL = "https://image.tmdb.org/t/p/original/"

function Rows({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerURL, setTrailerURL] = useState("")
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerURL("")
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParam = new URLSearchParams(new URL(url).search)
                    setTrailerURL(urlParam.get('v'))
                }).catch((err) => console.log(err))
        }
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL)
            console.log(request)
            setMovies(request.data.results)
            return request;
        }
        fetchData()
    }, [fetchURL])

    return (
        <Row>
            <h2>{title}</h2>
            <RowPosters>
                {
                    movies.map(movie => ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                            <img className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                src={`${baseImgURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                        )
                    )
                }
            </RowPosters>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </Row>
    )
}

export default Rows

const Row = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    h2{
        margin-left: 50px;
        color: white;
    }
`

const RowPosters = styled.div`
    display: flex;
    object-fit: contain;
    margin-left: 10px;
    padding: 20px;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    overflow-x: scroll;
    
    img{
        margin-right: 10px;
        margin-left: 20px;
        transition: transform 450ms;
        cursor: pointer;

        &.row__poster{
            max-height: 100px;

            &:hover{
                transform: scale(1.08);
            }
        }
        &.row__posterLarge{
            max-height: 250px;

            &:hover{
                transform: scale(1.09);
            }
        }    
    }
`