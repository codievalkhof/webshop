function myFunction() {
    let input = document.getElementById("myinput");
    let filter = input.value.toLowerCase();
    let products = document.getElementsByClassName("product");
    let visibleCount = 0;

    for (let i = 0; i < products.length; i++) {
        let name = products[i].getElementsByClassName("product-name")[0];
        let textValue = name.textContent || name.innerText;

        if (textValue.toLowerCase().indexOf(filter) > -1) {
            products[i].style.display = "block";
            visibleCount++;
        } else {
            products[i].style.display = "none";
        }
    }

    let noResults = document.getElementById("no-results");

    if (visibleCount === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const product = button.parentElement;
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        addToCart(name, price);
    });
});

function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
    });

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

updateCartCounter();