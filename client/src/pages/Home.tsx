import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'



const Home = () => {

    const currentUser = localStorage.getItem('user')
    let loggedIn;
    if(currentUser) {
        loggedIn = true;
    } else {
        loggedIn = false;
    }

    return (
        <div>
            { loggedIn &&
                <Header />
            }
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>

        </div>
    )
}

export default Home
