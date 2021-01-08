import CheckoutSteps from '../components/CheckoutSteps';
import { getUserInfo, setPayment } from '../localStorage';

const PaymentScreen = {
    after_render: () => {
        document.getElementById('payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            setPayment({ paymentMethod: document.querySelector('input[name="payment-method"]:checked').value });
            document.location.hash = '/placeorder';
        });
    },
    render: () => {
        if (!getUserInfo()) {
            document.location.hash = '/';
        }

        return `
            ${CheckoutSteps.render({ step1: true, step2: true, step3: true })}
            <div class="form-container">
                <form id="payment-form">
                    <ul class="form-items">
                        <li>
                            <h1>Payment</h1>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="paypal" value="paypal" checked/>
                                <label for="paypal">paypal</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="stripe" value="stripe" />
                                <label for="stripe">stripe</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit" class="btn btn-primary" >Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    },
};

export default PaymentScreen;
