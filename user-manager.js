// ============================================
// 👥 SISTEMA AVANZADO DE USUARIOS - SMOKING BLACK
// ============================================

const UserManager = {
  
  // 💾 BASE DE DATOS LOCAL DE USUARIOS
  users: JSON.parse(localStorage.getItem('smokingUsers') || '[]'),
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  
  // 🔧 INICIALIZAR SISTEMA
  init: () => {
    console.log('👥 Inicializando sistema de usuarios...');
    
    // Crear usuarios demo si no existen
    if (UserManager.users.length === 0) {
      UserManager.createDemoUsers();
    }
    
    // Restaurar sesión si existe
    if (UserManager.isLoggedIn && UserManager.currentUser) {
      UserManager.updateUI();
      console.log(`✅ Sesión restaurada: ${UserManager.currentUser.firstName}`);
    }
    
    // Configurar event listeners del modal
    UserManager.setupModalEvents();
    
    console.log(`📊 Total usuarios registrados: ${UserManager.users.length}`);
  },
  
  // 🎨 CONFIGURAR EVENTOS DEL MODAL
  setupModalEvents: () => {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', UserManager.setupModalEvents);
      return;
    }
    
    // Event listeners para los formularios del modal (cuando se creen)
    setTimeout(() => {
      UserManager.attachModalListeners();
    }, 2000);
  },
  
  // 🔗 CONECTAR LISTENERS DEL MODAL
  attachModalListeners: () => {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        
        if (email && password) {
          const result = UserManager.login(email, password);
          if (result.success) {
            UserManager.closeModal();
          }
        }
      });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userData = {
          firstName: document.getElementById('registerFirstName')?.value,
          lastName: document.getElementById('registerLastName')?.value,
          email: document.getElementById('registerEmail')?.value,
          phone: document.getElementById('registerPhone')?.value,
          password: document.getElementById('registerPassword')?.value,
          birthDate: document.getElementById('birthDate')?.value
        };
        
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        
        if (userData.password !== confirmPassword) {
          Systems.notification.show('❌ Las contraseñas no coinciden');
          return;
        }
        
        const result = UserManager.register(userData);
        if (result.success) {
          UserManager.closeModal();
        }
      });
    }
    
    // Forgot password form
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('forgotEmail')?.value;
        
        if (email) {
          Systems.notification.show('📧 Enlace de recuperación enviado a tu email');
          setTimeout(() => {
            UserManager.switchToLogin();
          }, 2000);
        }
      });
    }
  },
  
  // 🔐 MOSTRAR MODAL DE LOGIN
  showLoginModal: () => {
    // Crear modal si no existe
    if (!document.getElementById('authModal')) {
      UserManager.createLoginModal();
    }
    
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.style.display = 'flex';
      UserManager.switchToLogin();
    }
  },
  
  // 🏗️ CREAR MODAL DE LOGIN
  createLoginModal: () => {
    const modalHTML = `
      <div id="authModal" class="auth-modal" style="display: none;">
        <div class="auth-modal-content">
          <div class="auth-header">
            <h2 id="authTitle">🔐 Iniciar Sesión</h2>
            <button class="close-modal" onclick="UserManager.closeModal()">✕</button>
          </div>
          
          <!-- Login Form -->
          <form id="loginForm" class="auth-form">
            <div class="form-group">
              <label for="loginEmail">Email:</label>
              <input type="email" id="loginEmail" required placeholder="tu@email.com">
            </div>
            <div class="form-group">
              <label for="loginPassword">Contraseña:</label>
              <div class="password-input">
                <input type="password" id="loginPassword" required placeholder="Tu contraseña">
                <button type="button" class="toggle-password" onclick="UserManager.togglePassword('loginPassword')">👁️</button>
              </div>
            </div>
            <button type="submit" class="btn-primary">🔐 Iniciar Sesión</button>
            
            <div class="auth-links">
              <button type="button" class="link-btn" onclick="UserManager.switchToRegister()">✨ Crear cuenta nueva</button>
              <button type="button" class="link-btn" onclick="UserManager.showForgotPassword()">🔑 ¿Olvidaste tu contraseña?</button>
            </div>
            
            <div class="social-login">
              <p>O inicia sesión con:</p>
              <button type="button" class="btn-google" onclick="UserManager.loginWithGoogle()">🔍 Google</button>
              <button type="button" class="btn-facebook" onclick="UserManager.loginWithFacebook()">📘 Facebook</button>
            </div>
          </form>
          
          <!-- Register Form -->
          <form id="registerForm" class="auth-form" style="display: none;">
            <div class="form-row">
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
              <label for="registerPhone">Teléfono:</label>
              <input type="tel" id="registerPhone" placeholder="+52 33 1234 5678">
            </div>
            <div class="form-group">
              <label for="registerPassword">Contraseña:</label>
              <div class="password-input">
                <input type="password" id="registerPassword" required placeholder="Mínimo 6 caracteres">
                <button type="button" class="toggle-password" onclick="UserManager.togglePassword('registerPassword')">👁️</button>
              </div>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirmar Contraseña:</label>
              <div class="password-input">
                <input type="password" id="confirmPassword" required placeholder="Repite tu contraseña">
                <button type="button" class="toggle-password" onclick="UserManager.togglePassword('confirmPassword')">👁️</button>
              </div>
            </div>
            <div class="form-group">
              <label for="birthDate">Fecha de Nacimiento:</label>
              <input type="date" id="birthDate">
            </div>
            <button type="submit" class="btn-primary">✨ Crear Cuenta</button>
            
            <div class="auth-links">
              <button type="button" class="link-btn" onclick="UserManager.switchToLogin()">🔐 Ya tengo cuenta</button>
            </div>
          </form>
          
          <!-- Forgot Password Form -->
          <form id="forgotForm" class="auth-form" style="display: none;">
            <div class="form-group">
              <label for="forgotEmail">Email:</label>
              <input type="email" id="forgotEmail" required placeholder="tu@email.com">
            </div>
            <button type="submit" class="btn-primary">📧 Enviar Enlace</button>
            
            <div class="auth-links">
              <button type="button" class="link-btn" onclick="UserManager.switchToLogin()">🔐 Volver al login</button>
            </div>
          </form>
        </div>
      </div>
    `;
    
    // Agregar al body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Agregar estilos CSS
    UserManager.addModalStyles();
    
    // Configurar event listeners
    setTimeout(() => {
      UserManager.attachModalListeners();
    }, 100);
  },
  
  // 🎨 AGREGAR ESTILOS DEL MODAL
  addModalStyles: () => {
    if (document.getElementById('authModalStyles')) return;
    
    const styles = `
      <style id="authModalStyles">
        .auth-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          backdrop-filter: blur(5px);
        }
        
        .auth-modal-content {
          background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
          border-radius: 20px;
          padding: 2rem;
          width: 90%;
          max-width: 450px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 215, 0, 0.2);
        }
        
        .auth-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 215, 0, 0.2);
          padding-bottom: 1rem;
        }
        
        .auth-header h2 {
          color: #ffd700;
          margin: 0;
          font-family: 'Orbitron', sans-serif;
        }
        
        .close-modal {
          background: none;
          border: none;
          color: #ffd700;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .close-modal:hover {
          background: rgba(255, 215, 0, 0.1);
          transform: scale(1.1);
        }
        
        .auth-form {
          color: #ffffff;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #ffd700;
          font-weight: 600;
        }
        
        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid rgba(255, 215, 0, 0.3);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .form-group input:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
        }
        
        .password-input {
          position: relative;
        }
        
        .toggle-password {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #ffd700;
          cursor: pointer;
          padding: 0.2rem;
        }
        
        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #ffd700, #ffed4e);
          color: #1a1a1a;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }
        
        .auth-links {
          text-align: center;
          margin-top: 1.5rem;
        }
        
        .link-btn {
          background: none;
          border: none;
          color: #ffd700;
          cursor: pointer;
          text-decoration: underline;
          margin: 0.5rem;
          font-size: 0.9rem;
        }
        
        .link-btn:hover {
          color: #ffed4e;
        }
        
        .social-login {
          margin-top: 1.5rem;
          text-align: center;
          border-top: 1px solid rgba(255, 215, 0, 0.2);
          padding-top: 1rem;
        }
        
        .social-login p {
          color: #cccccc;
          margin-bottom: 1rem;
        }
        
        .btn-google, .btn-facebook {
          width: 45%;
          padding: 0.8rem;
          margin: 0.25rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
        
        .btn-google {
          background: #ffffff;
          color: #333333;
        }
        
        .btn-facebook {
          background: #1877f2;
          color: #ffffff;
        }
        
        @media (max-width: 768px) {
          .auth-modal-content {
            padding: 1.5rem;
            margin: 1rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
  },
  
  // 🚪 CERRAR MODAL
  closeModal: () => {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.style.display = 'none';
    }
  },
  
  // 🔄 CAMBIAR A LOGIN
  switchToLogin: () => {
    document.getElementById('authTitle').textContent = '🔐 Iniciar Sesión';
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'none';
  },
  
  // 🔄 CAMBIAR A REGISTRO
  switchToRegister: () => {
    document.getElementById('authTitle').textContent = '✨ Crear Cuenta';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('forgotForm').style.display = 'none';
  },
  
  // 🔄 MOSTRAR RECUPERAR CONTRASEÑA
  showForgotPassword: () => {
    document.getElementById('authTitle').textContent = '🔑 Recuperar Contraseña';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'block';
  },
  
  // 👁️ TOGGLE CONTRASEÑA
  togglePassword: (inputId) => {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling;
    
    if (input.type === 'password') {
      input.type = 'text';
      toggle.textContent = '🙈';
    } else {
      input.type = 'password';
      toggle.textContent = '👁️';
    }
  },
  
  // 🔍 LOGIN CON GOOGLE (SIMULADO)
  loginWithGoogle: () => {
    Systems.notification.show('🔍 Conectando con Google...');
    
    setTimeout(() => {
      const googleUser = {
        id: `user-google-${Date.now()}`,
        firstName: 'Usuario',
        lastName: 'Google',
        email: `usuario.google.${Date.now()}@gmail.com`,
        phone: '',
        createdAt: new Date().toISOString(),
        preferences: {
          size: 'M',
          style: 'Premium',
          notifications: true
        },
        purchases: [],
        measurements: []
      };
      
      UserManager.users.push(googleUser);
      UserManager.saveToStorage();
      
      UserManager.currentUser = googleUser;
      UserManager.isLoggedIn = true;
      UserManager.saveSession();
      UserManager.updateUI();
      UserManager.closeModal();
      
      Systems.notification.show('✅ Login con Google exitoso!');
    }, 2000);
  },
  
  // 📘 LOGIN CON FACEBOOK (SIMULADO)
  loginWithFacebook: () => {
    Systems.notification.show('📘 Conectando con Facebook...');
    setTimeout(() => {
      Systems.notification.show('❌ Servicio temporalmente no disponible');
    }, 2000);
  },
  
  // 👥 CREAR USUARIOS DEMO
  createDemoUsers: () => {
    const demoUsers = [
      {
        id: 'user-001',
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan@email.com',
        phone: '+52 33 1234 5678',
        password: 'password123',
        birthDate: '1990-05-15',
        createdAt: new Date().toISOString(),
        preferences: {
          size: 'L',
          style: 'Clásico',
          notifications: true
        },
        purchases: [],
        measurements: []
      },
      {
        id: 'user-002',
        firstName: 'Carlos',
        lastName: 'García',
        email: 'carlos@email.com',
        phone: '+52 33 2345 6789',
        password: 'password456',
        birthDate: '1985-08-22',
        createdAt: new Date().toISOString(),
        preferences: {
          size: 'XL',
          style: 'Premium',
          notifications: true
        },
        purchases: [],
        measurements: []
      },
      {
        id: 'user-003',
        firstName: 'Miguel',
        lastName: 'Rodríguez',
        email: 'miguel@email.com',
        phone: '+52 33 3456 7890',
        password: 'password789',
        birthDate: '1992-12-10',
        createdAt: new Date().toISOString(),
        preferences: {
          size: 'M',
          style: 'Ejecutivo',
          notifications: false
        },
        purchases: [],
        measurements: []
      }
    ];
    
    UserManager.users = demoUsers;
    UserManager.saveToStorage();
    console.log('👥 Usuarios demo creados:', demoUsers.length);
  },
  
  // 📝 REGISTRAR NUEVO USUARIO
  register: (userData) => {
    console.log('📝 Intentando registrar nuevo usuario:', userData.email);
    
    // Validar que el email no exista
    const existingUser = UserManager.users.find(u => u.email === userData.email);
    if (existingUser) {
      console.log('❌ Email ya registrado');
      Systems.notification.show('❌ Este email ya está registrado');
      return { success: false, error: 'Email ya existe' };
    }
    
    // Validar datos requeridos
    const requiredFields = ['firstName', 'lastName', 'email', 'password'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
      console.log('❌ Campos faltantes:', missingFields);
      Systems.notification.show(`❌ Faltan campos: ${missingFields.join(', ')}`);
      return { success: false, error: 'Campos faltantes' };
    }
    
    // Crear nuevo usuario
    const newUser = {
      id: `user-${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email.toLowerCase(),
      phone: userData.phone || '',
      password: userData.password, // En producción, hashear la contraseña
      birthDate: userData.birthDate || '',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {
        size: 'M',
        style: 'Clásico',
        notifications: true,
        language: 'es'
      },
      purchases: [],
      measurements: [],
      favorites: [],
      addresses: []
    };
    
    // Agregar a la base de datos
    UserManager.users.push(newUser);
    UserManager.saveToStorage();
    
    // Auto-login después del registro
    UserManager.currentUser = newUser;
    UserManager.isLoggedIn = true;
    UserManager.saveSession();
    UserManager.updateUI();
    
    console.log('✅ Usuario registrado exitosamente:', newUser.email);
    Systems.notification.show(`✅ ¡Bienvenido ${newUser.firstName}! Cuenta creada exitosamente`);
    
    return { success: true, user: newUser };
  },
  
  // 🔐 LOGIN DE USUARIO
  login: (email, password) => {
    console.log('🔐 Intentando login:', email);
    
    const user = UserManager.users.find(u => 
      u.email === email.toLowerCase() && u.password === password
    );
    
    if (!user) {
      console.log('❌ Credenciales incorrectas');
      Systems.notification.show('❌ Email o contraseña incorrectos');
      return { success: false, error: 'Credenciales incorrectas' };
    }
    
    // Actualizar último login
    user.lastLogin = new Date().toISOString();
    UserManager.saveToStorage();
    
    // Establecer sesión
    UserManager.currentUser = user;
    UserManager.isLoggedIn = true;
    UserManager.saveSession();
    UserManager.updateUI();
    
    console.log('✅ Login exitoso:', user.email);
    Systems.notification.show(`¡Bienvenido de vuelta ${user.firstName}! 🎉`);
    
    return { success: true, user: user };
  },
  
  // 🚪 LOGOUT DE USUARIO
  logout: () => {
    console.log('🚪 Cerrando sesión...');
    
    UserManager.currentUser = null;
    UserManager.isLoggedIn = false;
    UserManager.clearSession();
    UserManager.updateUI();
    
    console.log('✅ Sesión cerrada');
    Systems.notification.show('👋 Sesión cerrada exitosamente');
    
    return { success: true };
  },
  
  // 💾 GUARDAR EN STORAGE
  saveToStorage: () => {
    localStorage.setItem('smokingUsers', JSON.stringify(UserManager.users));
  },
  
  // 💾 GUARDAR SESIÓN
  saveSession: () => {
    localStorage.setItem('currentUser', JSON.stringify(UserManager.currentUser));
    localStorage.setItem('isLoggedIn', UserManager.isLoggedIn.toString());
  },
  
  // 🗑️ LIMPIAR SESIÓN
  clearSession: () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
  },
  
  // 🎨 ACTUALIZAR INTERFAZ
  updateUI: () => {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userInitials = document.getElementById('userInitials');
    const userName = document.getElementById('userName');
    
    if (UserManager.isLoggedIn && UserManager.currentUser) {
      // Mostrar perfil de usuario
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
    } else {
      // Mostrar botón de login
      if (loginBtn) loginBtn.style.display = 'flex';
      if (userProfile) userProfile.style.display = 'none';
    }
  },
  
  // 📊 OBTENER ESTADÍSTICAS DE USUARIOS
  getStats: () => {
    const stats = {
      totalUsers: UserManager.users.length,
      newThisMonth: UserManager.users.filter(u => {
        const created = new Date(u.createdAt);
        const thisMonth = new Date();
        return created.getMonth() === thisMonth.getMonth() && 
               created.getFullYear() === thisMonth.getFullYear();
      }).length,
      activeUsers: UserManager.users.filter(u => {
        const lastLogin = new Date(u.lastLogin || u.createdAt);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return lastLogin > weekAgo;
      }).length,
      preferredSizes: UserManager.getPreferredSizes(),
      averageAge: UserManager.getAverageAge()
    };
    
    console.log('📊 Estadísticas de usuarios:', stats);
    return stats;
  },
  
  // 📏 OBTENER TALLAS PREFERIDAS
  getPreferredSizes: () => {
    const sizeCount = UserManager.users.reduce((acc, user) => {
      const size = user.preferences?.size || 'M';
      acc[size] = (acc[size] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(sizeCount)
      .sort(([,a], [,b]) => b - a)
      .map(([size, count]) => ({ size, count }));
  },
  
  // 📅 OBTENER EDAD PROMEDIO
  getAverageAge: () => {
    const usersWithAge = UserManager.users.filter(u => u.birthDate);
    if (usersWithAge.length === 0) return 'N/A';
    
    const totalAge = usersWithAge.reduce((sum, user) => {
      const birthYear = new Date(user.birthDate).getFullYear();
      const age = new Date().getFullYear() - birthYear;
      return sum + age;
    }, 0);
    
    return Math.round(totalAge / usersWithAge.length);
  },
  
  // 🔍 BUSCAR USUARIO
  findUser: (email) => {
    return UserManager.users.find(u => u.email === email.toLowerCase());
  },
  
  // ✏️ ACTUALIZAR PERFIL
  updateProfile: (userId, updates) => {
    const userIndex = UserManager.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    
    // Actualizar usuario
    UserManager.users[userIndex] = { ...UserManager.users[userIndex], ...updates };
    UserManager.saveToStorage();
    
    // Si es el usuario actual, actualizar sesión
    if (UserManager.currentUser && UserManager.currentUser.id === userId) {
      UserManager.currentUser = UserManager.users[userIndex];
      UserManager.saveSession();
      UserManager.updateUI();
    }
    
    console.log('✅ Perfil actualizado:', userId);
    Systems.notification.show('✅ Perfil actualizado exitosamente');
    
    return { success: true, user: UserManager.users[userIndex] };
  },
  
  // 🗑️ ELIMINAR USUARIO
  deleteUser: (userId) => {
    const userIndex = UserManager.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    
    // Eliminar usuario
    const deletedUser = UserManager.users[userIndex];
    UserManager.users.splice(userIndex, 1);
    UserManager.saveToStorage();
    
    // Si es el usuario actual, hacer logout
    if (UserManager.currentUser && UserManager.currentUser.id === userId) {
      UserManager.logout();
    }
    
    console.log('🗑️ Usuario eliminado:', deletedUser.email);
    Systems.notification.show('🗑️ Usuario eliminado exitosamente');
    
    return { success: true };
  },
  
  // 📋 LISTAR TODOS LOS USUARIOS
  listAll: () => {
    console.log('📋 === TODOS LOS USUARIOS REGISTRADOS ===');
    UserManager.users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.email})`);
      console.log(`   📅 Registro: ${new Date(user.createdAt).toLocaleDateString()}`);
      console.log(`   📏 Talla: ${user.preferences?.size || 'N/A'}`);
      console.log(`   🛒 Compras: ${user.purchases?.length || 0}`);
      console.log('   ---');
    });
    return UserManager.users;
  },
  
  // 🔄 RESETEAR BASE DE DATOS
  reset: () => {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los usuarios?')) {
      UserManager.users = [];
      UserManager.logout();
      UserManager.saveToStorage();
      console.log('🔄 Base de datos de usuarios reseteada');
      Systems.notification.show('🔄 Base de datos reseteada');
      return { success: true };
    }
    return { success: false };
  }
};

// 🔄 ACTUALIZAR SISTEMAS EXISTENTES
if (typeof Systems !== 'undefined' && Systems.user) {
  // Reemplazar funciones del sistema de usuarios con las nuevas
  Systems.user.login = (email, password) => UserManager.login(email, password);
  Systems.user.logout = () => UserManager.logout();
  Systems.user.updateInterface = () => UserManager.updateUI();
  
  // Agregar nuevas funciones
  Systems.user.register = (userData) => UserManager.register(userData);
  Systems.user.getStats = () => UserManager.getStats();
  Systems.user.listAll = () => UserManager.listAll();
  Systems.user.current = UserManager.currentUser;
  Systems.user.isLoggedIn = UserManager.isLoggedIn;
}

// 🌍 HACER DISPONIBLE GLOBALMENTE
window.UserManager = UserManager;

// 🚀 INICIALIZAR AL CARGAR
UserManager.init();

console.log(`
👥 === SISTEMA DE USUARIOS AVANZADO CARGADO ===

💾 DATOS PERSISTENTES:
• Los usuarios se guardan en localStorage
• Las sesiones se mantienen entre recargas
• Historial completo de cada usuario

🎮 COMANDOS DISPONIBLES:
• UserManager.listAll() - Ver todos los usuarios
• UserManager.getStats() - Estadísticas generales
• UserManager.findUser('email@example.com')
• UserManager.register(userData)
• UserManager.login(email, password)
• UserManager.logout()

📊 ESTADO ACTUAL:
• Usuarios registrados: ${UserManager.users.length}
• Usuario actual: ${UserManager.currentUser?.firstName || 'Ninguno'}
• Sesión activa: ${UserManager.isLoggedIn ? 'Sí' : 'No'}
`);