import type {Request, Response} from 'express';
import fetch from 'node-fetch';


const show = async (req: Request, res: Response) : Promise<void> => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY || ''};
    let url : string = process.env.NEWS_API_URL_TOP || 'https://newsapi.org/v2/top-headlines?';
    const response = await fetch(`${url}country=us`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    res.status(200).json({response: parsedResponse}) 
}

const search = async (req: Request, res: Response) : Promise<void> => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY || ''};
    let url : string = process.env.NEWS_API_URL_SEARCH || 'https://newsapi.org/v2/top-headlines?';
    const response = await fetch(`${url}country=us&q=${req.body.searchQuery}`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    res.status(200).json({response: parsedResponse}) 
}

module.exports = {
    show,
    search
}