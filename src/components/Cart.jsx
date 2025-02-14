import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart } = useCart();

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2);

    const navigate = useNavigate();

    return (
        <div>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <Card key={item.id} style={{ margin: '10px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                            <CardMedia
                                component="img"
                                image={item.image}
                                alt={item.title}
                                style={{ width: 80, height: 80, objectFit: 'contain', marginRight: '10px' }}
                            />
                            <CardContent style={{ flexGrow: 1 }}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Typography variant="body2">${item.price}</Typography>
                            </CardContent>
                            <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.id)}>
                                Remove
                            </Button>
                        </Card>
                    ))}

                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Total Price: ${totalPrice}
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        onClick={() => navigate('/checkout')}>
                        Order Now
                    </Button>
                </>
            )}
        </div>
    );
};

export default Cart;
