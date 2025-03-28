document.addEventListener('DOMContentLoaded', function() {
    // Criar partículas de fumaça
    const smokeEffect = document.createElement('div');
    smokeEffect.className = 'smoke-effect';
    document.body.appendChild(smokeEffect);
    
    // Criar brasas
    const embersContainer = document.createElement('div');
    embersContainer.className = 'embers-container';
    document.body.appendChild(embersContainer);
    
    // Gerar fumaça
    function generateSmoke() {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        
        // Tamanho aleatório
        const size = Math.random() * 100 + 50;
        smoke.style.width = `${size}px`;
        smoke.style.height = `${size}px`;
        
        // Posição aleatória na parte inferior
        smoke.style.left = `${Math.random() * 100}%`;
        smoke.style.bottom = '0';
        
        // Duração aleatória da animação
        const duration = Math.random() * 10 + 10;
        smoke.style.animationDuration = `${duration}s`;
        
        // Atraso aleatório
        smoke.style.animationDelay = `${Math.random() * 5}s`;
        
        smokeEffect.appendChild(smoke);
        
        // Remover após a animação terminar
        setTimeout(() => {
            smoke.remove();
        }, duration * 1000);
    }
    
    // Gerar brasas
    function generateEmbers() {
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        // Tamanho aleatório
        const size = Math.random() * 8 + 3;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        
        // Posição aleatória
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.top = `${Math.random() * 100}%`;
        
        // Duração aleatória da animação
        const duration = Math.random() * 3 + 1;
        ember.style.animationDuration = `${duration}s`;
        
        embersContainer.appendChild(ember);
        
        // Mover brasas aleatoriamente
        if (Math.random() > 0.7) {
            ember.style.setProperty('--random-x', `${Math.random() * 100 - 50}px`);
            ember.style.setProperty('--random-y', `${Math.random() * 100 - 50}px`);
            ember.style.animation = `ember-move ${Math.random() * 10 + 5}s infinite`;
        }
    }
    
    // Gerar brasas no rodapé
    function generateFooterEmbers() {
        const footer = document.querySelector('.footer');
        if (!footer) return;
        
        for (let i = 0; i < 5; i++) {
            const ember = document.createElement('div');
            ember.className = 'footer-ember';
            
            // Posição aleatória no rodapé
            ember.style.left = `${Math.random() * 100}%`;
            
            // Duração aleatória da animação
            const duration = Math.random() * 3 + 1;
            ember.style.animationDuration = `${duration}s`;
            
            footer.appendChild(ember);
        }
    }
    
    // Iniciar geração de efeitos
    setInterval(generateSmoke, 2000);
    
    // Gerar brasas iniciais
    for (let i = 0; i < 20; i++) {
        generateEmbers();
    }
    
    // Adicionar mais brasas periodicamente
    setInterval(() => {
        if (Math.random() > 0.5) {
            generateEmbers();
        }
    }, 3000);
    
    // Gerar brasas no rodapé
    generateFooterEmbers();
    
    // Remover brasas quando saem da tela para performance
    setInterval(() => {
        const embers = document.querySelectorAll('.ember');
        embers.forEach(ember => {
            const rect = ember.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight || 
                rect.right < 0 || rect.left > window.innerWidth) {
                ember.remove();
            }
        });
    }, 5000);

    // Carrossel de banners
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const images = carousel.querySelectorAll('img');
        if (images.length > 0) {
            let currentIndex = 0;
            images[currentIndex].classList.add('active');
            
            setInterval(() => {
                images[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % images.length;
                images[currentIndex].classList.add('active');
            }, 5000);
        }
    }
});