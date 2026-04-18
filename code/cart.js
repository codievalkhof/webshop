let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart-message">Your cart is empty.</p>`;
        cartTotal.textContent = "0.00";
        updateCartCounter();
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <div class="cart-controls">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <span>€${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-btn" onclick="removeItem(${index})">remove</button>
        `;

        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);
    updateCartCounter();
}

function increaseQuantity(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index) {
    cart[index].quantity--;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updateCartCounter() {
    const cartCount = document.getElementById("cart-count");
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

renderCart();