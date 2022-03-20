import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


const BackButton = () => {
    const navigate = useNavigate()
    return (
        <IconButton onClick={() => navigate(-1) } aria-label="Navigate back" className='back-button'>
            <ArrowBackIcon />
        </IconButton>
    )
}

export { BackButton }
