import React, { useState, useEffect } from 'react'
import './NewsFeed.css'
import NewsModel from '../models/news'
import { News } from '../components/News'
import { NewsData } from '../global/types'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

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
                <Grid item>
                    <News {...article} key={index}/>
                </Grid>
            )
        })
    }

    useEffect(()=> {
        fetchNews()
    },[])


    return (
        <Box className={'news-container'}>
            <Grid container rowSpacing={1} columnSpacing={{ xs:1, sm:2, md:3 }} justifyContent="center">
                {news ? (
                    <>
                        {newsList}
                    </>): 
                    <>
                        Loading...
                    </>    
                }
            </Grid>
        </Box>
        
        
    )
}

export { NewsFeed }
