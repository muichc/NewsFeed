import React from 'react'
import { Login } from '../components/auth/Login'
import { Register } from '../components/auth/Register'
import { Title } from '../components/header/Title'
import { BackButton } from '../components/BackButton'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider';



const Authentication = () => {

    return (
        <div>
            <Title />
            <hr className='header-divide-line'></hr>
            <BackButton />
            <Stack 
                direction={{xs:'column', sm: 'row'}}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={10}
                className='authentication-stack'
            >
                <Login />
                <Register />
            </Stack>
            
        </div>
    )
}

export { Authentication }
