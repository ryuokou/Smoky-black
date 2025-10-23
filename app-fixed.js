// ============================================
// 🚀 SMOKING BLACK - VERSIÓN REPARADA
// ============================================

console.log('🚀 Iniciando SMOKING BLACK - Versión Reparada');

// 📊 DATOS BÁSICOS
const ProductData = [
  {
    id: 'smoking-clasico',
    name: 'Smoking Clásico',
    icon: '🎩',
    features: ['Elegancia atemporal', 'Ajuste perfecto', 'Tela premium'],
    rent: 450,
    buy: 3500
  },
  {
    id: 'smoking-premium', 
    name: 'Smoking Premium',
    icon: '👔',
    features: ['Diseño exclusivo', 'Tela italiana', 'Acabados de lujo'],
    rent: 650,
    buy: 4800
  },
  {
    id: 'smoking-ejecutivo',
    name: 'Smoking Ejecutivo', 
    icon: '💼',
    features: ['Estilo moderno', 'Corte slim', 'Versatilidad'],
    rent: 550,
    buy: 4200
  }
];

// 🛒 CARRITO SIMPLE
let cartItems = [];
let cartTotal = 0;

// 🔔 MOSTRAR NOTIFICACIÓN
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 3000);
}

// 🏗️ CONSTRUIR HEADER
function buildHeader() {
  return `
    <header class="header">
      <nav class="nav">
        <div class="logo">
          <h1>SMOKING BLACK</h1>
        </div>
        <ul class="nav-links">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#catalogo">Catálogo</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div class="user-section">
          <button class="btn-login" onclick="showNotification('🔐 Sistema de login (demo)')">
            👤 Mi Cuenta
          </button>
        </div>
      </nav>
    </header>
  `;
}

// 🎯 CONSTRUIR HERO
function buildHero() {
  return `
    <section id="inicio" class="hero">
      <div class="hero-content">
        <h1>ELEGANCIA PREMIUM</h1>
        <p>Smokings de lujo para tus momentos más importantes</p>
        <button class="btn-hero" onclick="scrollToSection('catalogo')">
          🛍️ Ver Catálogo
        </button>
      </div>
    </section>
  `;
}

// 🛍️ CONSTRUIR CATÁLOGO
function buildCatalog() {
  const productsHTML = ProductData.map(product => `
    <div class="product-card">
      <div class="product-image">
        ${product.icon}
      </div>
      <h3>${product.name}</h3>
      <ul class="product-features">
        ${product.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
      </ul>
      <div class="product-pricing">
        <div class="price-option">
          <div class="price-label">💰 Alquiler</div>
          <div class="price-amount">$${product.rent.toLocaleString()}</div>
        </div>
        <div class="price-option">
          <div class="price-label">🛒 Compra</div>
          <div class="price-amount">$${product.buy.toLocaleString()}</div>
        </div>
      </div>
      <div class="product-actions">
        <button class="btn-rent" onclick="addToCart('${product.id}', 'rent', ${product.rent})">
          💰 Alquilar
        </button>
        <button class="btn-buy" onclick="addToCart('${product.id}', 'buy', ${product.buy})">
          🛒 Comprar
        </button>
      </div>
    </div>
  `).join('');

  return `
    <section id="catalogo" class="catalog">
      <h2 class="section-title">🛍️ CATÁLOGO PREMIUM</h2>
      <div class="products-grid">
        ${productsHTML}
      </div>
    </section>
  `;
}

// 🛒 CONSTRUIR CARRITO
function buildCart() {
  return `
    <div id="floatingCart" class="floating-cart">
      <div class="cart-header" onclick="toggleCart()">
        <div class="cart-title">
          🛒 Carrito
          <span id="cartCount" class="cart-count">0</span>
        </div>
        <span id="cartArrow" class="cart-arrow">▼</span>
      </div>
      <div id="cartContent" class="cart-content" style="display: none;">
        <div id="cartItems">
          <p>Tu carrito está vacío</p>
        </div>
        <div style="text-align: center; margin-top: 1rem;">
          <strong id="cartTotal">Total: $0 MXN</strong>
        </div>
        <div style="text-align: center; margin-top: 1rem;">
          <button class="btn-checkout" onclick="checkoutCart()">💳 Checkout</button>
        </div>
      </div>
    </div>
  `;
}

// 🛒 AGREGAR AL CARRITO
function addToCart(productId, type, price) {
  const product = ProductData.find(p => p.id === productId);
  if (!product) return;
  
  const item = {
    id: `${productId}-${type}`,
    name: product.name,
    type: type === 'rent' ? 'Alquiler' : 'Compra',
    price: price
  };
  
  const existingIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
  if (existingIndex === -1) {
    cartItems.push(item);
    updateCartDisplay();
    showNotification(`✅ ${item.name} agregado al carrito`);
  } else {
    showNotification(`ℹ️ Este producto ya está en tu carrito`);
  }
}

// 🔄 ACTUALIZAR CARRITO
function updateCartDisplay() {
  const cartCount = document.getElementById('cartCount');
  const cartItemsElement = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  
  cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  if (cartCount) cartCount.textContent = cartItems.length;
  if (cartTotalElement) cartTotalElement.textContent = `Total: $${cartTotal.toLocaleString()} MXN`;
  
  if (cartItemsElement) {
    if (cartItems.length > 0) {
      cartItemsElement.innerHTML = cartItems.map(item => `
        <div style="display: flex; justify-content: space-between; padding: 0.5rem; background: rgba(255,255,255,0.1); margin-bottom: 0.5rem; border-radius: 5px;">
          <span>${item.name} (${item.type})</span>
          <span style="color: #ffd700;">$${item.price.toLocaleString()}</span>
        </div>
      `).join('');
    } else {
      cartItemsElement.innerHTML = '<p>Tu carrito está vacío</p>';
    }
  }
}

// 🔄 TOGGLE CARRITO
function toggleCart() {
  const cartContent = document.getElementById('cartContent');
  const arrow = document.getElementById('cartArrow');
  
  if (cartContent.style.display === 'none') {
    cartContent.style.display = 'block';
    if (arrow) arrow.textContent = '▲';
  } else {
    cartContent.style.display = 'none';
    if (arrow) arrow.textContent = '▼';
  }
}

// 🎯 SCROLL SUAVE
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Ejemplo de cómo mostrar el modal con descripción a la derecha
function showImageModal(imageUrl, description, icon, title) {
  const modal = document.getElementById('imageModal');
  const imgEl = document.getElementById('modalMainImage');
  const descEl = document.getElementById('modalDescription');
  const titleEl = document.getElementById('modalDescTitle');
  const iconEl = document.getElementById('modalDescIcon');
  if (modal && imgEl && descEl && titleEl && iconEl) {
    imgEl.src = imageUrl;
    titleEl.textContent = title;
    iconEl.textContent = icon;
    modal.classList.add('active');
    descEl.textContent = description;
  }
}

// 🚀 CONSTRUIR APLICACIÓN
function buildApp() {
  console.log('🏗️ Construyendo aplicación...');
  
  const app = document.getElementById('app');
  
  const appHTML = `
    ${buildHeader()}
    ${buildHero()}
    ${buildCatalog()}
    ${buildCart()}
  `;
  
  app.insertAdjacentHTML('beforeend', appHTML);
  
  // Inicializar carrito
  updateCartDisplay();
  
  console.log('✅ Aplicación construida exitosamente');
}

// 🔄 MOSTRAR PROGRESO DE CARGA
function showLoadingProgress() {
  const loadingProgress = document.querySelector('.loading-progress');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) progress = 100;
    
    if (loadingProgress) {
      loadingProgress.style.width = `${progress}%`;
    }
    
    if (progress >= 100) {
      clearInterval(interval);
    }
  }, 200);
}

// 🚫 OCULTAR PANTALLA DE CARGA
function hideLoadingScreen() {
  const loading = document.getElementById('loading');
  
  if (loading) {
    loading.style.opacity = '0';
    loading.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      loading.style.display = 'none';
      showNotification('🎉 ¡Bienvenido a SMOKING BLACK!');
    }, 500);
  }
}

// 🚀 INICIALIZAR APLICACIÓN
function initApp() {
  console.log('🚀 Inicializando SMOKING BLACK...');
  
  showLoadingProgress();
  
  setTimeout(() => {
    buildApp();
    
    setTimeout(() => {
      hideLoadingScreen();
    }, 1000);
  }, 2000);
}

// 🚀 AUTO-INICIALIZAR
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

console.log('🎯 SMOKING BLACK - Versión Reparada Cargada');

// 🟢 CHECKOUT WHATSAPP
function checkoutCart() {
  if (cartItems.length === 0) {
    showNotification('⚠️ Tu carrito está vacío');
    return;
  }
  // Simular datos de usuario (puedes reemplazar por datos reales si tienes login)
  const userName = prompt('¿Cuál es tu nombre completo?');
  if (!userName) {
    showNotification('Por favor ingresa tu nombre para continuar.');
    return;
  }
  const userPhone = prompt('¿Cuál es tu número de teléfono?');
  if (!userPhone) {
    showNotification('Por favor ingresa tu teléfono para continuar.');
    return;
  }
  // Construir mensaje
  let message = `¡Hola! Soy ${userName} (${userPhone}) y quiero alquilar/comprar en SMOKING BLACK.\n\n`;
  message += '🛒 Mi pedido:\n';
  cartItems.forEach(item => {
    message += `• ${item.name} (${item.type}) - $${item.price.toLocaleString()}\n`;
  });
  message += `\nTotal: $${cartTotal.toLocaleString()} MXN`;
  message += '\n\n¿Me pueden contactar para coordinar la entrega y dar mi dirección?';
  // Enviar a WhatsApp
  const phoneNumber = '573159275527';
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
  showNotification('📱 Abriendo WhatsApp para finalizar tu pedido...');
}