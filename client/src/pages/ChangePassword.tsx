import React, { useState, useEffect } from 'react'
import { AuthModel } from '../models/auth'
import { Header } from '../components/header/Header'
import { BackButton } from '../components/BackButton'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


const ChangePassword = () => {
    
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const email : string = localStorage.getItem('user') || ''

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await AuthModel.changePassword({email, password:oldPassword, newPassword})
        console.log(response)
        if (response.status === 200) {
            setMessage('Success, password successfully changed')
        } else {
            setMessage('Something went wrong, please try again')
        }
    }


    return (
        <Box>
            <Header />
            <hr className='header-divide-line'></hr>
            {message}
            <BackButton />
            <form onSubmit={handleSubmit} className='form' >
                <Stack spacing={2}>
                    <>
                        <TextField
                            required
                            id="old-password-input"
                            label="Current Password"
                            type="password"
                            variant="standard"
                            name='old-password'
                            onChange={e => setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                    </>
                    <>
                        <TextField
                            required
                            id="new-password-input"
                            label="New Password"
                            type="password"
                            variant="standard"
                            name='new-password'
                            onChange={e => setNewPassword(e.target.value)}
                            value={newPassword}
                            className='password-input'
                        />
                    </>
                    <Button type='submit' variant="outlined"> Save password </Button>
                </Stack>
            </form>
        
        </Box>
    )
}

export { ChangePassword }
