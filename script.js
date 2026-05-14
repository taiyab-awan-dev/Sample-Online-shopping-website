const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 120,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Luxury Watch",
    price: 350,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Fashion Jacket",
    price: 180,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"
  }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
  const existingProduct = cart.find(item => item.id === id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    const product = products.find(p => p.id === id);

    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  updateCartUI();

  alert("Product added to cart");
}

function updateCartUI() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const totalPrice = document.getElementById('total-price');

  cartItems.innerHTML = '';

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const div = document.createElement('div');

    div.classList.add('cart-item');

    div.innerHTML = `
      <img src="${item.image}">
      
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>

        <div class="quantity-controls">
          <button onclick="changeQuantity(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>

      <button class="remove-btn" onclick="removeItem(${item.id})">
        X
      </button>
    `;

    cartItems.appendChild(div);
  });

  cartCount.innerText = count;
  totalPrice.innerText = total;
}

function changeQuantity(id, change) {
  const product = cart.find(item => item.id === id);

  product.quantity += change;

  if (product.quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  }

  saveCart();
  updateCartUI();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);

  saveCart();
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('active');
}

window.onload = function () {
  updateCartUI();
};
