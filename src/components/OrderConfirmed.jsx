// src/components/OrderConfirmed.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderConfirmed = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Typography variant="h4" color="success.main" gutterBottom>
                Payment Confirmed!
            </Typography>
            <Typography variant="body1">Your order will arrive shortly.</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                Return to Home
            </Button>
        </Container>
    );
};

export default OrderConfirmed;
