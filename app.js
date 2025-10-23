// ============================================
// 🚀 SMOKING BLACK - APLICACIÓN COMPLETA RECUPERADA
// ============================================

console.log('🚀 Inicializando SMOKY BLACK - Versión Recuperada');

// 📊 DATOS DE LA APLICACIÓN
const AppData = {
  products: [
     {
      id: 'smoking-gala',
      name: 'Smoking de Gala',
      image: 'imagen/20250620144321-Trajes-Trajes-TRAJE-FORMAL-AZUL-OSCURO-CUADROS-CN-18724202506201443211759.jpg',
      features: ['Máxima elegancia', 'Ocasiones especiales', 'Diseño único', 'Lujo absoluto'],
      prices: { rent: 0, buy: 0 }
    },
  ]
};

// 🏗️ CONSTRUCTOR DE COMPONENTES
const Components = {
  
  header: () => `
    <header id="header" class="header">
      <nav class="nav">
        <div class="logo">
          <h1>SMOKY BLACK</h1>
        </div>
        <ul class="nav-links">
          <li><a href="#inicio" onclick="scrollToSection('inicio')">Inicio</a></li>
          <li><a href="#catalogo" onclick="scrollToSection('catalogo')">Catálogo</a></li>
          <li><a href="#proceso" onclick="scrollToSection('proceso')">¿Cómo Funciona?</a></li>
          <li><a href="#medicion" onclick="scrollToSection('medicion')">Medición AI</a></li>
          <li><a href="#servicios" onclick="scrollToSection('servicios')">Servicios</a></li>
          <li><a href="#contacto" onclick="scrollToSection('contacto')">Contacto</a></li>
        </ul>
        <div class="user-section">
          <button id="loginBtn" class="btn-login" onclick="showLoginModal()">
            👤 Mi Cuenta
          </button>
          <div id="userProfile" class="user-profile" style="display: none;">
            <div class="user-avatar" onclick="toggleUserDropdown()">
              <span id="userInitials">JD</span>
            </div>
            <span id="userName">Usuario</span>
            <div id="userDropdown" class="user-dropdown" style="display: none;">
              <button onclick="showUserDashboard()">📊 tus datos</button>
              <button onclick="logoutUser()">🚪 Salir</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  
  hero: () => `
    <section id="inicio" class="hero">
      <div class="hero-content">
        <h1>COTIZA TU VESTIDO O TRAJE PARA TU EVENTO</h1>
        <p>Smokings de lujo para tus momentos más importantes</p>
        <button class="btn-hero" onclick="scrollToSection('catalogo')">
          <img src="imagen/8722439.gif" alt="Ver Catálogo" style="width: 24px; height: 24px; margin-right: 8px; vertical-align: middle;">
          Ver Catálogo
        </button>
        <button class="btn-hero" onclick="scrollToSection('medicion')">
          <img src="imagen/16272860.gif" alt="Medición AI" style="width: 24px; height: 24px; margin-right: 8px; vertical-align: middle;">
          Medición AI
        </button>
      </div>
    </section>
  `,
  
  catalog: () => `
    <section id="catalogo" class="catalog">
      <h2 class="section-title">🛍️ CATÁLOGO DE CABALLERO Y DAMA</h2>
      <div class="catalog-carousel">
        <button class="carousel-arrow left" onclick="moveCarousel(-1)">‹</button>
        <div class="carousel-track">
          ${AppData.products.map(product => `
            <div class="product-card">
              ${ImageGallery.createGallery(product.id)}
              <h3>${product.name}</h3>
              <ul class="product-features">
                ${product.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
              </ul>
              <div class="product-pricing">
                <div class="price-option">
                  <div class="price-label">💰 Alquiler</div>
                  <div class="price-amount">$${product.prices.rent.toLocaleString()}</div>
                </div>
                <div class="price-option">
                  <div class="price-label">🛒 Compra</div>
                  <div class="price-amount">$${product.prices.buy.toLocaleString()}</div>
                </div>
              </div>
              <div class="product-actions">
                <button class="btn-rent" onclick="addToCart('${product.id}', 'rent', ${product.prices.rent})">
                  💰 Alquilar
                </button>
              </div>
            </div>
          `).join('')}
        </div>
       
      </div>
    </section>
  `,
  
  aiMeasurement: () => `
    <section id="medicion" class="ai-measurement">
      <h2 class="section-title">🤖 MEDICIÓN AI</h2>
      <div class="measurement-content" style="max-width: 1000px; margin: 0 auto; text-align: center;">
        
        <!-- Introducción -->
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 20px; padding: 2rem; border: 2px solid rgba(255, 215, 0, 0.2); margin-bottom: 2rem;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">📹</div>
          <h3 style="color:rgb(255, 255, 254); margin-bottom: 1rem;">Medición AI Inteligente</h3>
          <p style="margin-bottom: 2rem; opacity: 0.9;">Utiliza tu cámara para obtener medidas precisas automáticamente. Nuestro sistema AI analiza tu cuerpo y proporciona las medidas exactas.</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
            <div style="background: rgba(255, 215, 0, 0.1); padding: 1rem; border-radius: 10px; border: 1px solid rgb(0, 0, 0);">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
              <strong>Precisión 95%</strong>
              <p style="font-size: 0.9rem; opacity: 0.8;">Medidas exactas</p>
            </div>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 1rem; border-radius: 10px; border: 1px solid rgba(4, 4, 4, 0.96);">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚡</div>
              <strong>En 30 segundos</strong>
              <p style="font-size: 0.9rem; opacity: 0.8;">Súper rápido</p>
            </div>
            <div style="background: rgba(255, 215, 0, 0.1); padding: 1rem; border-radius: 10px; border: 1px solid rgb(1, 1, 1);">
              <div style="font-size: 2rem; margin-bottom: 0.5rem;">🔒</div>
              <strong>100% Privado</strong>
              <p style="font-size: 0.9rem; opacity: 0.8;">Sin guardar datos</p>
            </div>
          </div>
          
          <button class="btn-hero" onclick="startAIMeasurement()" id="startMeasurementBtn">
            📸 Iniciar Medición AI
          </button>
        </div>
        
        <!-- Área de cámara -->
        <div id="cameraSection" style="display: none; background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 20px; padding: 2rem; border: 2px solid rgba(255, 215, 0, 0.2); margin-bottom: 2rem;">
          <h3 style="color: #ffd700; margin-bottom: 1rem;">🎥 Captura de Medidas</h3>
          
          <div style="position: relative; max-width: 500px; margin: 0 auto;">
            <video id="measurementVideo" autoplay playsinline style="width: 100%; border-radius: 15px; background: #000;"></video>
            
            <!-- Overlay para guías -->
            <div id="measurementOverlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none;">
              <!-- Guías visuales serán agregadas aquí por JavaScript -->
            </div>
          </div>
          
          <div style="margin-top: 1rem;">
            <div id="measurementInstructions" style="color:rgb(255, 255, 255); font-weight: 600; margin-bottom: 1rem;">
              📍 Colócate a 2 metros de la cámara con los brazos extendidos
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button class="btn-hero" onclick="captureMeasurement()" id="captureBtn" style="background: linear-gradient(135deg,rgb(0, 0, 0),rgb(247, 247, 247));">
                📸 Capturar Medidas
              </button>
              <button class="btn-hero" onclick="stopAIMeasurement()" style="background: linear-gradient(135deg,rgb(231, 231, 231),rgb(0, 0, 0));">
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
        
        <!-- Resultados -->
        <div id="resultsSection" style="display: none; background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 20px; padding: 2rem; border: 2px solid rgba(255, 215, 0, 0.2);">
          <h3 style="color:rgb(255, 255, 255); margin-bottom: 2rem;">� Tus Medidas AI</h3>
          
          <div id="measurementResults" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <!-- Resultados serán insertados aquí -->
          </div>
          
          <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn-hero" onclick="saveMeasurements()" style="background: linear-gradient(135deg, #28a745, #20c997);">
              💾 Guardar Medidas
            </button>
            <button class="btn-hero" onclick="retakeMeasurement()">
              🔄 Volver a Medir
            </button>
            <button class="btn-hero" onclick="recommendSmokings()" style="background: linear-gradient(135deg,rgb(255, 255, 255),rgb(0, 0, 0));">
              🎯 Ver Recomendaciones
            </button>
          </div>
        </div>
        
      </div>
    </section>
  `,
  
  services: () => `
    <section id="servicios" class="services" style="padding: 5rem 2rem; max-width: 1200px; margin: 0 auto;">
      <h2 class="section-title">⭐ SERVICIOS PREMIUM</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid rgba(255, 215, 0, 0.2);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🚚</div>
          <h3 style="color:rgb(246, 246, 246); margin-bottom: 1rem;">Entrega Express</h3>
          <p>Entrega en menos de 24 horas en área metropolitana</p>
        </div>
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid rgba(255, 215, 0, 0.2);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">📏</div>
          <h3 style="color:rgb(255, 255, 255); margin-bottom: 1rem;">Ajustes Incluidos</h3>
          <p>Ajustes profesionales sin costo adicional</p>
        </div>
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid rgba(255, 215, 0, 0.2);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🛡️</div>
          <h3 style="color:rgb(242, 241, 235); margin-bottom: 1rem;">Garantía Total</h3>
          <p>100% garantía de satisfacción o devolución</p>
        </div>
        <div style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid rgba(255, 215, 0, 0.2);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">👨‍💼</div>
          <h3 style="color:rgb(245, 245, 245); margin-bottom: 1rem;">Asesoría Personal</h3>
          <p>Estilista personal para tu evento especial</p>
        </div>
      </div>
    </section>
  `,
  
  rentalProcess: () => `
    <section id="proceso" class="rental-process" style="padding: 5rem 2rem; background: linear-gradient(135deg,rgb(255, 255, 255),rgb(0, 0, 0)); max-width: 1200px; margin: 0 auto;">
      <h2 class="section-title">📋 ¿CÓMO FUNCIONA EL ALQUILER?</h2>
      <div style="max-width: 1000px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          
          <!-- Paso 1 -->
          <div style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border-radius: 20px; padding: 2rem; text-align: center; border: 2px solid rgba(52, 58, 64, 0.1); position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #343a40, #495057); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem;">1</div>
            <div style="font-size: 3rem; margin: 2rem 0 1rem 0; color: #495057; display: flex; align-items: center; justify-content: center;">
              <img src="imagen/71.jpg" alt="Elige tu Smoking" style="width: 300px; height: 350px;border-radius: 15px;">
            </div>
            <h3 style="color: #343a40; margin-bottom: 1rem; font-family: 'Orbitron', sans-serif;">Elige tu Smoking</h3>
            <p style="color: #6c757d; line-height: 1.5;">Elige tu traje de acuerdo al catálogo nuestras ofertas y puedes elegir tu traje en nuestro catálogo para tu ocasión ideal</p>
          </div>
          
          <!-- Paso 2 -->
          <div style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border-radius: 20px; padding: 2rem; text-align: center; border: 2px solid rgba(52, 58, 64, 0.1); position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #343a40, #495057); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem;">2</div>
            <div style="font-size: 3rem; margin: 2rem 0 1rem 0; color: #495057; display: flex; align-items: center; justify-content: center;">
              <img src="imagen/70.jpg" alt="Contáctanos" style="width: 300px; height: 350px;border-radius: 15px;">
            </div>
            <h3 style="color: #343a40; margin-bottom: 1rem; font-family: 'Orbitron', sans-serif;">Contáctanos</h3>
            <p style="color: #6c757d; line-height: 1.5;">Escríbenos por WhatsApp o llámanos para confirmar disponibilidad y coordinar detalles</p>
          </div>
          
          <!-- Paso 3 -->
          <div style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border-radius: 20px; padding: 2rem; text-align: center; border: 2px solid rgba(52, 58, 64, 0.1); position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #343a40, #495057); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem;">3</div>
            <div style="font-size: 3rem; margin: 2rem 0 1rem 0; color: #495057; display: flex; align-items: center; justify-content: center;">
              <img src="imagen/69.jpg" alt="Toma de Medidas" style="width: 300px; height: 350px;border-radius: 15px;">
            </div>
            <h3 style="color: #343a40; margin-bottom: 1rem; font-family: 'Orbitron', sans-serif;">Toma de Medidas</h3>
            <p style="color: #6c757d; line-height: 1.5;">Visita nuestro showroom para toma de medidas profesional o usa nuestro sistema AI</p>
          </div>
          
          <!-- Paso 4 -->
          <div style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border-radius: 20px; padding: 2rem; text-align: center; border: 2px solid rgba(52, 58, 64, 0.1); position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #343a40, #495057); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem;">4</div>
            <div style="font-size: 3rem; margin: 2rem 0 1rem 0; color: #495057; display: flex; align-items: center; justify-content: center;">
              <img src="imagen/67.jpg" alt="Confirma y Paga" style="width: 300px; height: 350px;border-radius: 15px;">
            </div>
            <h3 style="color: #343a40; margin-bottom: 1rem; font-family: 'Orbitron', sans-serif;">Confirma y Paga</h3>
            <p style="color: #6c757d; line-height: 1.5;">Realiza el pago del 50% para reservar. Aceptamos efectivo, transferencia y tarjetas</p>
          </div>
          
          <!-- Paso 5 -->
          <div style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border-radius: 20px; padding: 2rem; text-align: center; border: 2px solid rgba(52, 58, 64, 0.1); position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #343a40, #495057); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem;">5</div>
            <div style="font-size: 3rem; margin: 2rem 0 1rem 0; color: #495057; display: flex; align-items: center; justify-content: center;">
              <img src="imagen/IMG-20251023-WA0016.jpg" alt="Entrega Express" style="width: 300px; height: 350px;border-radius: 15px;">
            </div>
            <h3 style="color: #343a40; margin-bottom: 1rem; font-family: 'Orbitron', sans-serif;">Entrega Express</h3>
            <p style="color: #6c757d; line-height: 1.5;">Debes haber cancelado el costo total por favor entregar el valor de depósito en efectivo para así cuando haya de vuelta el traje podrá recibir el valor en efectivo de su depósito Se puede acercar a nuestras sedes a recoger su traje para su ocasión si lo desea tenemos también un servicio de entrega muy economico qué lo cubriría el cliente para que le llegue al punto donde lo desea seguro y confiable</p>
          </div>
          
          <!-- Paso 6 -->
          <div style="background: linear-gradient(135deg, #ffffff, #f8f9fa); border-radius: 20px; padding: 2rem; text-align: center; border: 2px solid rgba(52, 58, 64, 0.1); position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);">
            <div style="position: absolute; top: -15px; left: 50%; transform: translateX(-50%); background: linear-gradient(135deg, #343a40, #495057); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem;">6</div>
            <div style="font-size: 3rem; margin: 2rem 0 1rem 0; color: #495057; display: flex; align-items: center; justify-content: center;">
              <img src="imagen/IMG-20251023-WA0005.jpg" alt="Disfruta tu Evento" style="width: 300px; height: 350px;border-radius: 15px;">
            </div>
            <h3 style="color: #343a40; margin-bottom: 1rem; font-family: 'Orbitron', sans-serif;">¡Disfruta tu Evento!</h3>
            <p style="color: #6c757d; line-height: 1.5;">Cuando hayas terminado de utilizar el traje que hayas alquilado por favor no lavarlo ya que nosotros manejamos sistema de lavado muy especial se lo agradecería que cuando terminara de utilizarlo entregarlo tal cual</p>
          </div>
          
        </div>
        
        <!-- Información adicional -->
        <div style="background: linear-gradient(135deg, #343a40, #495057); border-radius: 25px; padding: 3rem; text-align: center; color: white; margin-top: 3rem;">
          <h3 style="color: #ffffff; margin-bottom: 2rem; font-family: 'Orbitron', sans-serif; font-size: 1.5rem;">🎯 INCLUYE EN TU ALQUILER</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div>✓ Incluyendo el accesorio para combinar con tu traje de alquiler lo accesorio van incluido según el cliente si lo desea</div>
          </div>
          <button class="btn-hero" onclick="openWhatsApp()" style="background: linear-gradient(135deg, #25D366, #128C7E); margin-top: 1rem;">
            💬 ¡Reserva Ahora por WhatsApp!
          </button>
        </div>
        
      </div>
    </section>
  `,
  
  contact: () => `
    <section id="contacto" class="contact" style="padding: 5rem 2rem; background: linear-gradient(135deg, #1a1a1a, #0a0a0a);">
      <h2 class="section-title">📞 CONTACTO</h2>
      <div style="max-width: 800px; margin: 0 auto; text-align: center;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.2);">
            <span style="font-size: 1.5rem; color:rgb(235, 233, 225);">📍</span>
            <span>Ac 100 #62-09, Barrios Unidos, Bogotá, Cundinamarca</span>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.2);">
            <span style="font-size: 1.5rem; color:rgb(240, 240, 240);">📞</span>
            <span>+57 33 1234 5678</span>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.2);">
            <span style="font-size: 1.5rem; color:rgb(255, 255, 255);">📧</span>
            <span>info@smokingblack.com</span>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem; padding: 1.5rem; background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.2);">
            <span style="font-size: 1.5rem; color:rgb(254, 254, 253);">🕒</span>
            <span>Lun-Dom: 9:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  `,
  
  footer: () => `
    <footer style="background: #0a0a0a; padding: 3rem 2rem 1rem; border-top: 1px solid rgba(255, 215, 0, 0.2);">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
        <div>
          <h3 style="color:rgb(253, 251, 241); margin-bottom: 1rem;">SMOKY BLACK</h3>
          <p>Elegancia premium para tus momentos más importantes</p>
        </div>
        <div>
          <h4 style="color:rgb(255, 254, 251); margin-bottom: 1rem;">Enlaces</h4>
          <ul style="list-style: none;">
            <li><a href="#inicio" style="color: #ffffff; text-decoration: none;">Inicio</a></li>
            <li><a href="#catalogo" style="color: #ffffff; text-decoration: none;">Catálogo</a></li>
            <li><a href="#servicios" style="color: #ffffff; text-decoration: none;">Servicios</a></li>
            <li><a href="#contacto" style="color: #ffffff; text-decoration: none;">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 style="color:rgb(255, 255, 255); margin-bottom: 1rem;">Síguenos</h4>
          <div>
            <a href="#" style="color: #ffffff; text-decoration: none; margin-right: 1rem;">📘 Facebook</a><br>
            <a href="#" style="color: #ffffff; text-decoration: none; margin-right: 1rem;">📷 Instagram</a><br>
            <a href="#" style="color: #ffffff; text-decoration: none;">🐦 Twitter</a>
          </div>
        </div>
      </div>
      <div style="text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid rgba(255, 255, 255, 0.1); opacity: 0.7;">
        <p>&copy; 2024 SMOKY BLACK. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
  
  floatingCart: () => `
    <div id="floatingCart" class="floating-cart">
      <div class="cart-header" onclick="toggleCart()">
        <div class="cart-title">
          🛒 Carrito
          <span id="cartCount" class="cart-count">0</span>
        </div>
        <span id="cartArrow" class="cart-arrow">▼</span>
      </div>
      <div class="cart-content">
        <div id="cartItems" class="cart-items">
          <div class="cart-empty">
            <span style="font-size: 2rem;">🛍️</span>
            <p>Tu carrito está vacío</p>
          </div>
        </div>
        <div class="cart-total" style="display: none;">
          <div class="total-amount" id="cartTotal">$0 MXN</div>
        </div>
        <div class="cart-actions" style="display: none;">
          <button class="btn-checkout" onclick="proceedToCheckout()">
            💳 Checkout
          </button>
        </div>
      </div>
    </div>
  `,
  
  loginModal: () => `
    <div id="authModal" class="modal" style="display: none;">
      <div class="modal-content">
        <div class="modal-header">
          <h2 id="authTitle">🔐 Iniciar Sesión</h2>
          <button class="close-modal" onclick="closeAuthModal()">✕</button>
        </div>
        
        <form id="loginForm" class="auth-form">
          <div class="form-group">
            <label for="loginEmail">Email:</label>
            <input type="email" id="loginEmail" required placeholder="tu@email.com">
          </div>
          <div class="form-group">
            <label for="loginPassword">Contraseña:</label>
            <input type="password" id="loginPassword" required placeholder="Tu contraseña">
          </div>
          <button type="submit" class="btn-checkout">🔐 Iniciar Sesión</button>
          
          <div style="text-align: center; margin-top: 1rem;">
            <button type="button" onclick="switchToRegister()" style="background: none; border: none; color: #ffd700; text-decoration: underline; cursor: pointer;">
              ✨ Crear cuenta nueva
            </button>
          </div>
        </form>
        
        <form id="registerForm" class="auth-form" style="display: none;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label for="registerFirstName">Nombre:</label>
              <input type="text" id="registerFirstName" required placeholder="Juan">
            </div>
            <div class="form-group">
              <label for="registerLastName">Apellido:</label>
              <input type="text" id="registerLastName" required placeholder="Pérez">
            </div>
          </div>
          <div class="form-group">
            <label for="registerEmail">Email:</label>
            <input type="email" id="registerEmail" required placeholder="juan@email.com">
          </div>
          <div class="form-group">
            <label for="registerPassword">Contraseña:</label>
            <input type="password" id="registerPassword" required placeholder="Mínimo 6 caracteres">
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirmar Contraseña:</label>
            <input type="password" id="confirmPassword" required placeholder="Repite tu contraseña">
          </div>
          <button type="submit" class="btn-checkout">✨ Crear Cuenta</button>
          
          <div style="text-align: center; margin-top: 1rem;">
            <button type="button" onclick="switchToLogin()" style="background: none; border: none; color:rgb(252, 252, 252); text-decoration: underline; cursor: pointer;">
              🔐 Ya tengo cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  
  whatsappButton: () => `
    <a href="javascript:void(0)" onclick="openWhatsApp()" class="whatsapp-float">
      <span class="whatsapp-icon">💬</span>
      <span class="whatsapp-text">¡Cotiza por WhatsApp!</span>
    </a>
  `,
  
  userDashboard: () => `
    <div id="userDashboard" class="modal" style="display: none;">
      <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow-y: auto;">
        <div class="modal-header">
          <h2 id="dashboardTitle">📊 Mi Dashboard</h2>
          <button class="close-modal" onclick="closeUserDashboard()">✕</button>
        </div>
        
        <!-- Información del Usuario -->
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg,rgb(255, 254, 250),rgb(143, 1, 168)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: #1a1a1a;" id="dashboardAvatar">
              <!-- Iniciales del usuario -->
            </div>
            <div>
              <h3 style="color:rgb(255, 255, 255); margin: 0;" id="dashboardUserName">Nombre Usuario</h3>
              <p style="color: #e8e8e8; margin: 0.2rem 0 0 0; opacity: 0.8;" id="dashboardUserEmail">email@usuario.com</p>
              <p style="color:rgb(255, 255, 255); margin: 0.2rem 0 0 0; font-size: 0.9rem;" id="dashboardMemberSince">Miembro desde: 2024</p>
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
            <div style="text-align: center; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
              <div style="font-size: 1.5rem; color:rgb(255, 254, 246);">🛍️</div>
              <div style="font-size: 1.2rem; font-weight: 700; color:rgb(255, 255, 252);" id="totalRentals">0</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Alquileres</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
              <div style="font-size: 1.5rem; color: #ffd700;">🛒</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;" id="totalPurchases">0</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Compras</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
              <div style="font-size: 1.5rem; color: #ffd700;">💰</div>
              <div style="font-size: 1.2rem; font-weight: 700, color: #ffd700;" id="totalSpent">$0</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Total Gastado</div>
            </div>
            <div style="text-align: center; padding: 1rem; background: rgba(255, 215, 0, 0.1); border-radius: 10px;">
              <div style="font-size: 1.5rem; color: #ffd700;">📏</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: #ffd700;" id="userSize">-</div>
              <div style="font-size: 0.9rem; opacity: 0.8;">Mi Talla</div>
            </div>
          </div>
        </div>
        
        <!-- Tabs de Navegación -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 215, 0, 0.2);">
          <button class="dashboard-tab active" onclick="switchDashboardTab('profile')" id="profileTab">
            👤 Perfil
          </button>
          <button class="dashboard-tab" onclick="switchDashboardTab('orders')" id="ordersTab">
            📦 Mis Pedidos
          </button>
          <button class="dashboard-tab" onclick="switchDashboardTab('measurements')" id="measurementsTab">
            📏 Medidas
          </button>
          <button class="dashboard-tab" onclick="switchDashboardTab('favorites')" id="favoritesTab">
            ❤️ Favoritos
          </button>
          <button class="dashboard-tab" onclick="switchDashboardTab('settings')" id="settingsTab">
            ⚙️ Configuración
          </button>
        </div>
        
        <!-- Contenido de Tabs -->
        <div id="dashboardContent">
          <!-- El contenido se insertará aquí dinámicamente -->
        </div>
        
      </div>
    </div>
  `
};

// 🛒 SISTEMA DE CARRITO
const Cart = {
  items: [],
  total: 0,
  isExpanded: false,
  
  add: (productId, type, price) => {
    const product = AppData.products.find(p => p.id === productId);
    if (!product) return;
    
    const item = {
      id: `${productId}-${type}`,
      name: product.name,
      type: type === 'rent' ? 'Alquiler' : 'Compra',
      price: price
    };
    
    const existingIndex = Cart.items.findIndex(cartItem => cartItem.id === item.id);
    if (existingIndex === -1) {
      Cart.items.push(item);
      Cart.updateDisplay();
      Cart.showAnimation();
      showNotification(`✅ ${item.name} agregado al carrito`);
    } else {
      showNotification(`ℹ️ Este producto ya está en tu carrito`);
    }
  },
  
  updateDisplay: () => {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartTotalElement = document.querySelector('.cart-total');
    const cartActionsElement = document.querySelector('.cart-actions');
    
    Cart.total = Cart.items.reduce((sum, item) => sum + item.price, 0);
    
    if (cartCount) cartCount.textContent = Cart.items.length;
    if (cartTotal) cartTotal.textContent = `$${Cart.total.toLocaleString()} MXN`;
    
    if (cartItems) {
      if (Cart.items.length > 0) {
        cartItems.innerHTML = Cart.items.map(item => `
          <div class="cart-item">
            <div class="cart-item-name">${item.name} (${item.type})</div>
            <div class="cart-item-price">$${item.price.toLocaleString()}</div>
          </div>
        `).join('');
        
        if (cartTotalElement) cartTotalElement.style.display = 'block';
        if (cartActionsElement) cartActionsElement.style.display = 'block';
      } else {
        cartItems.innerHTML = `
          <div class="cart-empty">
            <span style="font-size: 2rem;">🛍️</span>
            <p>Tu carrito está vacío</p>
          </div>
        `;
        if (cartTotalElement) cartTotalElement.style.display = 'none';
        if (cartActionsElement) cartActionsElement.style.display = 'none';
      }
    }
  },
  
  toggle: () => {
    const floatingCart = document.getElementById('floatingCart');
    const arrow = document.getElementById('cartArrow');
    
    Cart.isExpanded = !Cart.isExpanded;
    
    if (Cart.isExpanded) {
      floatingCart.classList.add('expanded');
      if (arrow) arrow.textContent = '▲';
    } else {
      floatingCart.classList.remove('expanded');
      if (arrow) arrow.textContent = '▼';
    }
  },
  
  showAnimation: () => {
    const floatingCart = document.getElementById('floatingCart');
    if (floatingCart) {
      floatingCart.style.transform = 'translateY(-20px) scale(1.05)';
      setTimeout(() => {
        floatingCart.style.transform = 'translateY(0) scale(1)';
      }, 300);
    }
  },
  
  checkout: () => {
    if (Cart.items.length === 0) {
      showNotification('⚠️ Tu carrito está vacío');
      return;
    }
    
    // Verificar si UserManager existe y hay usuario logueado
    if (typeof UserManager !== 'undefined' && UserManager.isLoggedIn) {
      showNotification('🚀 Procesando pedido...');
      
      setTimeout(() => {
        showNotification('✅ ¡Pedido confirmado! Recibirás un email');
        Cart.items = [];
        Cart.updateDisplay();
        Cart.toggle();
      }, 2000);
    } else {
      showNotification('🔐 Inicia sesión para continuar');
      showLoginModal();
    }
  }
};

// 🔔 SISTEMA DE NOTIFICACIONES
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

// 📱 FUNCIÓN PARA ABRIR WHATSAPP
function openWhatsApp() {
  // Cambia este número por tu WhatsApp real
  const phoneNumber = '+573159275527'; // Formato: código país + número sin espacios ni símbolos
  const message = encodeURIComponent('¡Hola! Me interesa alquilar un smoking de SMOKING BLACK. ¿Podrían darme más información?');
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
  
  // Abrir WhatsApp en nueva ventana
  window.open(whatsappURL, '_blank');
  
  // Mostrar notificación
  showNotification('📱 Abriendo WhatsApp...');
}

// 🔐 SISTEMA DE VALIDACIONES MEJORADO
const UserValidation = {
  
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '✅ Email válido' : '❌ Email inválido'
    };
  },
  
  validatePassword: (password) => {
    const minLength = password.length >= 6;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    
    const isValid = minLength && hasNumber && hasLetter;
    
    let message = '✅ Contraseña segura';
    if (!minLength) message = '❌ Mínimo 6 caracteres';
    else if (!hasNumber) message = '❌ Debe incluir números';
    else if (!hasLetter) message = '❌ Debe incluir letras';
    
    return { isValid, message };
  },
  
  validateName: (name) => {
    const isValid = name.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
    return {
      isValid,
      message: isValid ? '✅ Nombre válido' : '❌ Solo letras, mínimo 2 caracteres'
    };
  }
};

// 🎨 SISTEMA DE FEEDBACK VISUAL
const FormFeedback = {
  
  showFieldStatus: (fieldId, validation) => {
    const field = document.getElementById(fieldId);
    const parent = field?.parentElement;
    
    if (!field || !parent) return;
    
    // Remover feedback anterior
    const existingFeedback = parent.querySelector('.field-feedback');
    if (existingFeedback) existingFeedback.remove();
    
    // Crear nuevo feedback
    const feedback = document.createElement('div');
    feedback.className = 'field-feedback';
    feedback.textContent = validation.message;
    feedback.style.cssText = `
      font-size: 0.8rem;
      margin-top: 0.3rem;
      color: ${validation.isValid ? '#28a745' : '#dc3545'};
      font-weight: 600;
    `;
    
    // Cambiar color del borde
    field.style.borderColor = validation.isValid ? '#28a745' : '#dc3545';
    
    parent.appendChild(feedback);
  },
  
  clearFieldStatus: (fieldId) => {
    const field = document.getElementById(fieldId);
    const parent = field?.parentElement;
    
    if (!field || !parent) return;
    
    const feedback = parent.querySelector('.field-feedback');
    if (feedback) feedback.remove();
    
    field.style.borderColor = 'rgba(108, 117, 125, 0.2)';
  }
};

// 🎯 FUNCIONES GLOBALES
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function addToCart(productId, type, price) {
  Cart.add(productId, type, price);
}

function toggleCart() {
  Cart.toggle();
}

function proceedToCheckout() {
  Cart.checkout();
}

function showLoginModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.display = 'flex';
    switchToLogin();
  } else {
    showNotification('🔐 Sistema de login (integrado con UserManager)');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.style.display = 'none';
}

function switchToLogin() {
  const title = document.getElementById('authTitle');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (title) title.textContent = '🔐 Iniciar Sesión';
  if (loginForm) loginForm.style.display = 'block';
  if (registerForm) registerForm.style.display = 'none';
}

function switchToRegister() {
  const title = document.getElementById('authTitle');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (title) title.textContent = '✨ Crear Cuenta';
  if (loginForm) loginForm.style.display = 'none';
  if (registerForm) registerForm.style.display = 'block';
}

function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
}

function logoutUser() {
  if (typeof UserManager !== 'undefined') {
    UserManager.logout();
  } else {
    showNotification('👋 Sesión cerrada (demo)');
  }
}

function showUserDashboard() {
  UserDashboard.open();
}

function openWhatsApp() {
  const phoneNumber = '+573159275527'; 
  const message = 'Hola, estoy interesado en más información.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(url, '_blank');
}

// 👤 SISTEMA DE GESTIÓN DE USUARIOS COMPLETO
const UserManager = {
  
  // 📊 ALMACENAMIENTO LOCAL
  users: JSON.parse(localStorage.getItem('smokingBlackUsers') || '[]'),
  currentUser: JSON.parse(localStorage.getItem('smokingBlackCurrentUser') || 'null'),
  isLoggedIn: false,
  
  // 🔧 INICIALIZACIÓN
  init: () => {
    // Verificar si hay usuario logueado
    if (UserManager.currentUser) {
      UserManager.isLoggedIn = true;
      console.log('👤 Usuario encontrado:', UserManager.currentUser.firstName);
    }
  },
  
  // ✅ REGISTRO DE USUARIO
  register: (userData) => {
    try {
      // Validar datos
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        return {
          success: false,
          message: 'Todos los campos son obligatorios'
        };
      }
      
      // Verificar si el email ya existe
      const existingUser = UserManager.users.find(user => user.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'Este email ya está registrado'
        };
      }
      
      // Crear nuevo usuario
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: btoa(userData.password), // Codificación básica
        createdAt: new Date().toISOString(),
        profile: {
          phone: '',
          address: '',
          preferredSize: '',
          rentals: [],
          purchases: []
        }
      };
      
      // Agregar a la lista
      UserManager.users.push(newUser);
      
      // Guardar en localStorage
      localStorage.setItem('smokingBlackUsers', JSON.stringify(UserManager.users));
      
      // Auto-login después del registro
      UserManager.currentUser = newUser;
      UserManager.isLoggedIn = true;
      localStorage.setItem('smokingBlackCurrentUser', JSON.stringify(newUser));
      
      console.log('✅ Usuario registrado:', newUser.firstName);
      
      return {
        success: true,
        message: 'Cuenta creada exitosamente',
        user: newUser
      };
      
    } catch (error) {
      console.error('❌ Error en registro:', error);
      return {
        success: false,
        message: 'Error interno. Intenta de nuevo.'
      };
    }
  },
  
  // 🔐 LOGIN DE USUARIO
  login: (email, password) => {
    try {
      // Buscar usuario
      const user = UserManager.users.find(u => u.email === email);
      
      if (!user) {
        return {
          success: false,
          message: 'Usuario no encontrado'
        };
      }
      
      // Verificar contraseña
      const decodedPassword = atob(user.password);
      if (decodedPassword !== password) {
        return {
          success: false,
          message: 'Contraseña incorrecta'
        };
      }
      
      // Login exitoso
      UserManager.currentUser = user;
      UserManager.isLoggedIn = true;
      localStorage.setItem('smokingBlackCurrentUser', JSON.stringify(user));
      
      console.log('✅ Login exitoso:', user.firstName);
      
      return {
        success: true,
        message: 'Bienvenido de vuelta',
        user: user
      };
      
    } catch (error) {
      console.error('❌ Error en login:', error);
      return {
        success: false,
        message: 'Error interno. Intenta de nuevo.'
      };
    }
  },
  
  // 🚪 LOGOUT
  logout: () => {
    UserManager.currentUser = null;
    UserManager.isLoggedIn = false;
    localStorage.removeItem('smokingBlackCurrentUser');
    
    // Actualizar UI
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    
    if (loginBtn) loginBtn.style.display = 'block';
    if (userProfile) userProfile.style.display = 'none';
    
    showNotification('👋 Sesión cerrada correctamente');
    console.log('👋 Usuario deslogueado');
  },
  
  // 📊 OBTENER ESTADÍSTICAS
  getStats: () => {
    return {
      totalUsers: UserManager.users.length,
      loggedIn: UserManager.isLoggedIn,
      currentUser: UserManager.currentUser?.firstName || 'Ninguno'
    };
  }
};

// 🚀 APLICACIÓN PRINCIPAL
const App = {
  
  init: () => {
    console.log('🚀 Inicializando SMOKING BLACK - Versión Recuperada...');
    App.showLoadingScreen();
    
    setTimeout(() => {
      App.buildApplication();
    }, 1500);
  },
  
  showLoadingScreen: () => {
    const loadingProgress = document.querySelector('.loading-progress');
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;
      
      if (loadingProgress) {
        loadingProgress.style.width = `${progress}%`;
      }
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  },
  
  buildApplication: () => {
    console.log('🏗️ Construyendo aplicación...');
    
    const app = document.getElementById('app');
    
    const appHTML = `
      ${Components.header()}
      ${Components.hero()}
      ${Components.catalog()}
      ${Components.rentalProcess()}
      ${Components.aiMeasurement()}
      ${Components.services()}
      ${Components.contact()}
      ${Components.footer()}
      ${Components.floatingCart()}
      ${Components.loginModal()}
      ${Components.userDashboard()}
      ${Components.whatsappButton()}
    `;
    
    app.insertAdjacentHTML('beforeend', appHTML);
    
    setTimeout(() => {
      App.initializeSystems();
    }, 500);
  },
  
  initializeSystems: () => {
    console.log('⚙️ Inicializando sistemas...');
    
    // Inicializar UserManager primero
    if (typeof UserManager !== 'undefined') {
      UserManager.init();
      console.log('👤 UserManager inicializado');
    }
    
    // Integrar con UserManager si existe
    App.integrateUserManager();
    
    // Inicializar carrito
    Cart.updateDisplay();
    
    // Configurar event listeners para formularios
    App.setupEventListeners();
    
    App.hideLoadingScreen();
  },
  
  integrateUserManager: () => {
    if (typeof UserManager !== 'undefined') {
      console.log('🔗 Integrando con UserManager...');
      
      // Actualizar UI si hay usuario logueado
      if (UserManager.isLoggedIn && UserManager.currentUser) {
        App.updateUserUI();
      }
      
      console.log('✅ UserManager integrado correctamente');
    } else {
      console.log('ℹ️ UserManager no encontrado - usando sistema básico');
    }
  },
  
  updateUserUI: () => {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userInitials = document.getElementById('userInitials');
    const userName = document.getElementById('userName');
    
    if (typeof UserManager !== 'undefined' && UserManager.isLoggedIn && UserManager.currentUser) {
      if (loginBtn) loginBtn.style.display = 'none';
      if (userProfile) userProfile.style.display = 'flex';
      
      if (userInitials) {
        userInitials.textContent = 
          UserManager.currentUser.firstName.charAt(0) + 
          UserManager.currentUser.lastName.charAt(0);
      }
      
      if (userName) {
        userName.textContent = 
          `${UserManager.currentUser.firstName} ${UserManager.currentUser.lastName}`;
      }
    }
  },
  
  setupEventListeners: () => {
    setTimeout(() => {
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      
      if (loginForm) {
        // Agregar validación en tiempo real
        const emailField = document.getElementById('loginEmail');
        const passwordField = document.getElementById('loginPassword');
        
        if (emailField) {
          emailField.addEventListener('blur', () => {
            const validation = UserValidation.validateEmail(emailField.value);
            FormFeedback.showFieldStatus('loginEmail', validation);
          });
          
          emailField.addEventListener('focus', () => {
            FormFeedback.clearFieldStatus('loginEmail');
          });
        }
        
        if (passwordField) {
          passwordField.addEventListener('blur', () => {
            if (passwordField.value) {
              const validation = UserValidation.validatePassword(passwordField.value);
              FormFeedback.showFieldStatus('loginPassword', validation);
            }
          });
          
          passwordField.addEventListener('focus', () => {
            FormFeedback.clearFieldStatus('loginPassword');
          });
        }
        
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const email = emailField?.value || '';
          const password = passwordField?.value || '';
          
          // Validar antes de procesar
          const emailValidation = UserValidation.validateEmail(email);
          const passwordValidation = UserValidation.validatePassword(password);
          
          if (!emailValidation.isValid) {
            FormFeedback.showFieldStatus('loginEmail', emailValidation);
            showNotification('❌ ' + emailValidation.message);
            return;
          }
          
          if (!passwordValidation.isValid) {
            FormFeedback.showFieldStatus('loginPassword', passwordValidation);
            showNotification('❌ ' + passwordValidation.message);
            return;
          }
          
          // Proceso original mantenido
          if (typeof UserManager !== 'undefined') {
            const result = UserManager.login(email, password);
            if (result.success) {
              closeAuthModal();
              App.updateUserUI();
              showNotification('✅ ¡Bienvenido de vuelta!');
            } else {
              showNotification('❌ ' + (result.message || 'Credenciales incorrectas'));
            }
          } else {
            showNotification('🔐 Login demo - UserManager no encontrado');
          }
        });
      }
      
      if (registerForm) {
        // Agregar validación en tiempo real para registro
        const fields = ['registerFirstName', 'registerLastName', 'registerEmail', 'registerPassword'];
        
        fields.forEach(fieldId => {
          const field = document.getElementById(fieldId);
          if (field) {
            field.addEventListener('blur', () => {
              if (field.value) {
                let validation;
                
                if (fieldId.includes('Email')) {
                  validation = UserValidation.validateEmail(field.value);
                } else if (fieldId.includes('Password')) {
                  validation = UserValidation.validatePassword(field.value);
                } else if (fieldId.includes('Name')) {
                  validation = UserValidation.validateName(field.value);
                }
                
                if (validation) {
                  FormFeedback.showFieldStatus(fieldId, validation);
                }
              }
            });
            
            field.addEventListener('focus', () => {
              FormFeedback.clearFieldStatus(fieldId);
            });
          }
        });
        
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const userData = {
            firstName: document.getElementById('registerFirstName')?.value || '',
            lastName: document.getElementById('registerLastName')?.value || '',
            email: document.getElementById('registerEmail')?.value || '',
            password: document.getElementById('registerPassword')?.value || ''
          };
          
          const confirmPassword = document.getElementById('confirmPassword')?.value || '';
          
          // Validaciones mejoradas
          const firstNameValidation = UserValidation.validateName(userData.firstName);
          const lastNameValidation = UserValidation.validateName(userData.lastName);
          const emailValidation = UserValidation.validateEmail(userData.email);
          const passwordValidation = UserValidation.validatePassword(userData.password);
          
          // Verificar todas las validaciones
          if (!firstNameValidation.isValid) {
            FormFeedback.showFieldStatus('registerFirstName', firstNameValidation);
            showNotification('❌ ' + firstNameValidation.message);
            return;
          }
          
          if (!lastNameValidation.isValid) {
            FormFeedback.showFieldStatus('registerLastName', lastNameValidation);
            showNotification('❌ ' + lastNameValidation.message);
            return;
          }
          
          if (!emailValidation.isValid) {
            FormFeedback.showFieldStatus('registerEmail', emailValidation);
            showNotification('❌ ' + emailValidation.message);
            return;
          }
          
          if (!passwordValidation.isValid) {
            FormFeedback.showFieldStatus('registerPassword', passwordValidation);
            showNotification('❌ ' + passwordValidation.message);
            return;
          }
          
          if (userData.password !== confirmPassword) {
            showNotification('❌ Las contraseñas no coinciden');
            return;
          }
          
          // Proceso original mantenido
          if (typeof UserManager !== 'undefined') {
            const result = UserManager.register(userData);
            if (result.success) {
              closeAuthModal();
              App.updateUserUI();
              showNotification('✅ ¡Cuenta creada exitosamente!');
            } else {
              showNotification('❌ ' + (result.message || 'Error al crear cuenta'));
            }
          } else {
            showNotification('✨ Registro demo - UserManager no encontrado');
          }
        });
      }
    }, 1000);
  },
  
  hideLoadingScreen: () => {
    const loading = document.getElementById('loading');
    
    if (loading) {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        loading.style.display = 'none';
        console.log('🎉 ¡Aplicación cargada exitosamente!');
        showNotification('🎉 ¡SMOKING BLACK recuperado exitosamente!');
      }, 500);
    }
  }
};

// 🚀 AUTO-INICIALIZAR
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

console.log(`
🎉 === SMOKING BLACK RECUPERADO ===

✅ ESTADO: Aplicación funcionando
🛒 CARRITO: Sistema completo
👤 USUARIOS: Integrado con UserManager (si existe)
📱 RESPONSIVE: Optimizado para móviles
🎨 DISEÑO: Elegante y profesional

🎮 FUNCIONES DISPONIBLES:
• addToCart(id, type, price)
• showLoginModal()
• scrollToSection(id)
• toggleCart()

🔗 INTEGRACIÓN:
• UserManager: ${typeof UserManager !== 'undefined' ? 'Conectado' : 'No encontrado'}
• Usuarios: ${typeof UserManager !== 'undefined' ? UserManager.users.length : 0}
`);

// 🤖 SISTEMA DE MEDICIÓN AI COMPLETO
const AIMeasurement = {
  stream: null,
  isActive: false,
  measurements: {},
  
  // 📸 INICIALIZAR CÁMARA
  initCamera: async () => {
    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      };
      
     
      AIMeasurement.stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.getElementById('measurementVideo');
      
      if (video) {
        video.srcObject = AIMeasurement.stream;
        video.play();
      }
      AIMeasurement.isActive = true;
      document.getElementById('cameraSection').style.display = 'block';
      document.getElementById('startMeasurementBtn').style.display = 'none';
    } catch (error) {
      showNotification('❌ Error al acceder a la cámara');
      console.error(error);
    }
  },
  
  // 🎯 MOSTRAR RESULTADOS
  displayResults: (measurements) => {
    const resultsDiv = document.getElementById('measurementResults');
    if (!resultsDiv) return;
    
    resultsDiv.innerHTML = `
      <div style="background: rgba(255, 215, 0, 0.1); padding: 1.5rem; border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.3);">
        <h4 style="color: #ffd700; margin-bottom: 1rem;">👤 Medidas Corporales</h4>
        <div style="text-align: left;">
          <p><strong>Altura:</strong> ${measurements.altura} cm</p>
          <p><strong>Hombros:</strong> ${measurements.hombros} cm</p>
          <p><strong>Pecho:</strong> ${measurements.pecho} cm</p>
          <p><strong>Cintura:</strong> ${measurements.cintura} cm</p>
        </div>
      </div>
      
      <div style="background: rgba(255, 215, 0, 0.1); padding: 1.5rem; border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.3);">
        <h4 style="color: #ffd700; margin-bottom: 1rem;">📏 Medidas Específicas</h4>
        <div style="text-align: left;">
          <p><strong>Cadera:</strong> ${measurements.cadera} cm</p>
          <p><strong>Mangas:</strong> ${measurements.mangas} cm</p>
          <p><strong>Entrepierna:</strong> ${measurements.entrepierna} cm</p>
          <p><strong>Cuello:</strong> ${measurements.cuello} cm</p>
        </div>
      </div>
      
      <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 1.5rem; border-radius: 15px; color: white; grid-column: 1/-1;">
        <h4 style="margin-bottom: 1rem;">🎯 Talla Recomendada</h4>
        <div style="font-size: 2rem; font-weight: 900; margin: 1rem 0;">
          ${measurements.tallaRecomendada}
        </div>
        <p style="opacity: 0.9;">Basado en tus medidas corporales</p>
      </div>
    `;
    
    AIMeasurement.measurements = measurements;
  },
  
  // 💾 GUARDAR MEDIDAS EN PERFIL DEL USUARIO
  saveMeasurements: () => {
    if (typeof UserManager !== 'undefined' && UserManager.isLoggedIn) {
      // Guardar en el perfil del usuario
      UserManager.currentUser.profile.measurements = AIMeasurement.measurements;
      UserManager.currentUser.profile.preferredSize = AIMeasurement.measurements.tallaRecomendada;
      
      // Actualizar en localStorage
      localStorage.setItem('smokingBlackCurrentUser', JSON.stringify(UserManager.currentUser));
      
      const users = UserManager.users.map(user => 
        user.id === UserManager.currentUser.id ? UserManager.currentUser : user
      );
      localStorage.setItem('smokingBlackUsers', JSON.stringify(users));
      
      showNotification('💾 ¡Medidas guardadas en tu perfil!');
    } else {
      // Guardar temporalmente en localStorage
      localStorage.setItem('tempMeasurements', JSON.stringify(AIMeasurement.measurements));
      showNotification('💾 ¡Medidas guardadas temporalmente!');
    }
  },
  
  // 🎯 RECOMENDAR SMOKINGS BASADO EN MEDIDAS
  recommendSmokings: () => {
    const talla = AIMeasurement.measurements.tallaRecomendada;
    const { pecho, altura } = AIMeasurement.measurements;
    
    let recommendations = [];
    
    // Lógica de recomendación
    if (talla === 'S' || talla === 'M') {
      recommendations = ['smoking-clasico', 'smoking-ejecutivo'];
    } else if (talla === 'L') {
      recommendations = ['smoking-premium', 'smoking-ejecutivo', 'smoking-vintage'];
    } else {
      recommendations = ['smoking-gala', 'smoking-royal', 'smoking-premium'];
    }
    
    // Recomendación especial para personas altas
    if (altura > 180) {
      recommendations.push('smoking-royal');
    }
    
    // Mostrar recomendaciones
    const message = `🎯 Smokings recomendados para talla ${talla}: ${recommendations.join(', ')}`;
    showNotification(message);
    
    // Scroll al catálogo
    setTimeout(() => {
      scrollToSection('catalogo');
    }, 2000);
  },
  
  // 🔄 REINICIAR PROCESO
  reset: () => {
    document.getElementById('cameraSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('startMeasurementBtn').style.display = 'block';
    
    if (AIMeasurement.stream) {
      AIMeasurement.stream.getTracks().forEach(track => track.stop());
      AIMeasurement.stream = null;
    }
    
    AIMeasurement.isActive = false;
    AIMeasurement.measurements = {};
  }
};

// 🖼️ SISTEMA DE GALERÍA DE IMÁGENES MÚLTIPLES
const ImageGallery = {
  
  // 📊 DATOS DE IMÁGENES PARA CADA PRODUCTO
  productImages: {
    'smoking-gala': [
      'imagen/1002.jpg',
      'imagen/1003.jpg',
      'imagen/1004.jpg',
      'imagen/1005.jpg',
      'imagen/1006.jpg',
      'imagen/1007.jpg', 
      'imagen/21.jpg',
      'imagen/60.jpg',
      'imagen/61.jpg',
      'imagen/62.jpg',
      'imagen/63.jpg',
      'imagen/64.jpg',
      'imagen/65.jpg',
      'imagen/66.jpg',
      
    ],
  },
  
  // 📊 DESCRIPCIONES DE IMÁGENES
  
  
  currentImageIndex: {},
  
  // 🎨 CREAR GALERÍA PARA UN PRODUCTO
  createGallery: (productId) => {
    const images = ImageGallery.productImages[productId] || ['imagen/placeholder.jpg'];
    ImageGallery.currentImageIndex[productId] = 0;
    
    return `
      <div class="product-image-gallery" data-product="${productId}">
        <div class="product-image-main" onclick="ImageGallery.openModal('${productId}')">
          <img src="${images[0]}" alt="Imagen principal" 
               onerror="this.src='imagen/placeholder.jpg'; this.nextElementSibling.style.display='flex';">
          <div style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; font-size: 3rem; background: linear-gradient(135deg, #e9ecef, #dee2e6); border-radius: 15px; position: absolute; top: 0; left: 0;">👔</div>
          <div class="zoom-indicator">🔍</div>
        </div>
        
        <!-- Controles de navegación -->
        <button class="image-nav prev" onclick="ImageGallery.prevImage('${productId}', event)">‹</button>
        <button class="image-nav next" onclick="ImageGallery.nextImage('${productId}', event)">›</button>
      </div>
      
      <!-- Thumbnails -->
      <div class="image-thumbnails">
        ${images.map((img, index) => `
          <div class="thumbnail ${index === 0 ? 'active' : ''}" 
               onclick="ImageGallery.setImage('${productId}', ${index})"
               data-index="${index}">
            <img src="${img}" alt="Miniatura ${index + 1}"
                 onerror="this.src='imagen/placeholder.jpg';">
          </div>
        `).join('')}
      </div>
    `;
  },
  
  // ⬅️ IMAGEN ANTERIOR
  prevImage: (productId, event) => {
    event.stopPropagation();
    const images = ImageGallery.productImages[productId];
    if (!images) return;
    
    ImageGallery.currentImageIndex[productId] = 
      (ImageGallery.currentImageIndex[productId] - 1 + images.length) % images.length;
    
    ImageGallery.updateMainImage(productId);
  },
  
  // ➡️ IMAGEN SIGUIENTE
  nextImage: (productId, event) => {
    event.stopPropagation();
    const images = ImageGallery.productImages[productId];
    if (!images) return;
    
    ImageGallery.currentImageIndex[productId] = 
      (ImageGallery.currentImageIndex[productId] + 1) % images.length;
    
    ImageGallery.updateMainImage(productId);
  },
  
  // 🎯 ESTABLECER IMAGEN ESPECÍFICA
  setImage: (productId, index) => {
    ImageGallery.currentImageIndex[productId] = index;
    ImageGallery.updateMainImage(productId);
    ImageGallery.updateThumbnails(productId);
  },
  
  // 🔄 ACTUALIZAR IMAGEN PRINCIPAL
  updateMainImage: (productId) => {
    const gallery = document.querySelector(`[data-product="${productId}"]`);
    if (!gallery) return;
    
    const mainImg = gallery.querySelector('.product-image-main img');
    const images = ImageGallery.productImages[productId];
    const currentIndex = ImageGallery.currentImageIndex[productId];
    
    if (mainImg && images) {
      mainImg.src = images[currentIndex];
      ImageGallery.updateThumbnails(productId);
    }
  },
  
  // 📷 ACTUALIZAR THUMBNAILS
  updateThumbnails: (productId) => {
    const gallery = document.querySelector(`[data-product="${productId}"]`);
    if (!gallery) return;
    
    const thumbnails = gallery.parentElement.querySelectorAll('.thumbnail');
    const currentIndex = ImageGallery.currentImageIndex[productId];
    
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentIndex);
    });
  },
  
  // 🔍 ABRIR MODAL DE ZOOM
  openModal: (productId) => {
    const images = ImageGallery.productImages[productId];
    if (!images) return;
    const currentIndex = ImageGallery.currentImageIndex[productId] || 0;
    let modal = document.getElementById('imageModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'imageModal';
      modal.className = 'image-modal';
      document.body.appendChild(modal);
    }
    // Obtener la descripción de la imagen actual
    const imgSrc = images[currentIndex];
    const description = ImageGallery.imageDescriptions[imgSrc] || 'Sin descripción disponible.';
    modal.innerHTML = `
      <div class="modal-image-container" style="display: flex; gap: 2rem; align-items: flex-start;">
        <div style="flex: 1; position: relative;">
          <button class="modal-close" onclick="ImageGallery.closeModal()">✕</button>
          <img class="modal-main-image" src="${imgSrc}" alt="Imagen ampliada"
               onerror="this.src='imagen/placeholder.jpg';">
          <button class="modal-nav prev" onclick="ImageGallery.modalPrev('${productId}')">‹</button>
          <button class="modal-nav next" onclick="ImageGallery.modalNext('${productId}')">›</button>
        </div>
        <div class="modal-description" style="flex: 1; background: rgba(255,255,255,0.35); border-radius: 15px; padding: 1.5rem; max-height: 400px; overflow-y: auto; color: #222; font-size: 1.1rem; font-weight: 500; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
          ${description}
        </div>
      </div>
      <div class="modal-thumbnails">
        ${images.map((img, index) => `
          <div class="modal-thumbnail ${index === currentIndex ? 'active' : ''}" 
               onclick="ImageGallery.setModalImage('${productId}', ${index})"
               data-index="${index}">
            <img src="${img}" alt="Miniatura ${index + 1}"
                 onerror="this.src='imagen/placeholder.jpg'; this.classList.add('error');">
          </div>
        `).join('')}
      </div>
    `;
    modal.classList.add('active');
    ImageGallery.currentModalProduct = productId;
    document.addEventListener('keydown', ImageGallery.handleKeydown);
  },
  
  // ❌ CERRAR MODAL
  closeModal: () => {
    const modal = document.getElementById('imageModal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
    
    document.removeEventListener('keydown', ImageGallery.handleKeydown);
  },
  
  // ⬅️ NAVEGACIÓN EN MODAL - ANTERIOR
  modalPrev: (productId) => {
    const images = ImageGallery.productImages[productId];
    if (!images) return;
    
    ImageGallery.currentImageIndex[productId] = 
      (ImageGallery.currentImageIndex[productId] - 1 + images.length) % images.length;
    
    ImageGallery.updateModalImage(productId);
  },
  
  // ➡️ NAVEGACIÓN EN MODAL - SIGUIENTE
  modalNext: (productId) => {
    const images = ImageGallery.productImages[productId];
    if (!images) return;
    
    ImageGallery.currentImageIndex[productId] = 
      (ImageGallery.currentImageIndex[productId] + 1) % images.length;
    
    ImageGallery.updateModalImage(productId);
  },
  
  // 🎯 ESTABLECER IMAGEN EN MODAL
  setModalImage: (productId, index) => {
    ImageGallery.currentImageIndex[productId] = index;
    ImageGallery.updateModalImage(productId);
  },
  
  // 🔄 ACTUALIZAR IMAGEN EN MODAL
  updateModalImage: (productId) => {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    const images = ImageGallery.productImages[productId];
    const currentIndex = ImageGallery.currentImageIndex[productId];
    const mainImg = modal.querySelector('.modal-main-image');
    const thumbnails = modal.querySelectorAll('.modal-thumbnail');
    // Actualizar imagen principal
    if (mainImg && images) {
      mainImg.src = images[currentIndex];
      thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
      });
    }
    // Actualizar descripción
    const imgSrc = images[currentIndex];
    const description = ImageGallery.imageDescriptions[imgSrc] || 'Sin descripción disponible.';
    const descDiv = modal.querySelector('.modal-description');
    if (descDiv) {
      descDiv.innerHTML = description;
    }
  },
  
  // ⌨️ MANEJAR TECLAS
  handleKeydown: (event) => {
    switch(event.key) {
      case 'Escape':
        ImageGallery.closeModal();
        break;
      case 'ArrowLeft':
        if (ImageGallery.currentModalProduct) {
          ImageGallery.modalPrev(ImageGallery.currentModalProduct);
        }
        break;
      case 'ArrowRight':
        if (ImageGallery.currentModalProduct) {
          ImageGallery.modalNext(ImageGallery.currentModalProduct);
        }
        break;
    }
  }
};

// Carrusel JS
function moveCarousel(direction) {
  const track = document.querySelector('.carousel-track');
  if (!track) return;
  const cardWidth = track.querySelector('.product-card')?.offsetWidth || 320;
  const scrollAmount = cardWidth + 24; // 24px gap
  track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });

}
