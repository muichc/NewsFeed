import express from 'express'
import type {Request, Response} from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()
const app = express();
const port = process.env.PORT || 8000;

const requestHeaders : HeadersInit = {'X-Api-Key' : process.env.NEWS_API_KEY || 'cf2c7debcade4a3894af071f0f56c5ed'};

app.get('/', async (req: Request, res: Response) : Promise<void> => {
    let url : string = process.env.NEWS_API_URL || '';
    const response = await fetch(`${url}q=apple&from=2022-03-13&to=2022-03-13&sortBy=popularity`, {
        headers: requestHeaders
    })
    const parsedResponse = await response.json()
    res.send(parsedResponse) 
})

app.listen(port, () => console.log(`Listening on port ${port}`));