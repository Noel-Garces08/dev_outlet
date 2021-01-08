import { update, getMyOrders } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { hideLoading, showLoading, showMessage } from '../utils';

const ProfileScreen = {
    after_render: () => {
        document.getElementById('profile-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if (data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                document.location.hash = '/';
            }
        });
    },
    render: async () => {
        const userInfo = getUserInfo();
        if (!userInfo) {
            document.location.hash = '/';
        }
        const orders = await getMyOrders();
        console.table(orders);
        return `
            <div class="profile">
                <div class="profile-info">
                    <div class="form-container">
                        <form id="profile-form">
                            <ul class="form-items">
                                <li>
                                    <h1>Create Account</h1>
                                </li>
                                <li>
                                    <label for="name">Name</label>
                                    <input type="text" name="name" id="name" value="${userInfo.name}"/>
                                </li>
                                <li>
                                    <label for="email">Email</label>
                                    <input type="email" name="email" id="email" value="${userInfo.email}"/>
                                </li>
                                <li>
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" />
                                </li>
                                <li>
                                    <button type="submit" class="btn btn-primary" id="submit-button">Updated</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
                <div class="profile-orders">
                    <h2>Order History</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ORDER ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orders.length === 0 ? `<tr colspan="6">No Order Found.</tr>` : `
                                ${orders.map(order => `
                                    <tr>
                                        <td>${order._id}</td>
                                        <td>${order.createdAt}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>${order.paidAt || 'No'}</td>
                                        <td>${order.deliveryAt || 'No'}</td>
                                        <td><a href="/#/order/${order._id}/">Details</a></td>
                                    </tr>
                                `).join(' ')}
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
};

export default ProfileScreen;
