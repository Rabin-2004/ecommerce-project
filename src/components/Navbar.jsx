// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Badge, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';  
import { fetchCategories } from '../api/fakeStoreApi';
import { useCart } from '../contexts/CartContext';  

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const { cartItems } = useCart();  
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        getCategories();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">All in One Store</Typography>
                <div style={{ marginLeft: 'auto' }}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" onClick={handleClick}>
                        Categories
                    </Button>
                    <Menu anchorEl={anchorEl} open={openMenu} onClose={handleClose}>
                        {categories.map((category) => (
                            <MenuItem
                                key={category}
                                component={Link}
                                to={`/category/${category}`}
                                onClick={handleClose}
                            >
                                {category}
                            </MenuItem>
                        ))}
                    </Menu>
                    <IconButton color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
