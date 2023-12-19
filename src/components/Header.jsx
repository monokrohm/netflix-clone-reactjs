import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../features/userSlice'
import { auth } from '../firebase';

function Header({ user }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubcribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(setLogin({
                    uid: userAuth.uid,
                    email: userAuth.email
                }))
                navigate("/home")
            } else {
                dispatch(setLogout())
            }
        })
        return unsubcribe
    }, [dispatch])

    return (
        <Container>
            <Content user={user}>
                <Link to={user ? "/home" : "/"}>
                    <Logo src="/images/Netflix_logo.png" user={user}></Logo>
                </Link>
                {
                    user ?
                        <Nav>
                            <Link to='/home'>Home</Link>
                            <Link to='/home'>Series</Link>
                            <Link to='/home'>Films</Link>
                            <Link to='/home'>New & Popular</Link>
                            <Link to='/home'>My List</Link>
                            <Link to='/home'>Browse by Languages</Link>
                        </Nav>
                        : null
                }
                {
                    user ?
                        <ButtonGroup>
                            <SearchButton src="/images/search-icon.png" />
                            <Link to='/home'>Children</Link>
                            <Notifications src="/images/notification-icon.png" />
                        </ButtonGroup>
                        : null
                }
                {
                    user ? <Link to="/profile"><Profile src="/images/avatar.jpg" ></Profile></Link> :
                        <Link to="/login" style={{ textDecoration: 'none' }}><SignIn>Sign In</SignIn></Link>
                }
            </Content>
        </Container >
    )
}

export default Header

const Container = styled.div`
    display: flex;
    align-items: center;   
    position: fixed;
    width: 100%;
    z-index: 3;
`

const Content = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: ${props => props.user ? 'initial' : 'space-between'};
    margin-top: 10px;
    width: 100%; 
    
    @media (max-width: 1280px){
        margin-left: ${props => props.user ? '40px' : '15px'};
        margin-right: ${props => props.user ? '50px' : '30px'};
    }
    @media (min-width: 1281px) and (max-width: 1920px){
        margin-left: ${props => props.user ? '40px' : '135px'};
        margin-right: ${props => props.user ? '50px' : '200px'};
    }
    @media (min-width: 1921px) and (max-width: 2600px){
        margin-left: ${props => props.user ? '40px' : '410px'};
        margin-right: ${props => props.user ? '50px' : '450px'};
    }
    @media (min-width: 2601px){
        margin-left: ${props => props.user ? '40px' : '540px'};
        margin-right: ${props => props.user ? '50px' : '560px'};
    }
`

const Logo = styled.img`
    width: ${props => props.user ? '130px' : '190px'};
    object-fit: contain;
    cursor: pointer;
`

const SignIn = styled.button`
    padding: 7px 20px;
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

const Profile = styled.img`
    align-items: center;
    width: 55px;
    cursor: pointer;
`

const Nav = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    padding-left: 40px;

    a{
        padding-right: 30px;
        font-size: 18px;
        letter-spacing: 0.5px;
        text-decoration: none;
        white-space: nowrap;
        color: rgb(180,180,180);

        &:hover{
            color: rgb(250,250,250);
        }
    }
`

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;

    a{
        font-size: 18px;
        letter-spacing: 0.5px;
        text-decoration: none;
        white-space: nowrap;
        color: rgb(180,180,180);

        &:hover{
            color: rgb(250,250,250);
        }
    }
`

const SearchButton = styled.img`
    padding: 0 20px 0 20px;
    height: 30px;
    cursor: pointer;
`
const Notifications = styled(SearchButton)`
`