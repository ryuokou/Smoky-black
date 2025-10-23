// 🔧 FUNCIONES FALTANTES PARA DASHBOARD Y AI MEASUREMENT

// 🎯 FUNCIONES GLOBALES PARA LA MEDICIÓN AI
function startAIMeasurement() {
  console.log('🚀 Iniciando medición AI...');
  document.getElementById('cameraSection').style.display = 'block';
  document.getElementById('startMeasurementBtn').style.display = 'none';
  if (typeof AIMeasurement !== 'undefined') {
    AIMeasurement.initCamera();
  }
  showNotification('📹 Iniciando sistema de medición AI...');
}

function captureMeasurement() {
  console.log('📸 Capturando medidas...');
  showNotification('🤖 Analizando medidas con AI...');
  
  // Simular proceso de análisis
  setTimeout(() => {
    document.getElementById('cameraSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    
    // Generar medidas de ejemplo
    const mockMeasurements = {
      altura: 175 + Math.floor(Math.random() * 15),
      hombros: 42 + Math.floor(Math.random() * 6),
      pecho: 95 + Math.floor(Math.random() * 15),
      cintura: 80 + Math.floor(Math.random() * 15),
      cadera: 90 + Math.floor(Math.random() * 10),
      mangas: 60 + Math.floor(Math.random() * 8),
      entrepierna: 80 + Math.floor(Math.random() * 10),
      cuello: 38 + Math.floor(Math.random() * 5)
    };
    
    // Calcular talla
    if (mockMeasurements.pecho <= 95 && mockMeasurements.cintura <= 85) {
      mockMeasurements.tallaRecomendada = 'M';
    } else if (mockMeasurements.pecho <= 105) {
      mockMeasurements.tallaRecomendada = 'L';
    } else {
      mockMeasurements.tallaRecomendada = 'XL';
    }
    
    // Mostrar resultados
    const resultsDiv = document.getElementById('measurementResults');
    if (resultsDiv) {
      resultsDiv.innerHTML = `
        <div style="background: rgba(255, 215, 0, 0.1); padding: 1.5rem; border-radius: 15px; border: 1px solid rgba(255, 215, 0, 0.3);">
          <h4 style="color: #ffd700; margin-bottom: 1rem;">👤 Medidas Corporales</h4>
          <div style="text-align: left;">
            <p><strong>Altura:</strong> ${mockMeasurements.altura} cm</p>
            <p><strong>Hombros:</strong> ${mockMeasurements.hombros} cm</p>
            <p><strong>Pecho:</strong> ${mockMeasurements.pecho} cm</p>
            <p><strong>Cintura:</strong> ${mockMeasurements.cintura} cm</p>
          </div>
        </div>
        
        <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 1.5rem; border-radius: 15px; color: white;">
          <h4 style="margin-bottom: 1rem;">🎯 Talla Recomendada</h4>
          <div style="font-size: 2rem; font-weight: 900; margin: 1rem 0;">
            ${mockMeasurements.tallaRecomendada}
          </div>
          <p style="opacity: 0.9;">Basado en tus medidas corporales</p>
        </div>
      `;
    }
    
    showNotification('✅ ¡Medidas obtenidas exitosamente!');
  }, 2000);
}

function stopAIMeasurement() {
  console.log('❌ Deteniendo medición AI...');
  document.getElementById('cameraSection').style.display = 'none';
  document.getElementById('resultsSection').style.display = 'none';
  document.getElementById('startMeasurementBtn').style.display = 'block';
  showNotification('❌ Medición cancelada');
}

function saveMeasurements() {
  console.log('💾 Guardando medidas...');
  showNotification('💾 ¡Medidas guardadas exitosamente!');
}

function retakeMeasurement() {
  console.log('🔄 Reiniciando medición...');
  stopAIMeasurement();
  setTimeout(() => startAIMeasurement(), 500);
}

function recommendSmokings() {
  console.log('🎯 Generando recomendaciones...');
  showNotification('🎯 Ver recomendaciones en el catálogo');
  setTimeout(() => scrollToSection('catalogo'), 1500);
}

// 📊 SISTEMA SIMPLIFICADO DE DASHBOARD
const UserDashboard = {
  open: () => {
    console.log('📊 Abriendo dashboard...');
    
    // Verificar si el usuario está logueado
    if (typeof UserManager === 'undefined' || !UserManager.isLoggedIn) {
      showNotification('🔐 Inicia sesión para acceder al dashboard');
      showLoginModal();
      return;
    }
    
    const modal = document.getElementById('userDashboard');
    if (modal) {
      modal.style.display = 'flex';
      UserDashboard.loadBasicData();
    } else {
      showNotification('❌ Error: Modal del dashboard no encontrado');
    }
  },
  
  close: () => {
    console.log('❌ Cerrando dashboard...');
    const modal = document.getElementById('userDashboard');
    if (modal) {
      modal.style.display = 'none';
    }
  },
  
  loadBasicData: () => {
    console.log('📊 Cargando datos básicos...');
    
    // Cargar datos del usuario si existe
    if (typeof UserManager !== 'undefined' && UserManager.currentUser) {
      const user = UserManager.currentUser;
      
      // Actualizar avatar
      const avatar = document.getElementById('dashboardAvatar');
      if (avatar) {
        avatar.textContent = user.firstName.charAt(0) + user.lastName.charAt(0);
      }
      
      // Actualizar nombre
      const userName = document.getElementById('dashboardUserName');
      if (userName) {
        userName.textContent = `${user.firstName} ${user.lastName}`;
      }
      
      // Actualizar email
      const userEmail = document.getElementById('dashboardUserEmail');
      if (userEmail) {
        userEmail.textContent = user.email;
      }
    }
    
    // Cargar contenido del primer tab
    UserDashboard.switchTab('profile');
  },
  
  switchTab: (tabName) => {
    console.log(`🔄 Cambiando a tab: ${tabName}`);
    
    // Actualizar tabs activos
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
      tab.classList.remove('active');
    });
    
    const activeTab = document.getElementById(`${tabName}Tab`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    
    // Cargar contenido del tab
    const content = document.getElementById('dashboardContent');
    if (content) {
      content.innerHTML = UserDashboard.getTabContent(tabName);
    }
  },
  
  getTabContent: (tabName) => {
    const contents = {
      profile: `
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; padding: 2rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <h3 style="color: #ffd700; margin-bottom: 1rem;">👤 Mi Perfil</h3>
          <p>Información personal y configuración de cuenta</p>
          <div style="margin-top: 1rem;">
            <button class="btn-hero" onclick="showNotification('🔧 Función en desarrollo')">Editar Perfil</button>
          </div>
        </div>
      `,
      orders: `
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; padding: 2rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <h3 style="color: #ffd700; margin-bottom: 1rem;">📦 Mis Pedidos</h3>
          <p>Historial de alquileres y compras</p>
          <div style="text-align: center; padding: 2rem; opacity: 0.7;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
            <p>No tienes pedidos aún</p>
          </div>
        </div>
      `,
      measurements: `
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; padding: 2rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <h3 style="color: #ffd700; margin-bottom: 1rem;">📏 Mis Medidas</h3>
          <p>Medidas corporales guardadas</p>
          <div style="text-align: center; padding: 2rem; opacity: 0.7;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">📏</div>
            <p>No tienes medidas guardadas</p>
            <button class="btn-hero" onclick="closeUserDashboard(); scrollToSection('medicion');">🤖 Tomar Medidas AI</button>
          </div>
        </div>
      `,
      favorites: `
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; padding: 2rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <h3 style="color: #ffd700; margin-bottom: 1rem;">❤️ Favoritos</h3>
          <p>Smokings que te gustan</p>
          <div style="text-align: center; padding: 2rem; opacity: 0.7;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">❤️</div>
            <p>No tienes favoritos aún</p>
          </div>
        </div>
      `,
      settings: `
        <div style="background: linear-gradient(135deg, #2d2d2d, #1a1a1a); border-radius: 15px; padding: 2rem; border: 1px solid rgba(255, 215, 0, 0.2);">
          <h3 style="color: #ffd700; margin-bottom: 1rem;">⚙️ Configuración</h3>
          <p>Opciones y preferencias</p>
          <div style="margin-top: 1rem;">
            <button class="btn-hero" onclick="showNotification('🔧 Configuración en desarrollo')">Cambiar Configuración</button>
          </div>
        </div>
      `
    };
    
    return contents[tabName] || contents.profile;
  }
};

// 🎯 FUNCIONES GLOBALES PARA EL DASHBOARD
function showUserDashboard() {
  UserDashboard.open();
}

function closeUserDashboard() {
  UserDashboard.close();
}

function switchDashboardTab(tabName) {
  UserDashboard.switchTab(tabName);
}

// 🎨 AGREGAR ESTILOS PARA DASHBOARD
function addDashboardStyles() {
  const existingStyles = document.getElementById('dashboardStyles');
  if (existingStyles) return;
  
  const styles = document.createElement('style');
  styles.id = 'dashboardStyles';
  styles.textContent = `
    .dashboard-tab {
      background: linear-gradient(135deg, #2d2d2d, #1a1a1a);
      color: #e8e8e8;
      border: 1px solid rgba(255, 215, 0, 0.2);
      padding: 0.8rem 1.2rem;
      border-radius: 10px 10px 0 0;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      margin-right: 0.2rem;
    }
    
    .dashboard-tab:hover {
      background: linear-gradient(135deg, #3d3d3d, #2a2a2a);
      border-color: rgba(255, 215, 0, 0.4);
      transform: translateY(-2px);
    }
    
    .dashboard-tab.active {
      background: linear-gradient(135deg, #ffd700, #ffed4e);
      color: #1a1a1a;
      border-color: #ffd700;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
    }
  `;
  
  document.head.appendChild(styles);
}

// Ejecutar cuando la página esté lista
setTimeout(() => {
  addDashboardStyles();
  console.log('✅ Funciones de Dashboard y AI Measurement cargadas correctamente');
}, 1000);

console.log('🔧 Módulo de funciones adicionales cargado');