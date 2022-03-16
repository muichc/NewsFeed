import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    let loggedIn;
    if(localStorage.getItem('user')) {
        loggedIn = true;
    } else {
        loggedIn = false;
    }
    const navigate = useNavigate();

    const handleLogOut = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <div>
            { loggedIn && 
                <button onClick = {handleLogOut}> Log Out </button> 
            }
            
        </div>
    )
}

export { Header }
