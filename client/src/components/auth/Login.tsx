import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { userState, userCategoriesState } from '../../recoil/atoms'
import { AuthModel } from '../../models/auth'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'


const Login = () => {
    const setUser = useSetRecoilState(userState)
    const setCategories = useSetRecoilState(userCategoriesState)
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    let navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response  = await AuthModel.login({email:userEmail, password:userPassword})
        if (response.status === 200) {
            setUser(response.user)
            const categoryArray = []
            if (response.categories.length > 0 ){
                for (let category of response.categories) {
                    categoryArray.push(category.name)
                }
            }
            setCategories(categoryArray)
            navigate("/")
        } else {
            setError("Something went wrong, please try again");
            console.log(response)
            navigate("/login")
        }
    }
    return (
        <div>
            <Typography variant="h2" className='auth-heading' sx={{ fontSize: '30px'}}>Login</Typography>
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
                    <Button type='submit' variant="contained">Login</Button>
                </Stack>
            </form>
        </div>
    )
}

export { Login }
