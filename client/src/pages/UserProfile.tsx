import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../models/auth'

const UserProfile = () => {
    const userEmail = localStorage.getItem('user')
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/changepw')
    }

    return (
        <div>
            <p>Email: {userEmail}</p>
            <button onClick={handleClick}>Change password</button>
        </div>
    )
}

export default UserProfile
