import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userCategoriesState, allCategoriesState } from '../recoil/atoms'
import CategoryMenu from '../components/CategoryMenu'
import CategoryModel from '../models/category'

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
        const deletedCategories = processDeleted(userCategories, selectedCategories)
        const addCategories = processAdded(userCategories, selectedCategories)
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
            <p>Email: {userEmail}</p>
            <button onClick={handleClick}>Change password</button>
            { error? <p>{error}</p> : ''}
            <CategoryMenu {...{ type: 'categories', categories: allCategories, selected: selectedCategories, setCategories: setSelectedCategories}}/>
            <CategoryMenu {...{ type: 'country', categories: allCategories, selected: selectedCategories, setCategories: setSelectedCategories}}/>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default UserProfile
