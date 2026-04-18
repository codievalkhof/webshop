function scrollToSection(section) {
    const element = document.querySelector(section);
    element.scrollIntoView({ behavior: "smooth" });
}

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