import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Landing() {
    return (
        <Container>
            <LandingBanner>
                <CTA>
                    <h1>Unlimited movies, TV shows and more</h1>
                    <span>Watch anywhere. Cancel at any time.</span>
                    <span>Ready to watch Netflix? Enter your email to create or restart your membership.</span>
                    <EmailEntry>
                        <EmailBox></EmailBox>
                        <Link to="/login"><StartButton>Get started &gt;</StartButton></Link>
                    </EmailEntry>
                </CTA>
                <Background />
            </LandingBanner>
        </Container>
    )
}

export default Landing

const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
`

const LandingBanner = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    height: 720px;
    width: 100%;

    &:before{
        display: block;
        position: absolute;
        content: "";
        width: 100%;
        height: 100px;
        top: 0;
        background-image: linear-gradient(to top, rgba(37,37,37,0),#000000);
        z-index: 1;
    }

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

const CTA = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    color: white;
    z-index: 1;

    h1{
        padding-top: 70px;
        font-family: 'NetflixSansBl';
        font-size: 48px;
        font-weight: 800;
        text-align: center;
    }
    span{
        padding-top: 15px;
        padding-bottom: 10px;
        font-size: 25px;
        text-align: center;  
    }
    span:nth-child(3){
        font-size: 20px;
        text-align: center;
    }
`

const EmailEntry = styled.div`
    display: flex;
    padding-top: 10px;

    @media (max-width: 769px){
        flex-flow: column nowrap;
        align-items: center;
    }
`

const EmailBox = styled.input.attrs({ type: 'email', placeholder: 'Email address' })`
    margin-right: 8px;
    padding: 0 15px;
    width: 350px;
    min-height: 53px;
    border: 1px solid rgba(250,250,250, 0.3);
    border-radius: 5px;
    background-color: rgba(30,30,30,0.5);
    color: rgb(250,250,250);
`

const StartButton = styled.button`
    display: inline-flex;
    padding: 12px 30px;
    max-width: 210px;
    border: none;
    border-radius: 5px;
    background-color: #E50914;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgb(250,250,250);
    cursor: pointer;

    &:hover{
        background-color: #C11119;
    }

    @media (max-width: 769px){
        margin-top: 10px;
    }
`

const Background = styled.div`
    position: absolute;
    inset: 0;
    background-position: center;
    background-size: cover;
    background-image: url("/images/login_large.jpg");
    opacity: 0.4;
`