import axios from 'axios';
import { apiUrl } from './config';
import { getUserInfo } from './localStorage';

export const getProduct = async (id) => {
    try {
        const { data, status } = await axios.get(`${apiUrl}/api/products/${id}`, { headers: { 'Content-type': 'application/json' } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
};

export const signin = async ({ email, password }) => {
    try {
        const { data, status } = await axios.post(`${apiUrl}/api/users/signin`, { email, password }, { headers: { 'Content-type': 'application/json' } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
};

export const register = async ({ name, email, password }) => {
    try {
        const { data, status } = await axios.post(`${apiUrl}/api/users/register`, { name, email, password }, { headers: { 'Content-type': 'application/json' } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        return { error: error.response.data.message || error.message };
    }
};

export const update = async ({ name, email, password }) => {
    try {
        const { _id, token } = getUserInfo();
        const { data, status } = await axios.put(`${apiUrl}/api/users/${_id}`, { name, email, password }, { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
};

export const createOrder = async (order) => {
    try {
        const { token } = getUserInfo();
        const { data, status } = await axios.post(`${apiUrl}/api/orders`, order, { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` } });
        console.log(data, status);
        if (status !== 201) throw new Error(data.message);
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.response ? error.response.data.message : error.message };
    }
};

export const getOrder = async (id) => {
    try {
        const { token } = getUserInfo();
        const { data, status } = await axios.get(`${apiUrl}/api/orders/${id}`, { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
};

export const getMyOrders = async () => {
    try {
        const { token } = getUserInfo();
        const { data, status } = await axios.get(`${apiUrl}/api/orders/`, { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        console.log(error);
        return { error: error.response.data.message || error.message };
    }
};

export const getPaypalClientId = async () => {
    const { data, status } = await axios.get(`${apiUrl}/api/paypal/clientId`, { headers: { 'Content-type': 'application/json' } });
    if (status !== 200) throw new Error(data.message);
    return data.clientId;
};

export const payOrder = async (orderId, paymentResult) => {
    try {
        const { token } = getUserInfo();
        const { data, status } = await axios.put(`${apiUrl}/api/orders/${orderId}/pay`, paymentResult, { headers: { 'Content-type': 'application/json', Authorization: `Bearer ${token}` } });
        if (status !== 200) throw new Error(data.message);
        return data;
    } catch (error) {
        return { error: error.response ? error.response.data.message : error.message };
    }
};