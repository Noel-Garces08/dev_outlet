export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
};

export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const setUserInfo = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
};

export const getUserInfo = () => (localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null);

export const logout = () => {
    localStorage.removeItem('userInfo');
};

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping') ? JSON.parse(localStorage.getItem('shipping')) : {
        address: '', city: '', postalCode: '', country: '',
    };
    return shipping;
};

export const setShipping = (details) => {
    localStorage.setItem('shipping', JSON.stringify(details));
};

export const getPayment = () => {
    const payment = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : { paymentMethod: 'paypal' };
    return payment;
};

export const setPayment = (paymentMethod) => {
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
};

export const clearCart = () => {
    localStorage.removeItem('cartItems');
};