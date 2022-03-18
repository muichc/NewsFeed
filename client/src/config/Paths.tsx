import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { loggedInState } from '../recoil/selectors'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import UserProfile from '../pages/UserProfile'
import ChangePassword from '../pages/ChangePassword'
import CategorySelection from '../pages/CategorySelection'

const Paths = () => {

    const loggedIn = useRecoilValue(loggedInState)
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login />} />
            <Route path='/register' element={ <Register />} />
            <Route path='/category' element={<CategorySelection />}/>
            {loggedIn && 
                <>
                    <Route path='/profile' element={ <UserProfile />} />
                    <Route path='/changepw' element={<ChangePassword />}/>
                    
                </>
            }
            
        </Routes>
    )
}

export default Paths
