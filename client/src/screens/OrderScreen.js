import { getOrder, getPaypalClientId, payOrder } from '../api';
import { getUserInfo } from '../localStorage';
import { hideLoading, parseRequestURL, rerender, showLoading, showMessage } from '../utils';

const addPaypalSdk = async (totalPrice) => {
    const clientId = await getPaypalClientId();
    showLoading();
    if (!window.paypal) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypalobjects.com/api/checkout.js';
        script.async = true;
        script.onload = () => handlePayment(clientId, totalPrice);
        document.body.appendChild(script);
    } else {
        handlePayment(clientId, totalPrice);
    }
};

const handlePayment = (clientId, totalPrice) => {
    window.paypal.Button.render(
        {
            env: 'sandbox',
            client: {
                sandbox: clientId,
                production: '',
            },
            locale: 'en_US',
            style: {
                size: 'responsive',
                color: 'gold',
                shape: 'pill',
            },

            commit: true,
            payment(data, actions) {
                return actions.payment.create({
                    transactions: [
                        {
                            amount: {
                                total: totalPrice,
                                currency: 'USD',
                            },
                        },
                    ],
                });
            },
            onAuthorize(data, actions) {
                return actions.payment.execute().then(async () => {
                    showLoading();
                    await payOrder(parseRequestURL().id, {
                        orderID: data.orderID,
                        payerID: data.payerID,
                        paymentID: data.paymentID,
                    });
                    hideLoading();
                    showMessage('Payment was successfull.', () => {
                        rerender(OrderScreen);
                    });
                });
            },
        },
        '#paypal-button'
    ).then(() => {
        hideLoading();
    });
};

const OrderScreen = {
    after_render: async () => {

    },
    render: async () => {
        if (!getUserInfo()) {
            document.location.hash = '/';
        }

        const request = parseRequestURL();
        const { _id, isDelivered, deliveredAt, isPaid, paidAt, shipping, payment, orderItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = await getOrder(request.id);

        if (!isPaid) {
            addPaypalSdk(totalPrice);
        }

        return `
            <div class="container">
                <h1>Order ${_id}</h1>
                <div class="order">
                    <div class="order-info">
                        <div>
                            <h2>Shipping</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                            </div>
                            ${isDelivered ? `<div>Delivered at ${deliveredAt}</div>` : `<div>Not Delivered</div>`}
                        </div>
                        <div>
                            <h2>Payment</h2>
                            <div>
                                Payment Method: ${payment.paymentMethod}
                            </div>
                            ${isPaid ? `<div>Paid at ${paidAt}</div>` : `<div>Not Paid</div>`}
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
                        <div id="paypal-button"></div>
                    </div>
                </div>
            </div>
        `;
    },
};

export default OrderScreen;
