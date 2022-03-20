import { UserData } from '../global/types'
import { UserPasswordData } from '../global/types'

const URL : string = process.env.SERVER_API_URL || 'http://localhost:8000'


class AuthModel {
    static register = (data: UserData) => {
        return fetch(`${URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
    static login = (data: UserData) => {
        return fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()})
    }
    static changePassword = (data: UserPasswordData) => {
        return fetch(`${URL}/auth/changepw`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
}

export { AuthModel }