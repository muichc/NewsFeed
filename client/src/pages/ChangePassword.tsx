import React, { useState, useEffect } from 'react'
import AuthModel from '../models/auth'

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
        <div>
            {message}
            <form onSubmit={handleSubmit} >
                <label htmlFor='old-password'>Old Password</label>
                <input
                    type='password'
                    name='old-password'
                    onChange={e => setOldPassword(e.target.value)}
                    value={oldPassword}
                />
                <label htmlFor='new-password'>New Password</label>
                <input
                    type='password'
                    name='new-password'
                    onChange={e => setNewPassword(e.target.value)}
                    value={newPassword}
                />
                <button type='submit'> Change password </button>
            </form>
        </div>
    )
}

export default ChangePassword
