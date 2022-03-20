const URL : string = process.env.REACT_APP_SERVER_API_URL || process.env.SERVER_API_URL || 'http://localhost:8000'


class NewsModel {
    static all = () => {
        console.log("entering fetch all")
        console.log(process.env.SERVER_API_URL)
        return fetch(`${URL}/news`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            console.log(response)
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

}

export { NewsModel }