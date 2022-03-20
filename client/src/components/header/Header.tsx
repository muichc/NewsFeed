import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loggedInState } from '../../recoil/selectors'
import { userState, userCategoriesState } from '../../recoil/atoms'
import { Title } from './Title'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'


const Header = () => {
    let loggedIn =useRecoilValue(loggedInState)
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userState)
    const setUserCategories = useSetRecoilState(userCategoriesState)
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);
    const open = Boolean(anchor)
    const handleClick = (event : React.MouseEvent<HTMLButtonElement>) => {
        setAnchor(event.currentTarget)
    }

    const handleClose = () => {
        setAnchor(null);
    }

    const handleUserProfile = () => {
        setAnchor(null);
        navigate('/profile')
    }

    const handleAuth = () => {
        setAnchor(null);
        navigate('/auth')
    }

    const handleLogOut = () => {
        setAnchor(null);
        setUser(null)
        setUserCategories([])
        navigate('/')
    }

    if (loggedIn) {
        return (
            <div className="header">
                <Title />
                <IconButton
                    id="menu-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon fontSize={'large'} />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'menu-button',
                    }}
                >
                    <MenuItem onClick={handleUserProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </div>
        )
    } else {
        return (
            <div className="header">
                <Title />
                <IconButton
                    id="menu-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchor}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'menu-button',
                    }}
                >
                    <MenuItem onClick={handleAuth}>Login/Register</MenuItem>
                </Menu>
                <Button onClick={handleAuth} variant="text" sx={{ color: 'text.primary', maxHeight: '30px'}} className='auth-button'>Login/Register</Button>
            </div>
        )
    }

    
}

export { Header }
