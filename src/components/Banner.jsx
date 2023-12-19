import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '../axios'
import requests from '../requests'


function Banner() {
    const [movie, setMovie] = useState([])

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fectchNetflixOriginals)
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            )
            return request
        }
        fetchData()
    }, [])

    return (
        <Container>
            <Background src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}></Background>
            <Content>

                <Title>{movie?.title || movie?.name || movie?.original_name}</Title>
                <Description>
                    {truncate(movie?.overview, 250)}
                </Description>
                <Buttons>
                    <PlayButton>
                        <img src="/images/play-icon-black.png" alt="" />
                        Play
                    </PlayButton>
                    <MoreInfo>
                        <img src="/images/info.png" alt="" />
                        More Info
                    </MoreInfo>
                </Buttons>
            </Content>
        </Container>
    )
}

export default Banner

const Container = styled.div`
    display: flex;
    position: relative;
    max-height: 80vh;

    &:after{
        display: block;
        position: absolute;
        content: "";
        width: 100%;
        height: 150px;
        bottom: 0;
        background-image: linear-gradient(to bottom, rgba(37,37,37,0),#000000);
    }
`

const Background = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    max-height: 80vh;
`

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    margin-left: 50px;
    inset: 0;
`

const Title = styled.div`
    display: flex;
    font-weight: 800;
    font-size: 48px;
    white-space: nowrap;
    color: white;

    @media (max-width: 650px){
        margin-top: 30px;
    }
`

const Description = styled.div`
    margin-top: 5px;
    width: 700px;
    min-width: 400px;
    max-width: 40vw;
    font-size: 16px;
    line-height: 1.3;
    color: white;
`

const Buttons = styled.div`
    display: flex;
    padding-top: 25px; 
    z-index: 2;
`

const PlayButton = styled.button`
    display: flex;
    align-items: center;
    justify-contents: center;
    margin-right: 15px;
    padding: 0 27px;
    height: 37px;
    border: none;
    border-radius: 5px;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.7px;
    text-align: center;
    background-color: white;
    cursor: pointer;

    img{
        width: 35px;
    }
    &:hover{
        background-color: rgb(180, 180, 180);
        transition: all 0.2s;
    }
`

const MoreInfo = styled(PlayButton)`
    background-color: rgb(100,100,100);
    color: rgb(250,250,250);
    
    img{
        padding-right: 10px;
        width: 25px;
        object-fit: contain;
    }
`
