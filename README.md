bDev Outlet

1. 
    -> Add frontend and backend folder
    -> Create src folder in frontend
    -> Create index.html with heading in client src
    -> npm install live-server
    -> Run npm init in client folder
    -> Add start command as live-server src --verbose
    -> Run npm start

2. Design Website
    -> Create style.css
    -> Link style.css to index.html
    -> Create div.grid-container
    -> Create header, main, and footer
    -> Style html and body
    -> Style grid-container, header, main, and footer

3. Create static home screen
    -> Create ul.products
    -> Create li
    -> Create div.product
    -> Add .product-image, .product-name, .product-brand, .product-price
    -> Style ul.products and internal divs
    -> Duplicate 2 times to show 3 products

4. Render Dynamic Home Screen
    -> Create data.js
    -> Export an array of 6 products
    -> Create screen/HomeScreen.js
    -> export HomeScreen as an object with render() method
    -> Implement render()
    -> import data.js
    -> Return products mapped to list inside a ul
    -> Create app.js
    -> Link it to index.html as module
    -> Set main id to main_container
    -> Create router() function
    -> Set main_container innerHTML to HomeScreen.render()
    -> Set load event of window to router() function

5. Build Url Router
    -> Create routes as route:screen object for home screen
    -> Create utils.js
    -> Expor parseRequestURL();
    -> Set url as hash address split by slash
    -> Return resource, id and verb of url
    -> Update router()
    -> Set request as parseRequestURL()
    -> Build parsedUrl and compare with routes
    -> If route exists render if, elser render Error404
    -> Create screens/Error404.js and render error message

6. Create Node.js Server
    -> Run npm init in root folder
    -> npm install express
    -> Create server.js
    -> Add start command as node backend/server.js
    -> Require express
    -> Move data.js from frontend to backend
    -> Create route for /api/products
    -> Return products in data.js
    -> Run npm start

7. Load Products From Backend
    -> Edit HomeScreen.js
    -> Make render async
    -> Fetch products from '/api/products' in render()
    -> use cors on backend

8. Add Webpack
    -> cd client
    -> npm install -D webpack webpack-cli webpack-dev-server
    -> npm uninstall live-server
    -> "start": "webpack-dev-server --mode development --watch-content-base --open"
    -> Mode index.html, style.css, and images to client folder
    -> Rename app.js to index.js
    -> Update index.html
    -> Add <script src="main.js"></script> before </body>
    -> npm start
    -> npm install axios
    -> Change fetch to axios in HomeScreen

9. Use Module syntax in server 
    -> Add "type": "module" to server package.json
    -> Install nodemon

10. Enable Code Linting
    -> npm install -D eslint
    -> Install VScode eslint extension
    -> Create .eslintrc and set module.exports for env to node
    -> Set VSCode setting for editor.codeActionOnSave source.fixAll.eslint to true
    -> Check result for linting error
    -> Npm install eslint-config-airbnb-base and eslint-plugin-import
    -> Set extends to airbnb-base
    -> Set parserOptions to ecmaVersion 11 and sourceType to module
    -> Set rules for no-console to 0 to ignore linting error

11. Install VSCode Extensions
    -> Javascript (ES6) code snippets
    -> ES7 React/Redux/GraphQL/React-Native snippets
    -> HTML&LESS grammar injections
    -> CSS Peek

12. Create Rating Component
    1. Create components/Rating.js
    2. Create div.rating
    3. Link to fontawesome.css in index.html
    4. Define Rating object with render()
    5. if !props.value return empty div
    6. else use fa fa-star, fa-star-half-o and fa-star-o
    7. Last span for props.text || ''
    8. Style div.rating, span and last span
    9. Edit HomeScreen
    10. Add div.product-rating and use Rating component

13. Product Screen
    1. Get product id from request
    2. Implement /api/product/:id api
    3. Send Ajax request to product api
    4. Create back to result link
    5. Create div.details with 3 columns
    6. Column 1 for product image
    7. Column 2 for product information
    8. Column 3 for product action
    9. Style .details and all columns
    10. Create add to card button with add-button id
    11. after_render() to add event to the button
    12. Redirect user to cart/:product_id


13. Product Screen
    1. get product id from request
    2. implement /api/product/:id api
    3. send Ajax request to product api

14. Product Screen UI
    1. create back to result link
    2. create div.details with 3 columns
    3. column 1 for product image
    4. column 2 for product information
    5. column 3 form product action
    6. style .details and all columns
    7. create add to cart button with add-button id

15. Product Screen Action
    1. after_render() to add event to the button
    2. add event handler for the button
    3. redirect user to cart/:product_id
    4. implement after_render in index.js
    
16. Add To Cart Action
    1. create CartScreen.js
    2. parseRequestUrl
    3. getProduct(request.id)
    4. addToCart
    5. getCartItems
    6. cartItems.find
    7. if existItem update qty
    8. else add item
    9. setCartItems
17. Cart Screen UI
    1. cartItems = getCartItems();
    2. Create 2 columns for cart items and cart action
    3. cartItems.length === 0 ? cart is empty
    4. Show item image, name, qty and pirce
    5. Cart actions
    6. Subtotal 
    7. Proceed to Checkout button
    8. Add CSS style

18. Update and Delete Cart Items
    1. Add qty select next to each item
    2. after_render()
    3. Add change event to qty select
    4. getCartItems() and pass to addToCart();
    5. Set force to true to addToCart();
    6. Create rerender() as (component, areaName = 'content);
    7. Component.rerender and component.after_render
    8. If force is true then rerender();
    9. Add delete button next to each item
    10. Add click event to qty button
    11. Cal removeFromCart(deleteButton.id);
    12. Implement removeFromCart(id);
    13. setCartItems(getCartItems.filter)
    14. If id == parseRequestUrl().id ? reidrect to '/cart'
    15. Else rerender(CartScreen);

20. Sign-in Screen UI
    1. Create SignInScreen
    2. Render email and passowrd fields
    4. style signin form

    


