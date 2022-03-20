import React, { useState, useEffect } from 'react'
import { useNavigate }from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState, userCategoriesState } from '../recoil/atoms'
import { CategoryModel } from '../models/category'
import { CategoryData } from '../global/types'
import { Header } from '../components/header/Header'
import { CategoryMenu } from '../components/categories/CategoryMenu'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const CategorySelection = ()=> {
    const user = useRecoilValue(userState)
    const setCategories = useSetRecoilState(userCategoriesState)
    const [categoryArray, setCategoryArray] = useState<CategoryData[]>([])
    const [error, setError] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    
    const navigate = useNavigate()

    const fetchCategories = async () => {
        const response = await CategoryModel.all()
        if (response.status === 200) {
            setCategoryArray(response.categories)
        } else {
            setError('Error fetching categories, please try again')
        }
    }

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const response = await CategoryModel.saveCategories({categories: selectedCategories, user})
        if (response.status !== 200) {
            setError('Something went wrong with saving categories')
        }
        setCategories(selectedCategories)
        navigate('/')
    }

    const handleSkip = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        navigate('/')
    }

    useEffect(() => {
        fetchCategories()
    }, [])
    
    return (
        <div>
            <Header />
            <hr className='header-divide-line'></hr>
            <Stack className='category-stack' spacing={2}>
                <Typography variant="subtitle1">Please select categories of news you are interested in!</Typography>
                { error? <Typography variant="overline">{error}</Typography> : ''}
                { categoryArray.length > 0 ?
                    <div>
                        <CategoryMenu {...{type: 'categories', categories: categoryArray, selected: selectedCategories, setCategories: setSelectedCategories}} />
                        <CategoryMenu {...{type: 'country', categories: categoryArray, selected: selectedCategories, setCategories: setSelectedCategories}} />
                    </div>
                    
                : <CircularProgress />
                }
                <Button onClick={handleSave} variant="outlined" className='button'>Save</Button>
                <Button onClick={handleSkip} variant="outlined" className='button'>Skip</Button>
            </Stack>
            
            
        </div>
        
    )
}

export { CategorySelection }
