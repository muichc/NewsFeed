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
        console.log("client side method")
        return fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()})
    }
    static verify = (data: UserData) => {
        return fetch(`${URL}/auth/verify`, {
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
    static changePassword = (data: UserPasswordData) => {
        console.log("client data", data)
        const jsonData = JSON.stringify(data)
        console.log("stringified data", jsonData)
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