import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthModel from '../models/auth'
import { userState, userCategoriesState } from '../recoil/atoms'
import { useSetRecoilState } from 'recoil';


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
            localStorage.setItem('user', userEmail)
            setUser(response.user)
            const categoryArray = []
            console.log(response.categories)
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
            <h2>Login</h2>
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
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login
