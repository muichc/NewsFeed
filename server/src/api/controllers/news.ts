import type {Request, Response} from 'express';
import fetch from 'node-fetch';

const db = require('../../../models/index')


const show = async (req: Request, res: Response) : Promise<void> => {
    try {
        const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY4 || ''};
        let url : string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
        const response = await fetch(`${url}country=us`, {
            headers: requestHeaders
        })
        const parsedResponse = await response.json()
        res.status(200).json({response: parsedResponse}) 
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Server error: ${error}`})
    }
    
}

const showByCategory = async (req: Request, res: Response) : Promise<void> => {
    try {
        const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY4 || ''};
        let url: string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
        const response = await fetch(`${url}country=us&category=${req.body.category}`, {
            headers: requestHeaders
        })
        const parsedResponse = await response.json()
        res.status(200).json({response: parsedResponse})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Server error: ${error}`})
    }
}

const showByUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const [categoryQuery, countryQuery] = getQueries(req.body);
        let url: string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
        const parsedResponse = await fetchNewsByCategories(categoryQuery, url)
        const finalResponse = await fetchNewsByCountry(parsedResponse, countryQuery, url)
        res.status(200).json({response:finalResponse})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Server error: ${error}`})
    }
}

const getQueries = (userCategories: string[]) => {
    const dbCategories : string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ]
    let categoryQuery :string = '';
    const countryQuery : string[] = [];
    try {
        for (let i in userCategories) {
            if (dbCategories.includes(userCategories[i])){
                categoryQuery += `&category=${userCategories[i]}`
            } else {
                countryQuery.push(userCategories[i])
            }
        }
    } catch (error) {
        console.log(error)
    }
    return [categoryQuery, countryQuery] as const
}

const fetchNewsByCategories = async (query: string, url: string) => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY4 || ''};
    try {
        const response = await fetch(`${url}country=us${query}`, {
            headers: requestHeaders
        })
        const parsedResponse = response.json()
        return parsedResponse
    } catch (error) {
        console.log(error)
    }
    
}

const fetchNewsByCountry = async (results: any, query: string[], url:string) => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY4 || ''};
    try {
        for (let i of query) {
            const cat = await db.category.findOne({ where: {name: i} , attributes:['abbreviation']})
            const countryResponse = await fetch(`${url}country=${cat.dataValues.abbreviation}&category=general&pageSize=5`, {
                headers: requestHeaders
            })
            
            const parsedCountryResponse = await countryResponse.json()
            if (parsedCountryResponse.totalResults > 0) {
                results.totalResults += parsedCountryResponse.totalResults
                results.articles.push.apply(parsedCountryResponse.articles)
            }
            
        }
        return results
    } catch (error) {
        console.log("Error fetching, ", error)
    }
}

export const news = {
    show,
    showByCategory, 
    showByUser
}