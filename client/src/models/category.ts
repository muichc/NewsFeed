const URL : string = process.env.REACT_APP_SERVER_API_URL || process.env.SERVER_API_URL || 'http://localhost:8000'


class CategoryModel {
    static all = () => {
        return fetch(`${URL}/category/all`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            return response.json()
        }
            )
    }
    static saveCategories = (data: {categories: string[], user : string}) => {
        return fetch(`${URL}/category/save`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data})
        }).then((response) => {
            return response.json()
        })
    }
    static deleteCategories = (data: {categories: string[], user : string}) => {
        return fetch(`${URL}/category/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({data})
        }).then((response) => {
            return response.json()
        })
    }
}

export { CategoryModel }