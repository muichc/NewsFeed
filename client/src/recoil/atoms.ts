import { atom } from 'recoil'
import { CategoryData } from '../global/types'


export const userState = atom({
    key:'userState',
    default: null || '' as string
})

export const userCategoriesState = atom({
    key:'userCategories',
    default: null || [] as string[]
})

export const allCategoriesState = atom({
    key:'allCategoriesState',
    default: [] as CategoryData[]
})