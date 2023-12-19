import React, { useRef } from 'react'
import styled from 'styled-components'
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase"


function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
        ).catch((err) => {
            alert(err.message)
        })
    }

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value,
        ).catch((err) => {
            alert(err.message)
        })
    }

    return (
        <Container>
            <CTA>
                <InnerForm>
                    <h1>Sign in</h1>
                    <EmailBox ref={emailRef}></EmailBox>
                    <PasswordBox ref={passwordRef}></PasswordBox>
                    <SignInButton onClick={signIn}>Sign in</SignInButton>
                    <span>New to Netflix? <span onClick={register}>Sign up now.</span></span>
                </InnerForm>
            </CTA>
            <Footer />
            <Background />
        </Container>
    )
}

export default Login

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    position: relative;
    height: 100vh;
    width: 100%;

    &:after{
        display: block;
        position: absolute;
        content: "";
        width: 100%;
        height: 100vh;
        background-image: linear-gradient(to top, rgba(0,0,0,0.5) 0, rgba(0,0,0,0) 90%, rgba(0,0,0,0.8) 100%);
    }
`

const CTA = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 90px;
    margin-bottom: 630px;
    min-height: 660px;
    width: 450px;
    background-color: rgba(0,0,0, 0.8);
    color: white;
    z-index: 1;

`

const InnerForm = styled.form`
    display: flex;
    flex-flow: column nowrap;
    margin-top: 63px;
    width: 315px;

    h1{
        font-size: 32px;
        letter-spacing: 0.5px;
    }
    span{
        margin-top: 80px;
        font-size: 16px;
        color: #737373;
    }
    span:nth-child(1){
        color: rgb(250,250,250);
        cursor: pointer;
        
        &:hover{
           text-decoration: underline;
        }
    }
`

const EmailBox = styled.input.attrs({ type: "email", placeholder: "Email address" })`
    margin-top: 28px;
    padding: 17px;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;

    &:focus{
        outline: none;
    }
`

const PasswordBox = styled.input.attrs({ type: "password", placeholder: "Password" })`
    margin-top: 16px;
    padding: 17px;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;   

    &:focus{
        outline: none;
    }
`

const SignInButton = styled.button.attrs({ type: "submit" })`
    margin-top: 38px;
    padding: 15px;
    border: none;
    border-radius: 5px;
    background-color: #E50914;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgb(250,250,250);
    cursor: pointer;

    &:hover{
        background-color: #C11119;
    }
`

const Footer = styled.div`
    display: flex;
    height: 200px;
    width: 100%;
    background-color: rgba(0,0,0, 0.7);
    z-index: 1;
`

const Background = styled.div`
    inset: 0;
    position: absolute;
    background-image: url("/images/login_large.jpg");
    background-size: cover;
    opacity: 0.65;
`