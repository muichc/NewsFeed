import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userCategoriesState, allCategoriesState } from '../recoil/atoms'
import CategoryMenu from '../components/categories/CategoryMenu'
import CategoryModel from '../models/category'
import { Header } from '../components/header/Header'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const sectionStyle = {
    fontSize: '20px'
}

const UserProfile = () => {
    
    const userEmail = localStorage.getItem('user')
    const userCategories = useRecoilValue(userCategoriesState)
    const [selectedCategories, setSelectedCategories] = useState<string[]>(userCategories)
    const allCategories = useRecoilValue(allCategoriesState)
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/changepw')
    }

    const processDeleted = (userCategories: string[], selectedCategories:string[]) => {
        const deletedCategories : string[] = []
        for (let category of userCategories) {
            const name : string = category.toLowerCase()
            if (!(selectedCategories.includes(name))) {
                deletedCategories.push(name)
            }
        }
        return deletedCategories
    }

    const processAdded = (userCategories: string[], selectedCategories:string[]) => {
        const addCategories : string[] = []
        for (let category of selectedCategories) {
            const name : string = category.toLowerCase()
            if (!(userCategories.includes(name))) {
                addCategories.push(name)
            }
        }
        return addCategories
    }

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()    
        const deletedCategories : string[] = processDeleted(userCategories, selectedCategories)
        const addCategories : string[] = processAdded(userCategories, selectedCategories)
        if (deletedCategories.length > 0) {
            const deleteResponse = await CategoryModel.deleteCategories(deletedCategories)
            if (deleteResponse.status !== 200) {
                setError("Something went wrong, categories could not be deleted, please try again later")
            }
        }
        if (addCategories.length > 0) {
            const addResponse = await CategoryModel.saveCategories(addCategories)
            if (addResponse.status !== 200) {
                setError("Something went wrong, categories could not be added, please try again later")
            }
        }
        navigate('/profile')
    }

    return (
        <div>
            <Header />
            <hr className='header-divide-line'></hr>
            <Stack spacing={2} className='category-stack'>
                <Typography variant="overline" className='section-heading' sx={{ fontSize:'20px' }}> Your account information: </Typography>
                <Typography variant="body2">Email: {userEmail}</Typography>
                <Button onClick={handleClick} variant="outlined" className='button'>Change password</Button>
            </Stack>
            
            <Stack spacing={2} className='category-stack'>
                <Typography variant="overline" className='section-heading' sx={{ fontSize:'20px' }}> You have selected the following categories you are interested in: </Typography>
                <Typography variant="caption" sx={{ fontSize: '15px'}}>Please select or deselect categories through the dropdown menu to see the news that you want!</Typography>
                { error? <Typography variant="subtitle1">{error}</Typography> : ''}
                <CategoryMenu {...{ type: 'categories', categories: allCategories, selected: selectedCategories, setCategories: setSelectedCategories}}/>
                <CategoryMenu {...{ type: 'country', categories: allCategories, selected: selectedCategories, setCategories: setSelectedCategories}}/>
                <Button variant="outlined" onClick={handleSave} className='button'>Save</Button>
            </Stack>
        </div>
    )
}

export default UserProfile
