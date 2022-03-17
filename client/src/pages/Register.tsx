import React, { useState } from 'react'
import { useNavigate }from 'react-router-dom'
import AuthModel from '../models/auth'


const Register = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [error, setError] = useState("")
    let navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await AuthModel.register({email:userEmail, password:userPassword})
        if (response.status === 200) {
            localStorage.setItem('user', userEmail)
            navigate("/category")
        } else {
            setError("Something went wrong, please try again");
            console.log(response)
            navigate("/register")
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <p>{error ? `${error}` : ''}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        name='email'
                        onChange={e => setUserEmail(e.target.value)}
                        value={userEmail}
                    />
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        onChange={e => setUserPassword(e.target.value)}
                        value={userPassword}
                    />
                </div>
            <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register
