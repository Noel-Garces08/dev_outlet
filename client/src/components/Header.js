import { getUserInfo, logout } from '../localStorage';

const Header = {
    after_render: () => {
        if (getUserInfo()) {
            document.getElementById('signout-button').addEventListener('click', () => {
                logout();
                document.getElementById('header-container').innerHTML = Header.render();
                Header.after_render();
                document.location.hash = '/';
            });

            // Toggle dropdown menu
            document.querySelector('[data-dropdown-toggler]').addEventListener('click', (e) => {
                document.querySelector('[data-dropdown]').classList.toggle('active');

                setTimeout(() => {
                    if (document.querySelector('[data-dropdown]').classList.contains('active')) {
                        // Click Event listener on html to remove active class on dropdown
                        document.querySelector('html').addEventListener('click', (e) => {
                            const { top, bottom, left, right } = document.querySelector('[data-dropdown]').getBoundingClientRect();
                            if (!((e.pageX >= left && e.pageX <= right) && (e.pageY >= top && e.pageY <= bottom))) {
                                document.querySelector('[data-dropdown]').classList.remove('active');
                            };

                        }, { once: true });
                    }
                }, 250);
            });
        }
    },
    render: () => {
        const userInfo = getUserInfo();
        return `
            <div class="container">
                <div class="brand">
                    <a href="/#/">E-Commerce</a>
                </div>
                <ul class="links-container">
                ${userInfo ? `
                    <li>
                        <a data-dropdown-toggler>${userInfo.name}</a>
                        <ul class="dropdown" data-dropdown>
                            <li><a href="/#/profile">Profile</a></li>
                            <li><a id="signout-button">Sign Out</a></li>
                        </ul>
                    </li>
                    <li><a href="/#/cart">Cart</a></li>
                ` : `
                    <li><a href="/#/signin">Sign In</a></li>
                `}
                </ul>
            </div>
        `;
    },
};

export default Header;

/**
                // console.log(`x direction, ${!(e.pageX >= left && e.pageX <= right)}, y direction: ${!(e.pageY >= top && e.pageY <= bottom)}`);
 *
 *  <ul class="links">
                ${userInfo ? `<li><a href="/#/profile">${userInfo.name}</a></li> <li><a id="signout-button">Sign Out</a></li>` : '<li><a href="/#/signin">Sign In</a></li>'}
                <li><a href="/#/cart">Cart</a></li>
            </ul>
 */
