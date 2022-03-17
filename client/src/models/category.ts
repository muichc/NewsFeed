import { CategoryData } from '../global/types'

const URL : string = process.env.SERVER_API_URL || 'http://localhost:8000'


class CategoryModel {
    static all = () => {
        return fetch(`${URL}/category/all`, {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => {
            console.log(response)
            return response.json()
        }
            )
    }
    static saveCategories = (categories: string[]) => {
        return fetch(`${URL}/category/save`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({categories, user:localStorage.getItem('user')})
        }).then((response) => {
            console.log(response)
            return response.json()
        })
    } 
}

export default CategoryModel