import { hideLoading, parseRequestURL, showLoading } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';

const ProductScreen = {
    after_render: () => {
        const request = parseRequestURL();
        document.getElementById('add-button').addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`;
        });
    },
    render: async () => {
        const request = parseRequestURL();
        showLoading();
        const product = await getProduct(request.id);
        hideLoading();
        return `
            <div class="container">
                <div class="details">
                    <div class="details-image">
                        <img src="${product.image}" alt="${product.name}"/>
                    </div>
                    <div class="details-info">
                        <ul>
                            <li>
                                <h1>${product.name}</h1>
                            </li>
                            <li>
                                ${Rating.render({ value: product.rating, text: `${product.numReviews} reviews` })}
                            </li>
                            <li>
                                <strong>Price:</strong> $${product.price}
                            </li>
                            <li>
                                <strong>Product Description:</strong> <div>${product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li>Price: $${product.price}</li>
                            <li>Status: ${product.countInStock > 0 ? '<span>In Stock</span>' : '<span>Unavailable</span>'}</li>
                            <button class="btn btn-primary fw" id="add-button" class="primary">Add to Cart</button>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    },
};

export default ProductScreen;

/**
 *
 */