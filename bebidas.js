document.addEventListener('DOMContentLoaded', function() {
    // Animação de brasas e fumaça - IDÊNTICA ao primeiro CSS
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'effects-container';
    document.body.appendChild(effectsContainer);
    
    function generateSmoke() {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        
        const size = Math.random() * 150 + 50;
        smoke.style.width = `${size}px`;
        smoke.style.height = `${size}px`;
        smoke.style.left = `${Math.random() * 100}%`;
        smoke.style.bottom = '-50px';
        smoke.style.opacity = 0.1 + (size / 300);
        smoke.style.animationDuration = `${Math.random() * 20 + 10}s`;
        smoke.style.animationDelay = `${Math.random() * 5}s`;
        
        effectsContainer.appendChild(smoke);
        
        setTimeout(() => {
            smoke.remove();
        }, parseFloat(smoke.style.animationDuration) * 1000);
    }
    
    function generateEmbers() {
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        const size = Math.random() * 8 + 3;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.bottom = `${Math.random() * 30}%`;
        ember.style.animationDuration = `${Math.random() * 3 + 1}s`;
        
        if (Math.random() > 0.5) {
            ember.style.setProperty('--random-x', `${Math.random() * 200 - 100}px`);
            ember.style.setProperty('--random-y', `${Math.random() * -150 - 50}px`);
            ember.style.animation = `ember-move ${Math.random() * 15 + 5}s infinite, ember-glow ${ember.style.animationDuration} infinite alternate`;
        }
        
        effectsContainer.appendChild(ember);
    }
    
    // Iniciar efeitos
    setInterval(generateSmoke, 1500);
    
    for (let i = 0; i < 25; i++) {
        generateEmbers();
    }
    
    setInterval(() => {
        if (document.querySelectorAll('.ember').length < 30) {
            generateEmbers();
        }
    }, 2000);
    
    // Funcionalidade de favoritos - IDÊNTICA ao primeiro CSS
    const favoriteButtons = document.querySelectorAll('.btn-favoritar');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('favoritado');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('favoritado')) {
                icon.classList.remove('fa-heart');
                icon.classList.add('fa-heart-circle-check');
                // Adicionar lógica para salvar favorito
            } else {
                icon.classList.add('fa-heart');
                icon.classList.remove('fa-heart-circle-check');
                // Adicionar lógica para remover favorito
            }
        });
    });
    
    // Verificar itens já favoritados
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || {};
    favoriteButtons.forEach(button => {
        const card = button.closest('.card');
        if (card && favoritos[card.dataset.id]) {
            button.classList.add('favoritado');
            button.querySelector('i').classList.remove('fa-heart');
            button.querySelector('i').classList.add('fa-heart-circle-check');
        }
    });
    
    // Carrossel de banners (se aplicável)
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