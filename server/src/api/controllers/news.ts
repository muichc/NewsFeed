import type {Request, Response} from 'express';
import fetch from 'node-fetch';


const show = async (req: Request, res: Response) : Promise<void> => {
    const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY || 'cf2c7debcade4a3894af071f0f56c5ed'};
    let url : string = process.env.NEWS_API_URL_SEARCH || '';
    const response = await fetch(`${url}q=apple&from=2022-03-13&to=2022-03-13&sortBy=popularity`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    // let urlTop : string = process.env.NEWS_API_URL_TOP || '';
    // const respTop = await fetch(`${urlTop}country=us&category=business`, {
    //     headers: requestHeaders
    // })
    // const parsedResp = await respTop.json()
    // res.send(parsedResp)
    // res.send(parsedResponse)
    res.status(200).json({response: parsedResponse}) 
}

module.exports = {
    show
}