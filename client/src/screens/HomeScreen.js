import axios from 'axios';
import Rating from '../components/Rating';
import { hideLoading, showLoading } from '../utils';

const HomeScreen = {
    render: async () => {
        showLoading();
        const { data, status } = await axios.get('http://localhost:5000/api/products', { headers: { 'Content-Type': 'application/json' } });

        if (status !== 200) return '<div>Error in getting data</div>';

        const products = data;
        hideLoading();
        return `
            <div class="container">
                <ul class="products">
                    ${products.map((product) => `
                    <li>
                        <div class="product">
                            <a href="/#/product/${product._id}">
                                <img src="${product.image}" alt="${product.name}">
                            </a>
                            <div class="product-rating">
                                ${Rating.render({ value: product.rating, text: `${product.numReviews} reviews` })}
                            </div>
                            <div class="product-name">
                                <a href="/#/product/${product._id}">${product.name}</a>
                            </div>
                            <div class="product-brand">${product.brand}</div>
                            <div class="product-price">$${product.price}</div>
                        </div>
                    </li>
                    `).join('\n')}
                </ul>
            </div>
        `;
    },
};

export default HomeScreen;
