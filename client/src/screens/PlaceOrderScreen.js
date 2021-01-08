import { createOrder } from '../api';
import CheckoutSteps from '../components/CheckoutSteps';
import { getUserInfo, getShipping, getCartItems, getPayment, clearCart } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if (!shipping.address) {
        document.location.hash = '/shipping';
    }

    const payment = getPayment();
    if (!payment.paymentMethod) {
        document.location.hash = '/payment';
    }

    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return { orderItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const ShippingScreen = {
    after_render: async () => {
        document.getElementById('placeorder-button').addEventListener('click', async (e) => {
            e.preventDefault();
            const order = convertCartToOrder();
            showLoading();
            const data = await createOrder(order);

            if (data.error) {
                showMessage(data.error);
            } else {
                clearCart();
                document.location.hash = `/order/${data.order._id}`;
            }
            hideLoading();
        });
    },
    render: () => {
        const { orderItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice } = convertCartToOrder();
        if (!getUserInfo()) {
            document.location.hash = '/';
        }

        return `
            <div class="container">
                ${CheckoutSteps.render({ step1: true, step2: true, step3: true, step4: true })}
                <div class="order">
                    <div class="order-info">
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                            </div>
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Payment Method: ${payment.paymentMethod}
                            </div>
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li>
                                    <h2>Shopping Cart</h2>
                                    <div>Price</div>
                                </li>
                                ${orderItems.map((item) => `
                                    <li>
                                        <div class="cart-image">
                                            <img src="${item.image}" alt="${item.name}">
                                        </div>
                                        <div class="cart-name">
                                            <h1>
                                                <a href="/#/product/${item.product}">${item.name}</a>
                                            </h1>
                                            <div>
                                                Qty: <strong>${item.qty}</strong>                                                
                                            </div>
                                        </div>
                                        <strong class="cart-price">$${item.price}</strong>
                                    </li>
                                `).join('\n')}
                            </ul>
                        </div>
                    </div>
                    <div class="cart-action">
                        <h3>Order Summary</h3>
                        <p>Items: <span>$${itemsPrice}</span></p>
                        <p>Shipping: <span>$${shippingPrice}</span></p>
                        <p>Tax: <span>$${taxPrice}</span></p>
                        <h3>Order Total: <span>$${totalPrice}</span></h3>
                        <button id="placeorder-button" class="btn btn-primary fw">Place Order</button>
                    </div>
                </div>
            </div>
        `;
    },
};

export default ShippingScreen;
