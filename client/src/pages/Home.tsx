import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import NewsModel from '../models/news'

interface Article {
    author:string;
}

const Home = () => {

    const [news, setNews] = useState([])

    const fetchNews = async () => {
        const newsArray = await NewsModel.all()
        console.log("news array", newsArray.response.articles)
        setNews(newsArray.response.articles)
    }
    let newsList : any[] = []
    if (news) {
        newsList = news.map( (article : Article) => {
            return  (
            <p>{article.author}</p>
            )
        })
    }

    useEffect(()=> {
        fetchNews()
    },[])

    return (
        <div>
            <p>Hello world</p>
            <Link to={'/login'}>Login</Link>
            <div>
                {newsList}
            </div>
        </div>
    )
}

export default Home
