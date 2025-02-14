import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia } from '@mui/material';
import { useCart } from '../contexts/CartContext';  

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();  
    return (
        <Card>
            <CardMedia
                component="img"
                alt={product.title}
                image={product.image}
                sx={{
                    height: 250, 
                    objectFit: 'contain',  
                    width: '100%'  
                }}
            />
            <CardContent>
                <Typography variant="h6" style={{
                        fontSize: '14px',
                        height: '50px', 
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2
                    }}> {product.title} </Typography>
                <Typography variant="body2" color="textSecondary">${product.price}</Typography>
                <Button variant="contained" onClick={() => addToCart(product)}>
                    Add to Cart
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProductCard;

