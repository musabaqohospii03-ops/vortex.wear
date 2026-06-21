// LOADER
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1500);
});

// CART
let cart = [];

const cartIcon = document.querySelector(".cart-icon");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

cartIcon.addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// ADD TO CART
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({
            name,
            price
        });

        updateCart();
    });
});

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>Rp ${item.price.toLocaleString("id-ID")}</p>
            </div>

            <button onclick="removeItem(${index})">
                ✕
            </button>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = cart.length;

    cartTotal.textContent =
        "Rp " + total.toLocaleString("id-ID");
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// SEARCH PRODUCT
const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value =
    searchInput.value.toLowerCase();

    const products =
    document.querySelectorAll(".product-card");

    products.forEach(product => {

        const title =
        product.querySelector("h3")
        .textContent
        .toLowerCase();

        if(title.includes(value)){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }
    });

});

// CHECKOUT BUTTON
document
.getElementById("checkoutBtn")
.addEventListener("click", () => {

    if(cart.length === 0){
        alert("Keranjang masih kosong!");
        return;
    }

    document
    .getElementById("checkout")
    .scrollIntoView({
        behavior:"smooth"
    });

});

// FORM CHECKOUT
document
.getElementById("checkoutForm")
.addEventListener("submit", (e) => {

    e.preventDefault();

    if(cart.length === 0){
        alert("Tambahkan produk terlebih dahulu!");
        return;
    }

    alert(
        "Pesanan berhasil dibuat! Terima kasih telah berbelanja di VORTEX WEAR."
    );

    cart = [];

    updateCart();

    e.target.reset();

});

// CLOSE CART KLIK DI LUAR
window.addEventListener("click", (e) => {

    if(
        e.target === cartSidebar
    ){
        cartSidebar.classList.remove("active");
    }

});

// ANIMASI MUNCUL PRODUK
const cards =
document.querySelectorAll(".product-card");

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform =
            "translateY(0)";
        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform =
    "translateY(50px)";
    card.style.transition =
    "0.6s ease";

    observer.observe(card);

});