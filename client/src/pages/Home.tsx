import React, {useState, useEffect} from 'react'
import { useSetRecoilState } from 'recoil';
import { allCategoriesState } from '../recoil/atoms'
import { CategoryData } from '../global/types'
import CategoryModel from '../models/category'
import { Header } from '../components/Header'
import { NewsFeed } from '../containers/NewsFeed'



const Home = () => {

    const [categoryArray, setCategoryArray] = useState<CategoryData[]>([])
    const [error, setError] = useState('')
    const setAllCategories = useSetRecoilState(allCategoriesState)


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
            <NewsFeed />
        </div>
    )
}

export default Home
