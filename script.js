// Product Data
const shopProducts = [
    {id: 1,
          name: "Wireless Headphones",
          price: 99.99,
          category: "electronics",
          image: "images/wireless_headphone.jpeg",
          description:
            "High-quality wireless headphones with noise cancellation",
        },
        {
          id: 2,
          name: "Classic T-Shirt",
          price: 24.99,
          category: "clothing",
          image: "images/Classic_tshirt.jpeg",
          description: "Comfortable cotton t-shirt in various colors",
        },
        // Add more products as needed
        {
          id: 3,
          name: "Sports Shoe",
          price: 49.99,
          category: "clothing",
          image: "images/sport_shoe.jpeg",
          description: "Stylish sports shoe for men and women",
        },
        {
          id: 4,
          name: "Smartphone",
          price: 1149.99,
          category: "electronics",
          image: "images/smartphone.jpeg",
          description: "Feature-rich smartphone with advanced features",
        },
        {
          id: 5,
          name: "Book:The Forgotten Promise",
          price: 20.99,
          category: "books",
          image: "images/TFPBook.jpeg",
          description: "A book on the Forgotten Promise written by Sondadian Baviter",
        },
        {
          id: 6,
          name: "Book:Forever Bound",
          price: 20.99,
          category: "books",
          image: "images/FBBook.jpeg",
          description: "A book on the Forever Bound written by warry potter",
        },
        {
        id: 7,
        name: "Smart Watch",
        price: 199.99,
        category: "electronics",
        image: "images/smartwatch.png",
        description: "Feature-rich smartwatch with health tracking"
    },
    {
        id: 8,
        name: "Denim Jeans",
        price: 49.99,
        category: "clothing",
        image: "images/denimjeans.jpeg",
        description: "Classic fit denim jeans"
    }
];

// Cart Management
let cartItems = [];
const cartCountElement = document.querySelector('.cart-count');

function updateCartCountDisplay() {
    cartCountElement.textContent = cartItems.length;
}

function handleAddToCart(productId) {
    const product = shopProducts.find(p => p.id === productId);
    if (product) {
        cartItems.push(product);
        updateCartCountDisplay();
        localStorage.setItem('shopease_cart', JSON.stringify(cartItems));
        alert('Product added to cart!');
    }
}

// Product Display
function createShopProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-details">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    return productCard;
}

function renderShopProducts(productsToRender = shopProducts) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = createShopProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Filter System
function handleFilterProducts() {
    const categoryFilter = document.getElementById('category-filter')?.value;
    const priceFilter = document.getElementById('price-filter')?.value;
    const sortFilter = document.getElementById('sort-filter')?.value;

    let filteredProducts = [...shopProducts];

    // Category filtering
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => 
            product.category === categoryFilter
        );
    }

    // Price filtering
    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            }
            return product.price >= min;
        });
    }

    // Sorting
    if (sortFilter) {
        switch(sortFilter) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                break;
        }
    }

    renderShopProducts(filteredProducts);
}

// Login System
function createLoginModal() {
    const modalHTML = `
        <div class="login-modal-overlay">
            <div class="login-modal">
                <h2>Welcome to ShopEase</h2>
                <form id="shop-login-form">
                    <div class="form-group">
                        <label for="shop-email">Email</label>
                        <input type="email" id="shop-email" required>
                    </div>
                    <div class="form-group">
                        <label for="shop-password">Password</label>
                        <input type="password" id="shop-password" required>
                    </div>
                    <button type="submit" id="shop-login-submit">Sign In</button>
                    <div class="signup-link">
                        Don't have an account? <a href="#" id="shop-signup-link">Sign up</a>
                    </div>
                </form>
            </div>
        </div>
    `;

    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    return modalContainer;
}
// Get a reference to the button element
const cartButton = document.getElementById('cart');

// Add an event listener to the button
cartButton.addEventListener('click', () => {
    // Redirect to the shopping cart page
    window.location.href = 'shopping-cart-page.html';
});


// User Management
let currentShopUser = null;

function handleShopLogin(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = {
                id: 1,
                email: email,
                name: email.split('@')[0],
                preferences: ['electronics', 'clothing']
            };
            
            localStorage.setItem('shopease_user', JSON.stringify(user));
            currentShopUser = user;
            
            updateUIForLoggedInUser(user);
            resolve(user);
        }, 1000);
    });
}

function updateUIForLoggedInUser(user) {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.textContent = `Hello, ${user.name}`;
        loginButton.classList.add('logged-in');
    }
    
    const recommendationsSection = document.querySelector('.recommendations');
    if (recommendationsSection) {
        recommendationsSection.classList.remove('hidden');
        updateShopRecommendations(user);
    }
}

function updateShopRecommendations(user) {
    const recommendedProducts = shopProducts.filter(product => 
        user.preferences.includes(product.category)
    ).slice(0, 4);
    
    const recommendedGrid = document.getElementById('recommended-products');
    if (recommendedGrid) {
        recommendedGrid.innerHTML = '';
        recommendedProducts.forEach(product => {
            const productCard = createShopProductCard(product);
            recommendedGrid.appendChild(productCard);
        });
    }
}

// Initialize Login System
function initializeShopLogin() {
    const loginButton = document.getElementById('loginButton');
    const loginModal = createLoginModal();
    document.body.appendChild(loginModal);
    
    // Check for existing session
    const savedUser = localStorage.getItem('shopease_user');
    if (savedUser) {
        currentShopUser = JSON.parse(savedUser);
        updateUIForLoggedInUser(currentShopUser);
    }
    
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            if (!currentShopUser) {
                loginModal.style.display = 'block';
            } else {
                // Handle logout
                localStorage.removeItem('shopease_user');
                currentShopUser = null;
                loginButton.textContent = 'Login';
                loginButton.classList.remove('logged-in');
                
                const recommendationsSection = document.querySelector('.recommendations');
                if (recommendationsSection) {
                    recommendationsSection.classList.add('hidden');
                }
            }
        });
    }
    
    const loginForm = document.getElementById('shop-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('shop-email').value;
            const password = document.getElementById('shop-password').value;
            
            const submitButton = document.getElementById('shop-login-submit');
            submitButton.disabled = true;
            submitButton.textContent = 'Signing in...';
            
            try {
                await handleShopLogin(email, password);
                loginModal.style.display = 'none';
            } catch (error) {
                alert('Login failed. Please try again.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Sign In';
            }
        });
    }
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('login-modal-overlay')) {
            loginModal.style.display = 'none';
        }
    });
}

// Initialize Shop Functionality
function initializeShop() {
    // Set up filter listeners
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');

    categoryFilter?.addEventListener('change', handleFilterProducts);
    priceFilter?.addEventListener('change', handleFilterProducts);
    sortFilter?.addEventListener('change', handleFilterProducts);

    // Load cart from localStorage
    const savedCart = localStorage.getItem('shopease_cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartCountDisplay();
        //if page reloads, reset count to 0
    }
    if (savedCart && !currentShopUser) {
        cartItems = [];
        updateCartCountDisplay();
      }
    
    // Initial render
    renderShopProducts();
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeShop();
    initializeShopLogin();
});
