import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import ChangePassword from '../pages/ChangePassword'


const Paths = () => {
    
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login />} />
            <Route path='/register' element={ <Register />} />
            <Route path='/profile' element={ <UserProfile />} />
            <Route path='/changepw' element={<ChangePassword />}/>
            
        </Routes>
    )
}

export default Paths
