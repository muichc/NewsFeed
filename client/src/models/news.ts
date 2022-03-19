import { QueryData } from '../global/types'


const URL : string = process.env.SERVER_API_URL || 'http://localhost:8000'


class NewsModel {
    static all = () => {
        return fetch(`${URL}/news`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            return response.json()
        })
    } 
    static allByCategory = (data: string) => {
        return fetch(`${URL}/news/byCategory`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        })
    }

    static allByUser = (data:string[]) => {
        return fetch(`${URL}/news/byUser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        })
    }

    static search = (data: QueryData) => {
        return fetch(`${URL}/news/search/`, {
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
    static saveNews = (data: QueryData) => {
        return fetch(`${URL}/news/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
    static deleteNews = (data: QueryData) => {
        return fetch(`${URL}/news/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
    }
}

export { NewsModel }