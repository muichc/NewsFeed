import React from 'react'
import { NewsData } from '../global/types'
import { convertDate } from '../util/helper'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const News = (newsArticle: NewsData) => {
    const formattedDate = convertDate(newsArticle.publishedAt)

    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardMedia
                component="img"
                height="200"
                image={`${newsArticle.urlToImage}`}
                alt=""
            />
            <CardContent>
                <Typography variant="overline" color="red" component="p">
                    {newsArticle.source.name} 
                </Typography>
                <Typography variant="overline">
                    {formattedDate}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {newsArticle.title}
                </Typography>
                <Typography variant="body2" >
                    {newsArticle.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={`${newsArticle.url}`} target="_blank" rel="noopener noreferrer" sx={{ color: 'text.primary', fontWeight: 'bold'}} > See full article </Button>
            </CardActions>
        </Card>
    )
}

export { News }
