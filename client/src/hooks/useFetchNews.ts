import { useState, useEffect } from 'react'
import NewsModel from '../models/news'
import { NewsData } from '../global/types'
import { CurrentCategoryProps } from '../global/types'

interface NewsSpecs{
    category: string, 
    data?:string[]
}

const useFetchNews = (data: CurrentCategoryProps) : [NewsData[], (data :CurrentCategoryProps) => Promise<void>] => {
    const [news, setNews] = useState<NewsData[]>([])
    console.log("inside hook")
    console.log("category is", data.category)
    const fetchNews = async (fetchData: CurrentCategoryProps)  => {
        console.log("inside fetch news", fetchData.category)
        if (fetchData.category === 'all') {
            try {
                console.log("trying to fetch all now")
                const newsArray = await NewsModel.all()
                await setNews(newsArray.response.articles)
                console.log(newsArray)
            } catch (error){
                console.log(error)
            }
        } else if (fetchData.category === 'user' && fetchData.userCategories) {
            try {
                console.log("fetching by user now")
                const newsArray = await NewsModel.allByUser(fetchData.userCategories)
                await setNews(newsArray.response.articles)
                console.log("response inside hook", newsArray)
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
        console.log('calling useeffect in hook')
            fetchNews(data)
    },  [])

    return [news, fetchNews]
}

export { useFetchNews }