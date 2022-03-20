import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routes } from './api/routes/index'
import path from 'path'

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())

app.use(cors())

app.use('/news', routes.news)
app.use ('/auth', routes.auth)
app.use('/category', routes.category)

// Fallback
app.get('/*', (req, res) => {
    res.send('server')
});

app.listen(port, () => console.log(`Listening on port ${port}`));