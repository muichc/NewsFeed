import React, {useState, useEffect} from 'react'
import { useSetRecoilState } from 'recoil';
import { allCategoriesState } from '../recoil/atoms'
import { CategoryData } from '../global/types'
import CategoryModel from '../models/category'
import { Header } from '../components/Header'
import { NewsFeed } from '../containers/NewsFeed'
import { useRecoilValue } from 'recoil'
import { userState, userCategoriesState } from '../recoil/atoms'
import { CurrentCategoryProps } from '../global/types'



const Home = () => {
    const [categoryArray, setCategoryArray] = useState<CategoryData[]>([])
    const [error, setError] = useState('')
    const setAllCategories = useSetRecoilState(allCategoriesState)
    const loggedIn = useRecoilValue(userState)
    const userCategories = useRecoilValue(userCategoriesState)
    
    const [currentCategory, setCurrentCategory] = useState<string>(loggedIn? 'user': 'all')

    let categoryProp : CurrentCategoryProps = {category: currentCategory}
    if (loggedIn) {
        categoryProp = {category: currentCategory, userCategories}
    }
    const fetchCategories = async () => {
        const response = await CategoryModel.all()
        if (response.status === 200) {
            setCategoryArray(response.categories)
        } else {
            setError('Error fetching categories, please try again')
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        if (error) {
            console.log(error)
        } else {
            setAllCategories(categoryArray)
        }
    }, [categoryArray])

    return (
        <div>
            <Header />
            <hr></hr>
            <NewsFeed {...categoryProp} />
        </div>
    )
}

export default Home
