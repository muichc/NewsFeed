import { useState, useEffect } from 'react'
import { NewsModel } from '../models/news'
import { NewsData } from '../global/types'
import { CurrentCategoryProps } from '../global/types'

const useFetchNews = (data: CurrentCategoryProps) : [NewsData[], (data :CurrentCategoryProps) => Promise<void>] => {
    const [news, setNews] = useState<NewsData[]>([])
    const fetchNews = async (fetchData: CurrentCategoryProps)  => {
        if (fetchData.category === 'all') {
            try {
                const newsArray = await NewsModel.all()
                await setNews(newsArray.response.articles)
            } catch (error){
                console.log(error)
            }
        } else if (fetchData.category === 'user' && fetchData.userCategories) {
            try {
                const newsArray = await NewsModel.allByUser(fetchData.userCategories)
                await setNews(newsArray.response.articles)
            } catch(error) {
                console.log(error)
            }
        
        } else {
            try {
                const newsArray = await NewsModel.allByCategory(fetchData.category)
                await setNews(newsArray.response.articles)
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
            fetchNews(data)
    },  [])

    return [news, fetchNews]
}

export { useFetchNews }