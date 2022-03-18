import { selector } from 'recoil'
import { userState, userCategoriesState, allCategoriesState } from './atoms'

export const loggedInState = selector({
    key: 'loggedInState',
    get: ({ get }) => {
        const user = get(userState);
        if (user) return true
        return false
    }
})

export const categoryState = selector({
    key:'categoryState',
    get: ({ get }) => {
        const categories = get(userCategoriesState);
        return categories
    }
})

export const allCategories = selector({
    key: 'allCategories',
    get: ({ get }) => {
        const allCategories = get(allCategoriesState)
        return allCategories
    }
})