import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import emailjs from 'emailjs-com';

const serviceID = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

const Checkout = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [orderConfirmed, setOrderConfirmed] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            serviceID,
            templateID,
            {
                to_email: formData.email,
                user_name: formData.name,
                phone_number: formData.phone,
            },
            publicKey
        ).then(() => {
            setOrderConfirmed(true);
        }).catch((error) => {
            console.error("Email sending failed:", error);
        });
    };

    return (
        <Container>
            {!orderConfirmed ? (
                <>
                    <Typography variant="h4" gutterBottom>Checkout</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit Order
                        </Button>
                    </form>
                </>
            ) : (
                <>
                    <Typography variant="h5" gutterBottom>Your Order Has Been Submitted</Typography>
                    <Typography variant="body1">A confirmation email has been sent to your email address.</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate('/order-confirmed')}
                    >
                        Proceed to Order Confirmation
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Checkout;

