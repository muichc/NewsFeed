import React, {useState, useEffect} from 'react'
import { Header } from '../components/Header'
import { NewsFeed } from '../containers/NewsFeed'



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
            <Header />
            <NewsFeed />
        </div>
    )
}

export default Home
