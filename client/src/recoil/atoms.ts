import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { CategoryData } from '../global/types'

const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: localStorage
})


export const userState = atom({
    key:'userState',
    default: null || '' as string,
    effects_UNSTABLE: [persistAtom]
})

export const userCategoriesState = atom({
    key:'userCategories',
    default: null || [] as string[],
    effects_UNSTABLE: [persistAtom]
})

export const allCategoriesState = atom({
    key:'allCategoriesState',
    default: [] as CategoryData[],
    effects_UNSTABLE: [persistAtom]
})