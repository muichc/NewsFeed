import type {Request, Response} from 'express';
import fetch from 'node-fetch';

const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ]

const show = async (req: Request, res: Response) : Promise<void> => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY2 || ''};
    let url : string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
    const response = await fetch(`${url}country=us`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    res.status(200).json({response: parsedResponse}) 
}

const search = async (req: Request, res: Response) : Promise<void> => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY2 || ''};
    let url : string = process.env.NEWS_API_URL_SEARCH || 'https://newsapi.org/v2/top-headlines?';
    const response = await fetch(`${url}country=us&q=${req.body.searchQuery}`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    res.status(200).json({response: parsedResponse}) 
}

const showByCategory = async (req: Request, res: Response) : Promise<void> => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY2 || ''};
    let url: string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
    const response = await fetch(`${url}country=us&category=${req.body.category}`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    res.status(200).json({response: parsedResponse})
}

const showByUser = async (req: Request, res: Response) : Promise<void> => {
    console.log('categories are', req.body)
    let categoryQuery = '';
    let countryQuery = [];
    for (let i in req.body) {
        if (categories.includes(req.body[i])){
            categoryQuery += `&category=${req.body[i]}`
        } else {
            countryQuery.push(req.body[i])
        }
    }
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY2 || ''};
    let url: string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
    const response = await fetch(`${url}country=us${categoryQuery}`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    for (let i in countryQuery) {
        const countryResponse = await fetch(`${url}country=${countryQuery[i]}&pageSize=5`, {
            headers: requestHeaders
        })
        const parsedCountryResponse = await countryResponse.json()
        parsedResponse.totalResults += parsedCountryResponse.totalResults
        parsedResponse.articles.push([...parsedCountryResponse.articles])
    }
    res.status(200).json({response:parsedResponse})

}


module.exports = {
    show,
    search,
    showByCategory, 
    showByUser
}