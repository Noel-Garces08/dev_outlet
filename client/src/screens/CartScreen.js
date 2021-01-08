import { getProduct } from '../api';
import { getCartItems, setCartItems } from '../localStorage';
import { parseRequestURL, rerender } from '../utils';

const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);

    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) => (x.product === existItem.product ? item : x));
        }
    } else {
        cartItems = [...cartItems, item];
    }

    setCartItems(cartItems);

    if (forceUpdate) {
        // eslint-disable-next-line no-use-before-define
        rerender(CartScreen);
    }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter((x) => x.product !== id));
    if (id === parseRequestURL().id) {
        document.location.hash = '/cart';
    } else {
        // eslint-disable-next-line no-use-before-define
        rerender(CartScreen);
    }
};

const CartScreen = {
    after_render: () => {
        const qtySelects = document.getElementsByClassName('qty-select');
        Array.from(qtySelects).forEach((qtySelect) => {
            qtySelect.addEventListener('change', (e) => {
                const item = getCartItems().find((x) => x.product === qtySelect.id);
                addToCart({ ...item, qty: Number(e.target.value) }, true);
            });
        });
        const deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach((deleteButton) => {
            deleteButton.addEventListener('click', () => {
                removeFromCart(deleteButton.id);
            });
        });
        document.getElementById('checkout-button').addEventListener('click', () => {
            window.redirect = '/shipping';
            document.location.hash = '/signin';
        });
    },
    render: async () => {
        const request = parseRequestURL();
        if (request.id) {
            const product = await getProduct(request.id);
            addToCart({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            });
        }
        const cartItems = getCartItems();

        return `
            <div class="container">
                <div class="cart">
                    <div class="cart-list">
                        <ul class="cart-list-container">
                            <li>
                                <h3>Shopping Cart</h3>
                                <strong>Price</strong>
                            </li>
                            ${cartItems.length === 0 ? '<h2>Cart is empty. <a href="/#/">Go Shopping</a></h2>' : cartItems.map((item) => `
                                <li>
                                    <div class="cart-image">
                                        <img src="${item.image}" alt="${item.name}">
                                    </div>
                                    <div class="cart-name">
                                        <h1>
                                            <a href="/#/product/${item.product}">${item.name}</a>
                                        </h1>
                                        <div>
                                            Qty: 
                                            <select class="qty-select" id="${item.product}">
                                                ${[...Array(item.countInStock).keys()].map((x) => (item.qty === x + 1 ? `<option selected value='${x + 1}'>${x + 1}</option>` : `<option value="${x + 1}">${x + 1}</option>`))}
                                            </select>
                                            <button type="button" class="delete-button" id="${item.product}">Delete</button>
                                        </div>
                                    </div>
                                    <strong class="cart-price">$${item.price}</strong>
                                </li>
                            `).join('\n')}
                        </ul>
                    </div>
                    <div class="cart-action">
                        <h3>Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items): $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h3>
                        <button id="checkout-button" class="btn btn-primary fw">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        `;
    },
};

export default CartScreen;
