import HomeScreen from './screens/HomeScreen.js';
import ProductScreen from './screens/ProductScreen.js';
import CartScreen from './screens/CartScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import SigninScreen from './screens/SigninScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';


import { hideLoading, parseRequestURL, showLoading } from './utils.js';

import Header from './components/Header.js';
import OrderScreen from './screens/OrderScreen.js';

const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart': CartScreen,
    '/cart/:id': CartScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
    '/order/:id': OrderScreen,
};

const router = async () => {
    showLoading();
    const request = parseRequestURL();
    const parseUrl = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    const header = document.getElementById('header-container');
    const main = document.getElementById('main-container');
    header.innerHTML = await Header.render();
    await Header.after_render();
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};

window.addEventListener('load', router);

/** The hashchange event is fired when the fragment identifier of the URL has changed
 * (the part of the URL beginning with and following the # symbol).
*/
window.addEventListener('hashchange', router);
