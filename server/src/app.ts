import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './api/routes'


dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json())

app.use(cors())

app.use('/news', routes.news)
app.use ('/auth', routes.auth)


app.listen(port, () => console.log(`Listening on port ${port}`));