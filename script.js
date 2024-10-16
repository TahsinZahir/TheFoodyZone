document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    const confirmOrderButton = document.getElementById('confirm-order');
    const loginButton = document.getElementById('login-btn');
    const modal = document.getElementById('login-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const confirmMessage = confirmModal.querySelector('.message');
    const closeModalButtons = document.querySelectorAll('.close');

    const menuItems = [
        {
            name: "Pizza",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCiTQHtyvV0rarqP2bpTU9NTap24v8z0wuoA&s",
            description: "Delicious cheese pizza...",
            price: 100,
            type: "Non-Vegetarian"
        },
        {
            name: "Burger",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5notd9JfOzIAW6kz3GQmPDsnggQdrZmPjlA&s",
            description: "Chicken burger...",
            price: 50,
            type: "Non-Vegetarian"
        },
        {
            name: "Pasta",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLb_AHdORtANcTXjeZTEptRD2wqbo2w4hspw&s",
            description: "Creamy pasta...",
            price: 70,
            type: "Vegetarian"
        },
        {
            name: "Biryani",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeOh9Cy86iUHxldRyqQgYoettUuhWp50DL8A&s",
            description: "Hydrabadi briyani...",
            price: 270,
            type: "Non-Vegetarian"
        },
        {
            name: "Okra",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-g3Jml4Mn2LadIcrRacsL-K_tgrpz6zoL4Q&s",
            description: "Masala bhindi...",
            price: 170,
            type: "Vegetarian"
        }
    ];

    // Render menu items on the page
    function renderMenuItems(items = menuItems) {
        const menuContainer = document.getElementById('menu');
        menuContainer.innerHTML = ''; // Clear existing items
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'menu-item';
            itemDiv.setAttribute('data-type', item.type);
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="price">Rs.${item.price}</p>
                <button class="add-to-cart" data-item="${item.name}" data-price="${item.price}">Add to Cart</button>
            `;
            menuContainer.appendChild(itemDiv);
        });
    }

    // Update cart and total price
    function updateCart() {
        cartElement.innerHTML = '';
        let total = 0;
        cart.forEach(({ item, price, quantity }) => {
            const li = document.createElement('li');
            li.textContent = `${item} - Rs.${price.toFixed(2)} x ${quantity}`;
            cartElement.appendChild(li);
            total += price * quantity;
        });
        totalPriceElement.textContent = `Total: Rs.${total.toFixed(2)}`;
        confirmOrderButton.style.display = cart.length > 0 ? 'block' : 'none';
    }

    // Function to clear the cart
    function clearCart() {
        cart.length = 0;
        updateCart();
    }

    // Confirm action function
    function confirmAction(message, callback) {
        confirmMessage.textContent = message;
        confirmModal.style.display = 'block';
        confirmModal.querySelector('.yes').onclick = function() {
            callback();
            confirmModal.style.display = 'none';
        };
        confirmModal.querySelector('.no').onclick = function() {
            confirmModal.style.display = 'none';
        };
    }

    // Event listeners for adding items to cart
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const item = event.target.getAttribute('data-item');
            const price = parseFloat(event.target.getAttribute('data-price'));
            const existingItem = cart.find(cartItem => cartItem.item === item);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ item, price, quantity: 1 });
            }
            updateCart();
        }

        // Close modals
        if (event.target.classList.contains('close')) {
            modal.style.display = 'none';
            confirmModal.style.display = 'none';
        }

        // Login submission
        if (event.target.id === 'submit-login') {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            alert(`Logged in as ${username}`);
            modal.style.display = 'none';
        }

        // Dark mode toggle
        if (event.target.id === 'toggle-dark-mode') {
            document.body.classList.toggle('dark-mode');
        }

        // Theme toggle (if you have different behavior)
        if (event.target.id === 'theme-toggle') {
            document.body.classList.toggle('custom-theme');
        }

        // Confirm order
        if (event.target.id === 'confirm-order') {
            confirmAction('Do you want to confirm the order?', () => {
                alert('Order confirmed!');
                clearCart();
            });
        }
    });

    // Search functionality
    document.getElementById('search').addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const menuItemsDivs = document.querySelectorAll('.menu-item');
        menuItemsDivs.forEach(itemDiv => {
            const itemName = itemDiv.querySelector('h3').textContent.toLowerCase();
            itemDiv.style.display = itemName.includes(searchTerm) ? 'flex' : 'none';
        });
    });

    // Filter functionality
    document.getElementById('filter').addEventListener('change', (event) => {
        const filterValue = event.target.value;
        const menuItemsDivs = document.querySelectorAll('.menu-item');
        menuItemsDivs.forEach(itemDiv => {
            const itemType = itemDiv.getAttribute('data-type');
            itemDiv.style.display = filterValue === '' || itemType === filterValue ? 'flex' : 'none';
        });
    });

    // Sort functionality
    document.getElementById('sort').addEventListener('change', (event) => {
        const sortValue = event.target.value;
        const sortedMenuItems = [...menuItems];
        
        if (sortValue === 'price') {
            sortedMenuItems.sort((a, b) => a.price - b.price);
        }

        // Clear current menu and re-render
        renderMenuItems(sortedMenuItems);
    });

    renderMenuItems(); // Initial render of menu items
});
