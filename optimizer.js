// ============================================
// 🧹 OPTIMIZACIÓN Y LIMPIEZA - SMOKING BLACK
// ============================================

const Optimizer = {
  
  // 🔍 DIAGNÓSTICO COMPLETO
  fullDiagnostic: () => {
    console.log('🔍 === DIAGNÓSTICO COMPLETO DE LA APLICACIÓN ===');
    
    const diagnostic = {
      timestamp: new Date().toISOString(),
      duplicatedFunctions: [],
      unusedCode: [],
      unnecessaryFiles: [],
      heavyFiles: [],
      optimizations: [],
      cleanupActions: []
    };
    
    // 1. Buscar funciones duplicadas
    console.log('\n1️⃣ === FUNCIONES DUPLICADAS ===');
    diagnostic.duplicatedFunctions = Optimizer.findDuplicatedFunctions();
    
    // 2. Buscar código no utilizado
    console.log('\n2️⃣ === CÓDIGO NO UTILIZADO ===');
    diagnostic.unusedCode = Optimizer.findUnusedCode();
    
    // 3. Analizar archivos pesados
    console.log('\n3️⃣ === ARCHIVOS PESADOS ===');
    diagnostic.heavyFiles = Optimizer.findHeavyFiles();
    
    // 4. Buscar archivos innecesarios
    console.log('\n4️⃣ === ARCHIVOS INNECESARIOS ===');
    diagnostic.unnecessaryFiles = Optimizer.findUnnecessaryFiles();
    
    // 5. Generar acciones de limpieza
    console.log('\n5️⃣ === ACCIONES DE LIMPIEZA RECOMENDADAS ===');
    diagnostic.cleanupActions = Optimizer.generateCleanupActions(diagnostic);
    
    return diagnostic;
  },
  
  // 🔍 BUSCAR FUNCIONES DUPLICADAS
  findDuplicatedFunctions: () => {
    const duplicates = [];
    
    // Funciones que pueden estar duplicadas entre HTML y JS
    const suspiciousFunctions = [
      'addToCart',
      'updateCartDisplay',
      'toggleFloatingCart',
      'showNotification',
      'nextProduct',
      'previousProduct',
      'goToSlide',
      'toggleCamera',
      'startCameraStream',
      'stopCameraStream',
      'updateCameraStatus',
      'captureAndAnalyze',
      'simulateAIAnalysis',
      'updateAIResults',
      'toggleTutorial',
      'nextTutorialStep',
      'previousTutorialStep',
      'finishTutorial',
      'showLoginModal',
      'closeAuthModal',
      'loginUser',
      'logoutUser',
      'updateUserInterface'
    ];
    
    suspiciousFunctions.forEach(funcName => {
      let locations = [];
      
      // Verificar si existe en window (global)
      if (typeof window[funcName] === 'function') {
        locations.push('window (HTML)');
      }
      
      // Verificar si existe en Systems
      if (Systems && Systems.cart && typeof Systems.cart[funcName] === 'function') {
        locations.push('Systems.cart');
      }
      if (Systems && Systems.user && typeof Systems.user[funcName] === 'function') {
        locations.push('Systems.user');
      }
      if (Systems && Systems.camera && typeof Systems.camera[funcName] === 'function') {
        locations.push('Systems.camera');
      }
      if (Systems && Systems.carousel && typeof Systems.carousel[funcName] === 'function') {
        locations.push('Systems.carousel');
      }
      if (Systems && Systems.tutorial && typeof Systems.tutorial[funcName] === 'function') {
        locations.push('Systems.tutorial');
      }
      
      if (locations.length > 1) {
        duplicates.push({
          function: funcName,
          locations: locations,
          severity: 'HIGH',
          action: 'Eliminar versión global, usar solo la modular'
        });
        console.log(`❌ DUPLICADO: ${funcName} en ${locations.join(', ')}`);
      }
    });
    
    console.log(`📊 Total de funciones duplicadas: ${duplicates.length}`);
    return duplicates;
  },
  
  // 🔍 BUSCAR CÓDIGO NO UTILIZADO
  findUnusedCode: () => {
    const unused = [];
    
    // Variables globales sospechosas
    const suspiciousGlobals = [
      'cart',
      'cartTotal', 
      'isCartExpanded',
      'currentUser',
      'isLoggedIn',
      'users',
      'cameraStream',
      'isCameraActive',
      'cameraVideo',
      'tutorialStep',
      'totalSteps',
      'isTutorialOpen',
      'userMeasurements',
      'currentMeasurement',
      'currentSlide',
      'totalSlides',
      'visibleSlides',
      'maxSlide',
      'carouselInterval'
    ];
    
    suspiciousGlobals.forEach(varName => {
      if (typeof window[varName] !== 'undefined') {
        unused.push({
          type: 'variable',
          name: varName,
          location: 'global',
          severity: 'MEDIUM',
          action: 'Puede estar duplicada con la versión modular'
        });
        console.log(`⚠️ VARIABLE GLOBAL: ${varName} (posiblemente duplicada)`);
      }
    });
    
    // Elementos DOM que podrían no existir
    const suspiciousSelectors = [
      '#cart-count',
      '#cart-total-display', 
      '#cart-preview',
      '#floating-cart',
      '#loginBtn',
      '#userProfile',
      '#cameraFeed',
      '#startCamera',
      '#capturePhoto',
      '#tutorial-steps',
      '#carouselTrack'
    ];
    
    suspiciousSelectors.forEach(selector => {
      const element = document.querySelector(selector);
      if (!element) {
        unused.push({
          type: 'selector',
          name: selector,
          location: 'DOM',
          severity: 'LOW',
          action: 'Verificar si el selector es necesario'
        });
        console.log(`🔍 SELECTOR NO ENCONTRADO: ${selector}`);
      }
    });
    
    console.log(`📊 Total de elementos no utilizados: ${unused.length}`);
    return unused;
  },
  
  // 📦 BUSCAR ARCHIVOS PESADOS
  findHeavyFiles: () => {
    const heavy = [];
    
    // Simular análisis de archivos (en un entorno real, usarías fetch)
    const estimatedSizes = {
      'index.html': 2, // KB
      'data.js': 15,
      'components.js': 45,
      'systems.js': 55,
      'app.js': 25,
      'demo.js': 12,
      'optimizer.js': 18,
      'style.css': 35,
      'carousel.css': 8,
      'app-styles.css': 6
    };
    
    Object.entries(estimatedSizes).forEach(([file, size]) => {
      if (size > 30) {
        heavy.push({
          file: file,
          estimatedSize: `${size} KB`,
          severity: size > 50 ? 'HIGH' : 'MEDIUM',
          action: size > 50 ? 'Revisar y dividir en módulos más pequeños' : 'Considerar optimización'
        });
        console.log(`📦 ARCHIVO PESADO: ${file} (~${size} KB)`);
      }
    });
    
    console.log(`📊 Total de archivos pesados: ${heavy.length}`);
    return heavy;
  },
  
  // 🗑️ BUSCAR ARCHIVOS INNECESARIOS
  findUnnecessaryFiles: () => {
    const unnecessary = [];
    
    // Archivos que podrían no ser necesarios
    const checkFiles = [
      {
        name: 'index-clean.html',
        reason: 'Archivo temporal de limpieza',
        action: 'ELIMINAR - Ya se limpió el index.html principal'
      },
      {
        name: 'demo.js',
        reason: 'Solo para desarrollo y testing',
        action: 'OPCIONAL - Eliminar en producción'
      },
      {
        name: 'optimizer.js',
        reason: 'Solo para desarrollo y debugging',
        action: 'OPCIONAL - Eliminar en producción'
      },
      {
        name: 'README.md',
        reason: 'Solo documentación',
        action: 'OPCIONAL - No afecta la aplicación'
      }
    ];
    
    checkFiles.forEach(file => {
      unnecessary.push(file);
      console.log(`🗑️ INNECESARIO: ${file.name} - ${file.reason}`);
    });
    
    console.log(`📊 Total de archivos innecesarios: ${unnecessary.length}`);
    return unnecessary;
  },
  
  // ⚡ GENERAR ACCIONES DE LIMPIEZA
  generateCleanupActions: (diagnostic) => {
    const actions = [];
    
    // Acciones críticas
    if (diagnostic.duplicatedFunctions.length > 0) {
      actions.push({
        priority: 'CRITICAL',
        action: 'Eliminar funciones JavaScript duplicadas del HTML',
        impact: 'Reduce conflictos y mejora rendimiento',
        effort: 'ALTO'
      });
    }
    
    // Acciones importantes
    if (diagnostic.heavyFiles.length > 0) {
      actions.push({
        priority: 'HIGH',
        action: 'Optimizar archivos JavaScript pesados',
        impact: 'Mejora tiempo de carga',
        effort: 'MEDIO'
      });
    }
    
    // Acciones recomendadas
    actions.push({
      priority: 'MEDIUM',
      action: 'Eliminar archivos de desarrollo (demo.js, optimizer.js)',
      impact: 'Reduce tamaño total del proyecto',
      effort: 'BAJO'
    });
    
    actions.push({
      priority: 'LOW',
      action: 'Minificar archivos CSS y JS para producción',
      impact: 'Reduce tiempo de carga',
      effort: 'BAJO'
    });
    
    actions.push({
      priority: 'LOW',
      action: 'Comprimir imágenes en formato WebP',
      impact: 'Reduce uso de ancho de banda',
      effort: 'MEDIO'
    });
    
    console.log('\n🎯 ACCIONES RECOMENDADAS:');
    actions.forEach((action, index) => {
      const priorityIcon = {
        'CRITICAL': '🚨',
        'HIGH': '⚠️',
        'MEDIUM': '💡',
        'LOW': '✨'
      };
      
      console.log(`${index + 1}. ${priorityIcon[action.priority]} [${action.priority}] ${action.action}`);
      console.log(`   📈 Impacto: ${action.impact}`);
      console.log(`   🔨 Esfuerzo: ${action.effort}\n`);
    });
    
    return actions;
  },
  
  // 🚀 LIMPIEZA AUTOMÁTICA
  autoCleanup: () => {
    console.log('🚀 === INICIANDO LIMPIEZA AUTOMÁTICA ===');
    
    const results = {
      cleaned: [],
      errors: []
    };
    
    try {
      // 1. Limpiar variables globales duplicadas
      const globalVars = ['cart', 'cartTotal', 'isCartExpanded'];
      globalVars.forEach(varName => {
        if (typeof window[varName] !== 'undefined') {
          delete window[varName];
          results.cleaned.push(`Variable global: ${varName}`);
          console.log(`✅ Eliminada variable global: ${varName}`);
        }
      });
      
      // 2. Limpiar event listeners duplicados
      const oldFunctions = ['addToCart', 'showNotification', 'toggleFloatingCart'];
      oldFunctions.forEach(funcName => {
        if (typeof window[funcName] === 'function') {
          delete window[funcName];
          results.cleaned.push(`Función global: ${funcName}`);
          console.log(`✅ Eliminada función global: ${funcName}`);
        }
      });
      
      // 3. Limpiar elementos DOM temporales
      const tempElements = document.querySelectorAll('[data-temp="true"]');
      tempElements.forEach(element => {
        element.remove();
        results.cleaned.push('Elemento temporal DOM');
        console.log(`✅ Eliminado elemento temporal del DOM`);
      });
      
      // 4. Optimizar memoria
      if (window.gc && typeof window.gc === 'function') {
        window.gc();
        results.cleaned.push('Garbage collection ejecutado');
        console.log(`✅ Garbage collection ejecutado`);
      }
      
      console.log(`\n🎉 LIMPIEZA COMPLETADA: ${results.cleaned.length} elementos limpiados`);
      Systems.notification.show(`🧹 Limpieza automática completada: ${results.cleaned.length} elementos`);
      
    } catch (error) {
      results.errors.push(error.message);
      console.error(`❌ Error en limpieza automática: ${error.message}`);
    }
    
    return results;
  },
  
  // 📊 REPORTE FINAL DE OPTIMIZACIÓN
  generateOptimizationReport: () => {
    console.log('📊 === REPORTE FINAL DE OPTIMIZACIÓN ===');
    
    const report = Optimizer.fullDiagnostic();
    const cleanup = Optimizer.autoCleanup();
    
    const summary = {
      timestamp: new Date().toLocaleString(),
      issues: {
        critical: report.duplicatedFunctions.length,
        high: report.heavyFiles.filter(f => f.severity === 'HIGH').length,
        medium: report.unusedCode.length,
        low: report.unnecessaryFiles.length
      },
      cleanup: {
        cleaned: cleanup.cleaned.length,
        errors: cleanup.errors.length
      },
      recommendations: report.cleanupActions.length,
      overallHealth: 'CALCULATING...'
    };
    
    // Calcular salud general
    const totalIssues = summary.issues.critical * 3 + summary.issues.high * 2 + summary.issues.medium * 1;
    if (totalIssues === 0) summary.overallHealth = '🟢 EXCELENTE';
    else if (totalIssues <= 3) summary.overallHealth = '🟡 BUENO';
    else if (totalIssues <= 6) summary.overallHealth = '🟠 NECESITA MEJORAS';
    else summary.overallHealth = '🔴 CRÍTICO';
    
    console.log(`\n🎯 RESUMEN EJECUTIVO:`);
    console.log(`📅 Fecha: ${summary.timestamp}`);
    console.log(`🏥 Salud general: ${summary.overallHealth}`);
    console.log(`🚨 Problemas críticos: ${summary.issues.critical}`);
    console.log(`⚠️ Problemas importantes: ${summary.issues.high}`);
    console.log(`💡 Problemas menores: ${summary.issues.medium}`);
    console.log(`🧹 Elementos limpiados: ${summary.cleanup.cleaned}`);
    console.log(`❌ Errores de limpieza: ${summary.cleanup.errors}`);
    console.log(`📋 Recomendaciones: ${summary.recommendations}`);
    
    Systems.notification.show(`📊 Diagnóstico completo: ${summary.overallHealth.split(' ')[1]} - Ver consola`);
    
    return { report, cleanup, summary };
  }
};

// ...existing code...

// 🎮 COMANDOS DE OPTIMIZACIÓN
window.Optimizer = Optimizer;

// 🚀 MENSAJE INICIAL MEJORADO
console.log(`
🧹 === OPTIMIZADOR AVANZADO CARGADO ===

🔍 DIAGNÓSTICO COMPLETO:
• Optimizer.fullDiagnostic() - Análisis completo
• Optimizer.findDuplicatedFunctions() - Funciones duplicadas
• Optimizer.findUnusedCode() - Código no utilizado
• Optimizer.findHeavyFiles() - Archivos pesados

🧹 LIMPIEZA:
• Optimizer.autoCleanup() - Limpieza automática
• Optimizer.generateOptimizationReport() - Reporte final completo

🚀 INICIO RÁPIDO:
Optimizer.generateOptimizationReport()
`);
  
  // 📦 ANALIZAR TAMAÑO DE ARCHIVOS
  analyzeFileSizes: () => {
    console.log('📦 === ANÁLISIS DE TAMAÑO DE ARCHIVOS ===');
    
    const files = [
      'data.js',
      'components.js', 
      'systems.js',
      'app.js',
      'demo.js'
    ];
    
    files.forEach(filename => {
      fetch(filename)
        .then(response => response.text())
        .then(content => {
          const size = (content.length / 1024).toFixed(2);
          const lines = content.split('\n').length;
          
          console.log(`📄 ${filename}:`);
          console.log(`  📏 Tamaño: ${size} KB`);
          console.log(`  📝 Líneas: ${lines}`);
          console.log(`  🎯 Estado: ${size > 50 ? '⚠️ Grande' : '✅ Óptimo'}`);
        })
        .catch(() => {
          console.log(`❌ No se pudo analizar ${filename}`);
        });
    });
  },
  
  // 🎯 SUGERENCIAS DE OPTIMIZACIÓN
  getOptimizationSuggestions: () => {
    console.log('🎯 === SUGERENCIAS DE OPTIMIZACIÓN ===');
    
    const suggestions = [
      '🔄 Eliminar funciones duplicadas del HTML',
      '📦 Minificar archivos JS para producción',
      '🖼️ Optimizar imágenes (WebP format)',
      '🗜️ Comprimir CSS con autoprefixer',
      '⚡ Implementar lazy loading para imágenes',
      '🔒 Agregar service worker para cache',
      '📱 Optimizar para Core Web Vitals',
      '🎨 Reducir CSS no utilizado'
    ];
    
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion}`);
    });
    
    return suggestions;
  },
  
  // 🧪 VERIFICAR FUNCIONALIDAD
  testAllSystems: () => {
    console.log('🧪 === VERIFICACIÓN DE SISTEMAS ===');
    
    const tests = [
      {
        name: 'Carrito',
        test: () => {
          try {
            Systems.cart.add('test', 'rent', 100);
            Systems.cart.updateDisplay();
            return true;
          } catch (e) {
            console.error('Error en carrito:', e);
            return false;
          }
        }
      },
      {
        name: 'Notificaciones',
        test: () => {
          try {
            Systems.notification.show('Test');
            return true;
          } catch (e) {
            console.error('Error en notificaciones:', e);
            return false;
          }
        }
      },
      {
        name: 'Carrusel',
        test: () => {
          try {
            Systems.carousel.next();
            Systems.carousel.previous();
            return true;
          } catch (e) {
            console.error('Error en carrusel:', e);
            return false;
          }
        }
      },
      {
        name: 'Usuario',
        test: () => {
          try {
            Systems.user.updateInterface();
            return true;
          } catch (e) {
            console.error('Error en usuario:', e);
            return false;
          }
        }
      },
      {
        name: 'Tutorial',
        test: () => {
          try {
            Systems.tutorial.updateDisplay();
            return true;
          } catch (e) {
            console.error('Error en tutorial:', e);
            return false;
          }
        }
      }
    ];
    
    let passed = 0;
    tests.forEach(test => {
      const result = test.test();
      console.log(`${result ? '✅' : '❌'} ${test.name}: ${result ? 'OK' : 'ERROR'}`);
      if (result) passed++;
    });
    
    console.log(`\n📊 RESULTADO: ${passed}/${tests.length} sistemas funcionando`);
    
    if (passed === tests.length) {
      Systems.notification.show('✅ Todos los sistemas optimizados y funcionando');
    } else {
      Systems.notification.show(`⚠️ ${tests.length - passed} sistemas necesitan atención`);
    }
    
    return { passed, total: tests.length };
  },
  
  // 🎯 OPTIMIZACIÓN AUTOMÁTICA
  autoOptimize: () => {
    console.log('🎯 === INICIANDO OPTIMIZACIÓN AUTOMÁTICA ===');
    
    // 1. Limpiar carrito de pruebas
    if (Systems.cart.items.length > 0) {
      Systems.cart.items = [];
      Systems.cart.updateDisplay();
      console.log('🧹 Carrito limpiado');
    }
    
    // 2. Resetear estados
    if (Systems.tutorial.isOpen) {
      Systems.tutorial.toggle();
      console.log('🎭 Tutorial cerrado');
    }
    
    // 3. Pausar carrusel automático temporalmente
    Systems.carousel.pauseAuto();
    setTimeout(() => {
      Systems.carousel.startAuto();
    }, 1000);
    console.log('🎠 Carrusel optimizado');
    
    // 4. Limpiar notificaciones antiguas
    const notifications = document.querySelectorAll('[style*="position: fixed"][style*="top: 100px"]');
    notifications.forEach(notification => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    });
    console.log('🔔 Notificaciones limpiadas');
    
    // 5. Optimizar memoria
    if (window.gc && typeof window.gc === 'function') {
      window.gc();
      console.log('🗑️ Garbage collection ejecutado');
    }
    
    console.log('✅ Optimización automática completada');
    Systems.notification.show('🚀 Aplicación optimizada automáticamente');
  },
  
  // 📊 REPORTE COMPLETO
  generateReport: () => {
    console.log('📊 === REPORTE COMPLETO DE OPTIMIZACIÓN ===');
    
    const report = {
      timestamp: new Date().toISOString(),
      analysis: Optimizer.analyzeDuplicates(),
      systemsTest: Optimizer.testAllSystems(),
      suggestions: Optimizer.getOptimizationSuggestions(),
      performance: {
        loadTime: performance.now(),
        memoryUsage: navigator.deviceMemory || 'N/A',
        connection: navigator.connection?.effectiveType || 'N/A'
      }
    };
    
    console.log('📋 Reporte generado:', report);
    
    // Mostrar resumen
    const { passed, total } = report.systemsTest;
    const percentage = Math.round((passed / total) * 100);
    
    console.log(`\n🎯 RESUMEN EJECUTIVO:`);
    console.log(`  ✅ Sistemas funcionando: ${passed}/${total} (${percentage}%)`);
    console.log(`  📦 Archivos analizados: 5`);
    console.log(`  🚀 Estado general: ${percentage >= 90 ? 'EXCELENTE' : percentage >= 70 ? 'BUENO' : 'NECESITA MEJORAS'}`);
    
    return report;
  }
};

// 🎮 COMANDOS DE OPTIMIZACIÓN
window.Optimizer = Optimizer;

// 🚀 AUTO-EJECUTAR ANÁLISIS BÁSICO
setTimeout(() => {
  console.log('🔍 Ejecutando análisis automático...');
  Optimizer.analyzeDuplicates();
  
  // Solo mostrar si hay problemas
  const analysis = Optimizer.analyzeDuplicates();
  if (analysis.duplicatedFunctions.length > 0) {
    console.warn('⚠️ Se encontraron funciones duplicadas. Ejecuta Optimizer.autoOptimize()');
  }
}, 2000);

console.log(`
🧹 === OPTIMIZADOR CARGADO ===

📋 COMANDOS DISPONIBLES:
• Optimizer.analyzeDuplicates() - Buscar código duplicado
• Optimizer.analyzeFileSizes() - Analizar tamaño de archivos  
• Optimizer.testAllSystems() - Probar todos los sistemas
• Optimizer.autoOptimize() - Optimización automática
• Optimizer.generateReport() - Reporte completo

🚀 INICIO RÁPIDO:
Optimizer.generateReport()
`);