import React, {useState, useEffect} from 'react'
import { useSetRecoilState } from 'recoil';
import { allCategoriesState } from '../recoil/atoms'
import { CategoryData } from '../global/types'
import { CategoryModel } from '../models/category'
import { Header } from '../components/header/Header'
import { NewsFeed } from '../containers/NewsFeed'
import { useRecoilValue } from 'recoil'
import { userState, userCategoriesState } from '../recoil/atoms'
import { CurrentCategoryProps } from '../global/types'



const Home = () => {
    const loggedIn = useRecoilValue(userState)
    const setAllCategories = useSetRecoilState(allCategoriesState)
    const [allCategoriesArray, setAllCategoriesArray] = useState<CategoryData[]>([]) 
    const userCategories = useRecoilValue(userCategoriesState)
    const [currentCategory, setCurrentCategory] = useState<string>(loggedIn? 'user': 'all')
    const [error, setError] = useState('')

    // Assigns category prop for NewsFeed container
    let categoryProp : CurrentCategoryProps = {category: currentCategory}
    if (loggedIn) {
        categoryProp = {category: currentCategory, userCategories}
    }

    //  Fetches all categories being used by app
    const fetchCategories = async () => {
        const response = await CategoryModel.all()
        if (response.status === 200) {
            setAllCategoriesArray(response.categories)
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
            setAllCategories(allCategoriesArray)
        }
    }, [allCategoriesArray])

    return (
        <div className='home-div'>
            <Header />
            <hr className='header-divide-line'></hr>
            <NewsFeed {...categoryProp} />
        </div>
    )
}

export { Home }
