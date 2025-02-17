import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Button, Typography, CardMedia } from '@mui/material';
import { fetchCategoryProducts } from '../api/fakeStoreApi'; 
import { useCart } from '../contexts/CartContext';

const CategoryPage = () => {
    const { category } = useParams();  
    const [products, setProducts] = useState([]);
    const addToCart = useCart();

    useEffect(() => {
        const getCategoryProducts = async () => {
            const data = await fetchCategoryProducts(category); 
            setProducts(data);
        };
        getCategoryProducts();
    }, [category]);

    return (
        <div>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardMedia component="img" alt={product.title} height="200" image={product.image} 
                            sx={{
                                maxHeight: 250,  
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
                    }}> {product.title}</Typography>
                                <Typography variant="body2" color="textSecondary">${product.price}</Typography>
                                <Button variant="contained" onClick={()=> addToCart(product)}>Add to Cart</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CategoryPage;
