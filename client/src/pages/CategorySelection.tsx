import React, { useState, useEffect } from 'react'
import { useNavigate }from 'react-router-dom'
import { CategoryModel } from '../models/category'
import { CategoryData } from '../global/types'
import { Header } from '../components/header/Header'
import { CategoryMenu } from '../components/categories/CategoryMenu'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const CategorySelection = ()=> {

    const [categoryArray, setCategoryArray] = useState<CategoryData[]>([])
    const [error, setError] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    
    const navigate = useNavigate()

    const fetchCategories = async () => {
        const response = await CategoryModel.all()
        console.log(response)
        if (response.status === 200) {
            setCategoryArray(response.categories)
        } else {
            setError('Error fetching categories, please try again')
        }
    }

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const response = await CategoryModel.saveCategories(selectedCategories)
        console.log(response)
        navigate('/auth')
    }

    const handleSkip = async(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        navigate('/auth')
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
                <Button onClick={handleSave} variant="outlined" className='button'>Save categories</Button>
                <Button onClick={handleSkip} variant="outlined" className='button'>Skip</Button>
            </Stack>
            
            
        </div>
        
    )
}

export { CategorySelection }
