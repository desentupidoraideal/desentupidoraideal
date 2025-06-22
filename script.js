// JavaScript otimizado para aplicativo Android
document.addEventListener('DOMContentLoaded', function() {
    
    // Atualiza o horário na status bar
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }
    
    // Atualiza o horário a cada minuto
    updateTime();
    setInterval(updateTime, 60000);
    
    // Elementos dos botões
    const whatsappBtn = document.getElementById('whatsappBtn');
    const callBtn = document.getElementById('callBtn');
    
    // Efeito de feedback tátil para dispositivos móveis
    function addTouchFeedback(button) {
        button.addEventListener('touchstart', function(e) {
            // Vibração se suportada
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // Efeito visual de toque
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function(e) {
            // Restaura o tamanho original
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.transition = 'transform 0.3s ease';
            }, 100);
        });
        
        // Efeito de hover para desktop (caso seja acessado)
        button.addEventListener('mouseenter', function() {
            if (!('ontouchstart' in window)) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!('ontouchstart' in window)) {
                this.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Aplica efeitos aos botões
    if (whatsappBtn) addTouchFeedback(whatsappBtn);
    if (callBtn) addTouchFeedback(callBtn);
    
    // Animação de entrada dos elementos
    function animateElements() {
        const buttons = document.querySelectorAll('.btn');
        const alert = document.querySelector('.emergency-alert');
        
        // Anima o alerta primeiro
        if (alert) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            alert.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                alert.style.opacity = '1';
                alert.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // Anima os botões em sequência
        buttons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(30px)';
            button.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 600 + (index * 200));
        });
    }
    
    // Executa animação de entrada
    setTimeout(animateElements, 100);
    
    // Navegação inferior interativa
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active de todos
            navItems.forEach(nav => nav.classList.remove('active'));
            // Adiciona active ao clicado
            this.classList.add('active');
            
            // Vibração leve
            if (navigator.vibrate) {
                navigator.vibrate(30);
            }
        });
    });
    
    // Previne zoom em double tap (comportamento de app nativo)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Previne seleção de texto (comportamento de app nativo)
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    
    // Previne menu de contexto em long press
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Efeito de pulsação sutil nos botões a cada 10 segundos
    function subtlePulse() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.style.animation = 'none';
            setTimeout(() => {
                btn.style.animation = 'subtlePulse 1s ease-in-out';
            }, 10);
        });
        
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.style.animation = '';
            });
        }, 1000);
    }
    
    // Adiciona CSS para animação sutil
    const style = document.createElement('style');
    style.textContent = `
        @keyframes subtlePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .btn-highlight {
            animation: buttonHighlight 2s ease-in-out;
        }
        
        @keyframes buttonHighlight {
            0%, 100% { 
                box-shadow: 
                    0 8px 25px rgba(37, 211, 102, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }
            50% { 
                box-shadow: 
                    0 12px 35px rgba(37, 211, 102, 0.7),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 0 30px rgba(37, 211, 102, 0.5);
            }
        }
        
        .btn-call.btn-highlight {
            animation: callHighlight 2s ease-in-out;
        }
        
        @keyframes callHighlight {
            0%, 100% { 
                box-shadow: 
                    0 8px 25px rgba(255, 107, 107, 0.4),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }
            50% { 
                box-shadow: 
                    0 12px 35px rgba(255, 107, 107, 0.7),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 0 30px rgba(255, 107, 107, 0.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Inicia pulsação sutil periódica
    setInterval(subtlePulse, 10000);
    
    // Destaque alternado dos botões a cada 15 segundos
    function alternateHighlight() {
        const buttons = [whatsappBtn, callBtn];
        let currentIndex = 0;
        
        setInterval(() => {
            // Remove highlight de todos
            buttons.forEach(btn => btn.classList.remove('btn-highlight'));
            
            // Adiciona highlight ao botão atual
            if (buttons[currentIndex]) {
                buttons[currentIndex].classList.add('btn-highlight');
                
                // Remove após 2 segundos
                setTimeout(() => {
                    buttons[currentIndex].classList.remove('btn-highlight');
                }, 2000);
            }
            
            // Alterna para o próximo botão
            currentIndex = (currentIndex + 1) % buttons.length;
        }, 15000);
    }
    
    // Inicia destaque alternado após 5 segundos
    setTimeout(alternateHighlight, 5000);
    
    // Detecta orientação e ajusta layout se necessário
    function handleOrientationChange() {
        const container = document.querySelector('.app-container');
        if (window.orientation === 90 || window.orientation === -90) {
            // Paisagem - mantém design vertical
            container.style.maxWidth = '414px';
        } else {
            // Retrato - design normal
            container.style.maxWidth = '414px';
        }
    }
    
    // Escuta mudanças de orientação
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Configuração inicial
    handleOrientationChange();
});

// Função para detectar se é um dispositivo Android
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Configurações específicas para Android
if (isAndroid()) {
    // Adiciona classe para estilos específicos do Android
    document.documentElement.classList.add('android-device');
    
    // Configurações específicas do Android
    document.addEventListener('DOMContentLoaded', function() {
        // Ajusta a altura da viewport para Android
        function setViewportHeight() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setViewportHeight();
        window.addEventListener('resize', setViewportHeight);
    });
}

