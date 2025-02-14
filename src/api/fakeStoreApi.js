import axios from 'axios';

export const fetchProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products', error);
    }
};

export const fetchCategories = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return []; 
    }
};

export const fetchCategoryProducts = async (category) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category products:', error);
        return [];
    }
};
