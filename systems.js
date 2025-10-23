// ============================================
// ⚙️ SISTEMAS Y FUNCIONALIDADES - SMOKING BLACK
// ============================================

const Systems = {

  // 🛒 SISTEMA DE CARRITO
  cart: {
    items: [],
    total: 0,
    isExpanded: false,

    add: (productId, type, price) => {
      const productNames = {
        'smoking-clasico': 'Smoking Clásico',
        'smoking-premium': 'Smoking Premium',
        'smoking-ejecutivo': 'Smoking Ejecutivo',
        'smoking-gala': 'Smoking de Gala'
      };
      
      const item = {
        id: productId + '-' + type,
        name: productNames[productId],
        type: type === 'rent' ? 'Alquiler' : 'Compra',
        price: price
      };
      
      const existingIndex = Systems.cart.items.findIndex(cartItem => cartItem.id === item.id);
      if (existingIndex === -1) {
        Systems.cart.items.push(item);
        Systems.cart.updateDisplay();
        Systems.cart.showAnimation();
        Systems.notification.show(`✅ ${item.name} agregado al carrito`);
      } else {
        Systems.notification.show(`ℹ️ Este producto ya está en tu carrito`);
      }
    },

    updateDisplay: () => {
      const cartCount = document.getElementById('cart-count');
      const cartTotalDisplay = document.getElementById('cart-total-display');
      const cartPreview = document.getElementById('cart-preview');
      const cartActions = document.getElementById('cart-actions');
      
      Systems.cart.total = Systems.cart.items.reduce((sum, item) => sum + item.price, 0);
      
      if (cartCount) cartCount.textContent = Systems.cart.items.length;
      if (cartTotalDisplay) cartTotalDisplay.textContent = `$${Systems.cart.total.toLocaleString()} MXN`;
      
      if (cartPreview) {
        if (Systems.cart.items.length > 0) {
          cartPreview.innerHTML = Systems.cart.items.map(item => `
            <div class="cart-item-preview">
              <span class="cart-item-name">${item.name} (${item.type})</span>
              <span class="cart-item-price">$${item.price.toLocaleString()}</span>
            </div>
          `).join('');
          if (cartActions) cartActions.style.display = 'grid';
        } else {
          cartPreview.innerHTML = `
            <div class="cart-empty-state">
              <span>🛍️</span>
              <p>Tu carrito está vacío</p>
            </div>
          `;
          if (cartActions) cartActions.style.display = 'none';
        }
      }
    },

    toggle: () => {
      const floatingCart = document.getElementById('floating-cart');
      const arrow = document.getElementById('cart-arrow');
      
      Systems.cart.isExpanded = !Systems.cart.isExpanded;
      
      if (floatingCart && arrow) {
        if (Systems.cart.isExpanded) {
          floatingCart.classList.add('expanded');
          arrow.textContent = '▲';
        } else {
          floatingCart.classList.remove('expanded');
          arrow.textContent = '▼';
        }
      }
    },

    showAnimation: () => {
      const floatingCart = document.getElementById('floating-cart');
      if (floatingCart) {
        floatingCart.style.transform = 'translateY(-20px) scale(1.05)';
        setTimeout(() => {
          floatingCart.style.transform = 'translateY(0) scale(1)';
        }, 300);
      }
    },

    checkout: () => {
      if (Systems.cart.items.length === 0) {
        Systems.notification.show('⚠️ Tu carrito está vacío');
        return;
      }
      Systems.notification.show('🚀 Redirigiendo al checkout...');
      console.log('Procesando checkout:', Systems.cart.items);
    }
  },

  // 👤 SISTEMA DE USUARIOS
  user: {
    current: null,
    isLoggedIn: false,
    users: SmokingData.DEMO_USERS,

    showLoginModal: () => {
      UserManager.showLoginModal();
    },

    login: (email, password) => {
      const user = Systems.user.users.find(u => u.email === email && u.password === password);
      
      if (user) {
        Systems.user.current = user;
        Systems.user.isLoggedIn = true;
        Systems.user.updateInterface();
        Systems.notification.show(`¡Bienvenido ${user.firstName}! 🎉`);
      } else {
        Systems.notification.show('❌ Email o contraseña incorrectos');
      }
    },

    logout: () => {
      Systems.user.current = null;
      Systems.user.isLoggedIn = false;
      Systems.user.updateInterface();
      Systems.notification.show('👋 Sesión cerrada exitosamente');
    },

    updateInterface: () => {
      const loginBtn = document.getElementById('loginBtn');
      const userProfile = document.getElementById('userProfile');
      const userInitials = document.getElementById('userInitials');
      const userName = document.getElementById('userName');

      if (Systems.user.isLoggedIn && Systems.user.current) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        
        if (userInitials) {
          userInitials.textContent = 
            Systems.user.current.firstName.charAt(0) + Systems.user.current.lastName.charAt(0);
        }
        if (userName) {
          userName.textContent = 
            `${Systems.user.current.firstName} ${Systems.user.current.lastName}`;
        }
      } else {
        if (loginBtn) loginBtn.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
      }
    }
  },

  // 📹 SISTEMA DE CÁMARA
  camera: {
    stream: null,
    isActive: false,
    video: null,

    initialize: () => {
      Systems.camera.video = document.getElementById('cameraFeed');
      Systems.camera.updateStatus('Cámara lista para activar', 'inactive');
    },

    toggle: async () => {
      try {
        if (!Systems.camera.isActive) {
          await Systems.camera.start();
        } else {
          Systems.camera.stop();
        }
      } catch (error) {
        console.error('Error con la cámara:', error);
        Systems.camera.handleError(error);
      }
    },

    start: async () => {
      try {
        Systems.camera.updateStatus('🔄 Iniciando cámara...', 'loading');
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          } 
        });
        
        if (Systems.camera.video) {
          Systems.camera.video.srcObject = stream;
        }
        Systems.camera.stream = stream;
        Systems.camera.isActive = true;
        
        Systems.camera.updateStatus('✅ Cámara activa', 'active');
        
        const startBtn = document.getElementById('startCamera');
        const captureBtn = document.getElementById('capturePhoto');
        
        if (startBtn) {
          startBtn.innerHTML = '<span class="btn-icon">⏹️</span>DETENER CÁMARA';
        }
        if (captureBtn) {
          captureBtn.disabled = false;
        }
        
        Systems.notification.show('📹 Cámara activada correctamente');
        
      } catch (error) {
        throw error;
      }
    },

    stop: () => {
      if (Systems.camera.stream) {
        Systems.camera.stream.getTracks().forEach(track => track.stop());
        Systems.camera.stream = null;
      }
      
      if (Systems.camera.video) {
        Systems.camera.video.srcObject = null;
      }
      Systems.camera.isActive = false;
      
      Systems.camera.updateStatus('Cámara desactivada', 'inactive');
      
      const startBtn = document.getElementById('startCamera');
      const captureBtn = document.getElementById('capturePhoto');
      
      if (startBtn) {
        startBtn.innerHTML = '<span class="btn-icon">📹</span>ACTIVAR CÁMARA';
      }
      if (captureBtn) {
        captureBtn.disabled = true;
      }
      
      Systems.notification.show('📹 Cámara desactivada');
    },

    updateStatus: (message, status) => {
      const statusText = document.querySelector('.status-text');
      const statusIndicator = document.querySelector('.status-indicator');
      
      if (statusText) statusText.textContent = message;
      if (statusIndicator) statusIndicator.className = `status-indicator ${status}`;
      
      const overlay = document.querySelector('.camera-overlay');
      if (overlay) {
        if (status === 'active') {
          overlay.classList.add('scanning');
        } else {
          overlay.classList.remove('scanning');
        }
      }
    },

    handleError: (error) => {
      let errorMessage;
      
      switch(error.name) {
        case 'NotAllowedError':
          errorMessage = '❌ Acceso denegado. Por favor permite el uso de la cámara';
          break;
        case 'NotFoundError':
          errorMessage = '❌ No se encontró cámara en este dispositivo';
          break;
        case 'NotReadableError':
          errorMessage = '❌ La cámara está siendo usada por otra aplicación';
          break;
        default:
          errorMessage = '❌ Error inesperado con la cámara';
      }
      
      Systems.camera.updateStatus(errorMessage, 'error');
      Systems.notification.show(errorMessage);
    },

    capture: () => {
      if (!Systems.camera.isActive) {
        Systems.notification.show('⚠️ Primero activa la cámara');
        return;
      }
      
      const canvas = document.getElementById('analysisCanvas');
      const ctx = canvas?.getContext('2d');
      
      if (canvas && ctx && Systems.camera.video) {
        canvas.width = Systems.camera.video.videoWidth;
        canvas.height = Systems.camera.video.videoHeight;
        ctx.drawImage(Systems.camera.video, 0, 0, canvas.width, canvas.height);
        
        Systems.camera.showCaptureEffect();
        Systems.ai.simulateAnalysis();
        
        Systems.notification.show('📸 Imagen capturada - Analizando...');
      }
    },

    showCaptureEffect: () => {
      const overlay = document.querySelector('.camera-overlay');
      if (overlay) {
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        setTimeout(() => {
          overlay.style.backgroundColor = 'transparent';
        }, 200);
      }
    }
  },

  // 🤖 SISTEMA DE AI
  ai: {
    simulateAnalysis: () => {
      Systems.camera.updateStatus('🤖 Analizando con IA...', 'analyzing');
      
      setTimeout(() => {
        Systems.ai.updateResults();
        Systems.camera.updateStatus('✅ Análisis completado', 'completed');
        Systems.notification.show('🎯 Medición AI completada');
      }, 3000);
    },

    updateResults: () => {
      const measurements = {
        height: Math.floor(Math.random() * 30) + 160,
        shoulder: Math.floor(Math.random() * 10) + 40,
        chest: Math.floor(Math.random() * 20) + 90,
        waist: Math.floor(Math.random() * 20) + 75,
        arm: Math.floor(Math.random() * 10) + 60
      };
      
      // Actualizar valores en la interfaz
      const heightValue = document.getElementById('height-value');
      const shoulderValue = document.getElementById('shoulder-value');
      const chestValue = document.getElementById('chest-value');
      const waistValue = document.getElementById('waist-value');
      const armValue = document.getElementById('arm-value');
      const recommendedSize = document.getElementById('recommended-size');
      const sizeDescription = document.querySelector('.size-description');
      
      if (heightValue) heightValue.textContent = `${measurements.height} cm`;
      if (shoulderValue) shoulderValue.textContent = `${measurements.shoulder} cm`;
      if (chestValue) chestValue.textContent = `${measurements.chest} cm`;
      if (waistValue) waistValue.textContent = `${measurements.waist} cm`;
      if (armValue) armValue.textContent = `${measurements.arm} cm`;
      
      const size = Systems.ai.calculateSize(measurements);
      if (recommendedSize) recommendedSize.textContent = size;
      if (sizeDescription) sizeDescription.textContent = `Talla ${size} - Ajuste perfecto`;
      
      Systems.ai.updateConfidenceBars();
      Systems.ai.updateFitBars();
    },

    calculateSize: (measurements) => {
      const { chest, height } = measurements;
      
      if (chest < 95 && height < 170) return 'S';
      if (chest < 100 && height < 175) return 'M';
      if (chest < 105 && height < 180) return 'L';
      if (chest < 110 && height < 185) return 'XL';
      return 'XXL';
    },

    updateConfidenceBars: () => {
      const confidenceBars = document.querySelectorAll('.confidence-fill');
      confidenceBars.forEach(bar => {
        const confidence = Math.floor(Math.random() * 20) + 80;
        bar.style.width = `${confidence}%`;
        bar.style.backgroundColor = confidence > 90 ? '#4CAF50' : confidence > 80 ? '#FFC107' : '#FF9800';
      });
    },

    updateFitBars: () => {
      const fitBars = document.querySelectorAll('.fit-bars .fit-bar');
      fitBars.forEach(bar => {
        const shouldFill = Math.random() > 0.3;
        bar.style.backgroundColor = shouldFill ? '#4CAF50' : '#e0e0e0';
      });
    },

    reset: () => {
      const elements = {
        'height-value': '-- cm',
        'shoulder-value': '-- cm',
        'chest-value': '-- cm',
        'waist-value': '-- cm',
        'arm-value': '-- cm',
        'recommended-size': '?'
      };
      
      Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
      });
      
      const sizeDescription = document.querySelector('.size-description');
      if (sizeDescription) sizeDescription.textContent = 'Calculando...';
      
      const confidenceBars = document.querySelectorAll('.confidence-fill');
      confidenceBars.forEach(bar => {
        bar.style.width = '0%';
      });
      
      const fitBars = document.querySelectorAll('.fit-bars .fit-bar');
      fitBars.forEach(bar => {
        bar.style.backgroundColor = '#e0e0e0';
      });
      
      Systems.notification.show('🔄 Análisis reiniciado');
    }
  },

  // 🎠 SISTEMA DE CARRUSEL
  carousel: {
    currentSlide: 0,
    totalSlides: SmokingData.PRODUCTS.length,
    visibleSlides: 2,
    maxSlide: SmokingData.PRODUCTS.length - 2,
    interval: null,

    initialize: () => {
      Systems.carousel.updateDisplay();
      Systems.carousel.setupIndicators();
      Systems.carousel.addTouchSupport();
      Systems.carousel.startAuto();
    },

    next: () => {
      if (Systems.carousel.currentSlide < Systems.carousel.maxSlide) {
        Systems.carousel.currentSlide++;
      } else {
        Systems.carousel.currentSlide = 0;
      }
      Systems.carousel.updateDisplay();
      Systems.carousel.resetAuto();
    },

    previous: () => {
      if (Systems.carousel.currentSlide > 0) {
        Systems.carousel.currentSlide--;
      } else {
        Systems.carousel.currentSlide = Systems.carousel.maxSlide;
      }
      Systems.carousel.updateDisplay();
      Systems.carousel.resetAuto();
    },

    goToSlide: (slideIndex) => {
      if (slideIndex >= 0 && slideIndex <= Systems.carousel.maxSlide) {
        Systems.carousel.currentSlide = slideIndex;
        Systems.carousel.updateDisplay();
        Systems.carousel.resetAuto();
      }
    },

    updateDisplay: () => {
      const track = document.getElementById('carouselTrack');
      const slides = track?.querySelectorAll('.carousel-slide');
      const indicators = document.querySelectorAll('.indicator');
      
      if (track) {
        const translateX = -Systems.carousel.currentSlide * 50;
        track.style.transform = `translateX(${translateX}%)`;
      }
      
      if (slides) {
        slides.forEach((slide, index) => {
          slide.classList.remove('active', 'visible');
          
          if (index >= Systems.carousel.currentSlide && 
              index < Systems.carousel.currentSlide + Systems.carousel.visibleSlides) {
            slide.classList.add('visible');
            
            if (index === Systems.carousel.currentSlide) {
              slide.classList.add('active');
            }
          }
        });
      }
      
      indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        indicator.style.display = index <= Systems.carousel.maxSlide ? 'block' : 'none';
        
        if (index === Systems.carousel.currentSlide) {
          indicator.classList.add('active');
        }
      });
      
      const currentSlideElement = document.querySelector('.current-slide');
      const totalSlidesElement = document.querySelector('.total-slides');
      
      if (currentSlideElement && totalSlidesElement) {
        const startProduct = Systems.carousel.currentSlide + 1;
        const endProduct = Math.min(Systems.carousel.currentSlide + Systems.carousel.visibleSlides, Systems.carousel.totalSlides);
        currentSlideElement.textContent = `${startProduct}-${endProduct}`;
        totalSlidesElement.textContent = Systems.carousel.totalSlides;
      }
    },

    setupIndicators: () => {
      const indicators = document.querySelectorAll('.indicator');
      
      indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
          Systems.carousel.goToSlide(index);
        });
        indicator.title = `Ver productos ${index + 1}-${Math.min(index + Systems.carousel.visibleSlides, Systems.carousel.totalSlides)}`;
      });
    },

    startAuto: () => {
      Systems.carousel.interval = setInterval(() => {
        Systems.carousel.next();
      }, 8000);
    },

    pauseAuto: () => {
      if (Systems.carousel.interval) {
        clearInterval(Systems.carousel.interval);
        Systems.carousel.interval = null;
      }
    },

    resetAuto: () => {
      Systems.carousel.pauseAuto();
      setTimeout(() => {
        Systems.carousel.startAuto();
      }, 2000);
    },

    addTouchSupport: () => {
      const carousel = document.getElementById('catalog-carousel');
      let startX = 0;
      let currentX = 0;
      let isDragging = false;
      
      if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          isDragging = true;
          Systems.carousel.pauseAuto();
        });
        
        carousel.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          currentX = e.touches[0].clientX;
          e.preventDefault();
        });
        
        carousel.addEventListener('touchend', () => {
          if (!isDragging) return;
          isDragging = false;
          
          const diffX = startX - currentX;
          const threshold = 50;
          
          if (diffX > threshold) {
            Systems.carousel.next();
          } else if (diffX < -threshold) {
            Systems.carousel.previous();
          } else {
            Systems.carousel.resetAuto();
          }
        });
      }
    }
  },

  // 🎭 SISTEMA DE TUTORIAL
  tutorial: {
    currentStep: 1,
    totalSteps: SmokingData.TUTORIAL_STEPS.length,
    isOpen: false,

    toggle: () => {
      const tutorialSteps = document.getElementById('tutorial-steps');
      const quickInstructions = document.getElementById('quick-instructions');
      const toggleText = document.getElementById('tutorial-toggle-text');
      const toggleIcon = document.getElementById('tutorial-toggle-icon');
      
      Systems.tutorial.isOpen = !Systems.tutorial.isOpen;
      
      if (tutorialSteps && quickInstructions && toggleText && toggleIcon) {
        if (Systems.tutorial.isOpen) {
          tutorialSteps.style.display = 'block';
          quickInstructions.style.display = 'none';
          toggleText.textContent = 'Ocultar Tutorial';
          toggleIcon.textContent = '📖';
          
          Systems.tutorial.currentStep = 1;
          Systems.tutorial.updateDisplay();
          
          Systems.notification.show('🎯 Tutorial iniciado - Sigue los pasos');
        } else {
          tutorialSteps.style.display = 'none';
          quickInstructions.style.display = 'block';
          toggleText.textContent = 'Mostrar Tutorial';
          toggleIcon.textContent = '📚';
        }
      }
    },

    next: () => {
      if (Systems.tutorial.currentStep < Systems.tutorial.totalSteps) {
        Systems.tutorial.currentStep++;
        Systems.tutorial.updateDisplay();
        Systems.tutorial.showFeedback();
      }
    },

    previous: () => {
      if (Systems.tutorial.currentStep > 1) {
        Systems.tutorial.currentStep--;
        Systems.tutorial.updateDisplay();
      }
    },

    updateDisplay: () => {
      const progressFill = document.getElementById('tutorial-progress');
      const currentStepElement = document.getElementById('current-step');
      const totalStepsElement = document.getElementById('total-steps');
      
      if (progressFill && currentStepElement && totalStepsElement) {
        const progressPercentage = (Systems.tutorial.currentStep / Systems.tutorial.totalSteps) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        currentStepElement.textContent = Systems.tutorial.currentStep;
        totalStepsElement.textContent = Systems.tutorial.totalSteps;
      }
      
      const allSteps = document.querySelectorAll('.tutorial-step');
      allSteps.forEach((step, index) => {
        if (index + 1 === Systems.tutorial.currentStep) {
          step.classList.add('active');
          step.style.display = 'block';
        } else {
          step.classList.remove('active');
          step.style.display = 'none';
        }
      });
      
      const prevBtn = document.querySelector('.tutorial-btn.prev');
      const nextBtn = document.querySelector('.tutorial-btn.next');
      const finishBtn = document.querySelector('.tutorial-btn.finish');
      
      if (prevBtn) prevBtn.disabled = Systems.tutorial.currentStep === 1;
      
      if (nextBtn && finishBtn) {
        if (Systems.tutorial.currentStep === Systems.tutorial.totalSteps) {
          nextBtn.style.display = 'none';
          finishBtn.style.display = 'inline-block';
        } else {
          nextBtn.style.display = 'inline-block';
          finishBtn.style.display = 'none';
        }
      }
    },

    showFeedback: () => {
      const feedbackMessages = {
        2: '📏 Perfecto! La distancia correcta es clave',
        3: '💡 Excelente! La iluminación mejora la precisión',
        4: '👕 ¡Muy bien! La ropa ajustada da mejores resultados',
        5: '📐 ¡Genial! El objeto de referencia calibra la escala'
      };
      
      const message = feedbackMessages[Systems.tutorial.currentStep];
      if (message) {
        Systems.notification.show(message);
      }
    },

    finish: () => {
      Systems.tutorial.toggle();
      Systems.notification.show('🎉 ¡Tutorial completado! Ahora activa la cámara');
      
      const startCameraBtn = document.getElementById('startCamera');
      if (startCameraBtn) {
        startCameraBtn.style.animation = 'pulse 1.5s infinite';
        setTimeout(() => {
          startCameraBtn.style.animation = '';
        }, 4000);
      }
    }
  },

  // 🔔 SISTEMA DE NOTIFICACIONES
  notification: {
    show: (message) => {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #1a1a1a, #333333);
        color: #ffd700;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
        font-size: 0.9rem;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
      `;
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
  },

  // 🔧 UTILIDADES
  utils: {
    scrollToSection: (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    showSmartTip: () => {
      const randomTip = SmokingData.SMART_TIPS[Math.floor(Math.random() * SmokingData.SMART_TIPS.length)];
      setTimeout(() => {
        Systems.notification.show(randomTip);
      }, Math.random() * 5000 + 3000);
    }
  }
};

// 🔄 FUNCIONES GLOBALES PARA COMPATIBILIDAD
window.addToCart = Systems.cart.add;
window.toggleFloatingCart = Systems.cart.toggle;
window.proceedToCheckout = Systems.cart.checkout;
window.showLoginModal = () => UserManager.showLoginModal();
window.logoutUser = () => UserManager.logout();
window.toggleUserDropdown = () => {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
};
window.previousProduct = Systems.carousel.previous;
window.nextProduct = Systems.carousel.next;
window.goToSlide = Systems.carousel.goToSlide;
window.toggleTutorial = Systems.tutorial.toggle;
window.nextTutorialStep = Systems.tutorial.next;
window.previousTutorialStep = Systems.tutorial.previous;
window.finishTutorial = Systems.tutorial.finish;
window.resetAnalysis = Systems.ai.reset;
window.scrollToSection = Systems.utils.scrollToSection;

// 🔄 EXPORTAR SISTEMAS
window.Systems = Systems;

console.log('⚙️ Sistemas y funcionalidades cargados');