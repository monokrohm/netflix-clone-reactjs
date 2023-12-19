import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Headache from './Headache'
import { selectUser } from '../features/userSlice'
import { auth, signOut } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Profile() {
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    return (
        <Container>
            <UserDataContainer>
                <h1>Edit Profile</h1>
                <UserDataInner>
                    <img src="/images/avatar.jpg" />
                    <UserData>
                        <h2>{user.email}</h2>
                        <h3>Plans</h3>
                        <Headache />
                    </UserData>
                </UserDataInner>
                <ButtonsContainer>
                    <SaveButton onClick={() => navigate("/home")}>Save</SaveButton>
                    <CancelButton onClick={() => navigate("/home")}>Cancel</CancelButton>
                    <SignOutButton onClick={() => { signOut(auth); navigate("/"); }}>Sign Out</SignOutButton>
                </ButtonsContainer>
            </UserDataContainer>

        </Container>
    )
}

export default Profile

const Container = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100%;
`
const UserDataContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    top: 0;
    margin-top: 200px; 
    width: 50%;
    max-width: 800px;

    h1{
        margin-bottom: 20px;
        font-size: 60px;
        font-weight: 400;
        white-space: nowrap;
        color: white;
    }
`
const UserDataInner = styled.div`
    display: flex;
    img{
        height: 100px;
        width: 100px;
    }
`
const UserData = styled.div`
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    margin-left: 25px;
    color: white;

    h2{
        padding: 15px;
        padding-left: 20px;
        background-color: rgb(100,100,100);
        font-size: 16px;
        letter-spacing: 0.7px;
    }
    h3{
        margin-top: 20px;
        padding-bottom: 10px; 
        letter-spacing: 0.7px;
        border-bottom: 1px solid #282c2d;
    }
`
const ButtonsContainer = styled.div`
    display: grid;
    align-items: center;
    flex: 0 0;
    grid-template-columns: 1fr 1fr 2fr;
    grid-gap: 10px;
    box-sizing: border-box;
`
const SaveButton = styled.button`
    inset: 0;
    margin-top: 20px;
    padding: 10px 40px;
    font-size: 16px;
    font-weight: 800;
    letter-spacing: 0.7px;
    border: 3px solid rgb(250,250,250);
    background-color: rgb(250,250,250);
    cursor: pointer;
    
    transition: all 0.2s;
    &:hover{
        color: rgb(50,50,50);
        background-color: rgb(15,15,15);
        border: 3px solid rgb(50,50,50);
    }
`
const CancelButton = styled(SaveButton)`
    border: 3px solid rgb(50,50,50);
    background-color: rgb(0,0,0);
    color: rgb(50,50,50);

    &:hover{
        background-color: rgb(230, 230, 230);
    }
`
const SignOutButton = styled(CancelButton)`
    white-space: nowrap;
`