// script.js
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-id");
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear existing cart items

  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for "Remove from Cart" buttons
  const removeFromCartBtns = document.querySelectorAll(".remove-from-cart-btn");
  removeFromCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-id");
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const selectedProduct = products.find((product) => product.id == productId);

  if (selectedProduct) {
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    cartItems.push(selectedProduct);
    sessionStorage.setItem("cart", JSON.stringify(cartItems));

    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
  const updatedCart = cartItems.filter((item) => item.id != productId);
  sessionStorage.setItem("cart", JSON.stringify(updatedCart));

  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Initial render
renderProducts();
renderCart();

// Add event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", clearCart);

