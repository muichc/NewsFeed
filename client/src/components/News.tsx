import React, { useState, useEffect } from 'react'
import { NewsData } from '../global/types'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const News = (newsArticle: NewsData) => {
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardMedia
                component="img"
                height="200"
                image={`${newsArticle.urlToImage}`}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {newsArticle.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {newsArticle.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={`${newsArticle.url}`}>See full article</Button>
            </CardActions>
        </Card>
    )
}

export { News }
