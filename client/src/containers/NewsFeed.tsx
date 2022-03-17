import React, { useState, useEffect } from 'react'
import NewsModel from '../models/news'
import { News } from '../components/News'
import { NewsData } from '../global/types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const NewsFeed = () => {
    const [news, setNews] = useState([])
    const fetchNews = async () => {
        const newsArray = await NewsModel.all()
        console.log("news array", newsArray.response.articles)
        setNews(newsArray.response.articles)
    }
    let newsList : any[] = []
    if (news) {
        newsList = news.map((article : NewsData,index) => {
            return  (
            <ListItem key={index}><News {...article}/></ListItem>
            )
        })
    }

    useEffect(()=> {
        fetchNews()
    },[])


    return (
        <>
            {news ? 
                <List>
                    {newsList}
                </List> 
                : 
                <>
                    Loading...
                </>    
        }
            
        </>
        
    )
}

export { NewsFeed }
