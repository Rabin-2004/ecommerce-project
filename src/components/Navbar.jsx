import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Badge, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { fetchCategories } from '../api/fakeStoreApi';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const { cartItems } = useCart();
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showCategories, setShowCategories] = useState(false);  
    const openMenu = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
        };
        getCategories();
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setShowCategories(!showCategories);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowCategories(false); 
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const renderCategoriesMenu = () => (
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
    );

    const renderMobileDrawer = () => (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <List>
                <ListItem button component={Link} to="/" onClick={toggleDrawer}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Categories" />
                </ListItem>
                {showCategories && categories.map((category) => (
                    <ListItem
                        key={category}
                        button
                        component={Link}
                        to={`/category/${category}`}
                        onClick={toggleDrawer}
                    >
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
                <ListItem button component={Link} to="/cart" onClick={toggleDrawer}>
                    <ListItemText primary="Cart" />
                    <IconButton color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={cartItems.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </ListItem>
            </List>
        </Drawer>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Make the site title clickable and navigate to home */}
                    <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        All in One Store
                    </Typography>
                    {isMobile ? (
                        // Mobile version 
                        <>
                            <IconButton 
                                color="inherit" 
                                edge="end" 
                                onClick={toggleDrawer} 
                                style={{ position: 'absolute', right: 16 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            {renderMobileDrawer()}
                        </>
                    ) : (
                        // Desktop version
                        <div style={{ marginLeft: 'auto' }}>
                            <Button color="inherit" component={Link} to="/">
                                Home
                            </Button>
                            <Button color="inherit" onClick={handleClick}>
                                Categories
                            </Button>
                            {showCategories && renderCategoriesMenu()}
                            <IconButton color="inherit" component={Link} to="/cart">
                                <Badge badgeContent={cartItems.length} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
