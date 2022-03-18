import React, { useState, useEffect } from 'react'
import { News } from '../components/News'
import { NewsData, CurrentCategoryProps  } from '../global/types'
import { useFetchNews } from '../hooks/useFetchNews'
import './NewsFeed.css'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const NewsFeed = (props: CurrentCategoryProps) => {
    let fetchData : CurrentCategoryProps = {category: props.category}
    if (props.userCategories) {
        fetchData = {category: props.category, userCategories: props.userCategories}
    }
    const [news, fetchNews] = useFetchNews(fetchData)
    const [newsList, setNewsList] = useState<React.ReactElement[]>([])

    const createNewsList = () => {
        let newsArray : React.ReactElement[] = [];
        if (news) {
            newsArray = news.map((article : NewsData, index) => {
                return  (
                    <Grid item key={index}>
                        <News {...article} />
                    </Grid>
                )
            })
        }
        return newsArray
    }  

    useEffect(()=> {
        fetchNews(fetchData)
    },[])

    useEffect(() => {
        const result : React.ReactElement[] = createNewsList()
        setNewsList(result)
    }, [news])


    return (
        <Box className={'news-container'}>
            <Grid container rowSpacing={1} columnSpacing={{ xs:1, sm:2, md:3 }} justifyContent="center">
                {news ? (
                    <>
                        {newsList}
                    </>
                ):  <>
                        <CircularProgress />
                    </>    
                }
            </Grid>
        </Box>
        
        
    )
}

export { NewsFeed }
