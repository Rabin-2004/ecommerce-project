import React, { useEffect, useState } from 'react';
import { Grid} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { fetchProducts } from '../api/fakeStoreApi';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    return (
        <Grid container spacing={3}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} addToCart={addToCart} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductList;
