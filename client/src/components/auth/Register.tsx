import React, { useState } from 'react'
import { useNavigate }from 'react-router-dom'
import { AuthModel } from '../../models/auth'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'


const Register = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    let navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await AuthModel.register({email:userEmail, password:userPassword})
        if (response.status === 200) {
            navigate("/category")
        } else {
            setError("Something went wrong, please try again");
            console.log(response)
            navigate("/register")
        }
    }

    return (
        <div>
            <Typography variant="h2" className='auth-heading' sx={{ fontSize: '30px'}}>Register an account</Typography>
            <Typography variant="caption">{error ? `${error}` : ''}</Typography>
            <form onSubmit={handleSubmit} className='form'>
                <Stack spacing={2}>
                    <>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            type="text"
                            variant="standard"
                            name='email'
                            onChange={e => setUserEmail(e.target.value)}
                            value={userEmail}
                        />
                    </>
                    <>
                        <TextField
                            required
                            id="password-input"
                            label="Password"
                            type="password"
                            variant="standard"
                            name='password'
                            onChange={e => setUserPassword(e.target.value)}
                            value={userPassword}
                            className='password-input'
                        />
                    </>
                    <Button type='submit' variant="contained">Register</Button>
                </Stack>
            
            </form>
        </div>
    )
}

export { Register }
