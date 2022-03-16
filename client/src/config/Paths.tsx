import React, { FunctionComponent } from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { UserData } from '../global/types'

interface Props extends UserData {
    children?: React.ReactNode;
}

const Paths : FunctionComponent<Props> = (props) => {
    
    return (
        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login {...props} />} />
            <Route path='/register' element={ <Register {...props} />} />
        </Routes>
    )
}

export default Paths
