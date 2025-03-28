// Função para expandir/recolher o card de comentários
function toggleCard(id) {
  const cardContent = document.getElementById(id);
  if (cardContent.style.display === "none" || cardContent.style.display === "") {
      cardContent.style.display = "block"; // Mostra o conteúdo
  } else {
      cardContent.style.display = "none"; // Oculta o conteúdo
  }
}

// Função para selecionar a avaliação por estrelas
const stars = document.querySelectorAll(".rating .star");
stars.forEach(star => {
  star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      document.getElementById("avaliacao").value = value;
      stars.forEach(s => s.classList.remove("active"));
      star.classList.add("active");
  });
});

// Função para adicionar comentários
document.getElementById("comentario-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const comentario = document.getElementById("comentario").value;
  const avaliacao = document.getElementById("avaliacao").value;

  if (nome && comentario && avaliacao > 0) {
      const comentarioItem = document.createElement("div");
      comentarioItem.classList.add("comentario-item");

      comentarioItem.innerHTML = `
          <div class="nome">${nome}</div>
          <div class="comentario">${comentario}</div>
          <div class="avaliacao">Avaliação: ${"★".repeat(avaliacao)}${"☆".repeat(5 - avaliacao)}</div>
      `;

      document.getElementById("lista-comentarios").appendChild(comentarioItem);

      // Limpa o formulário
      document.getElementById("comentario-form").reset();
      stars.forEach(s => s.classList.remove("active"));
      document.getElementById("avaliacao").value = 0;
  } else {
      alert("Por favor, preencha todos os campos e selecione uma avaliação.");
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Criar container de efeitos
    const effectsContainer = document.createElement('div');
    effectsContainer.className = 'effects-container';
    document.body.appendChild(effectsContainer);
    
    // Gerar fumaça - versão corrigida
    function generateSmoke() {
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        
        // Tamanho aleatório
        const size = Math.random() * 150 + 50; // 50px a 200px
        smoke.style.width = `${size}px`;
        smoke.style.height = `${size}px`;
        
        // Posição aleatória na parte inferior
        smoke.style.left = `${Math.random() * 100}%`;
        smoke.style.bottom = '-50px'; // Começa um pouco abaixo para entrar suavemente
        
        // Opacidade baseada no tamanho
        smoke.style.opacity = 0.1 + (size / 300);
        
        // Duração aleatória da animação
        const duration = Math.random() * 20 + 10; // 10s a 30s
        smoke.style.animationDuration = `${duration}s`;
        
        // Atraso aleatório
        smoke.style.animationDelay = `${Math.random() * 5}s`;
        
        effectsContainer.appendChild(smoke);
        
        // Remover após a animação terminar
        setTimeout(() => {
            smoke.remove();
        }, duration * 1000);
    }
    
    // Gerar brasas - versão corrigida
    function generateEmbers() {
        const ember = document.createElement('div');
        ember.className = 'ember';
        
        // Tamanho aleatório
        const size = Math.random() * 8 + 3;
        ember.style.width = `${size}px`;
        ember.style.height = `${size}px`;
        
        // Posição aleatória - preferencialmente na parte inferior
        ember.style.left = `${Math.random() * 100}%`;
        ember.style.bottom = `${Math.random() * 30}%`; // Concentrar na parte inferior
        
        // Duração aleatória do brilho
        const duration = Math.random() * 3 + 1;
        ember.style.animationDuration = `${duration}s`;
        
        // Adicionar movimento aleatório para algumas brasas
        if (Math.random() > 0.5) {
            ember.style.setProperty('--random-x', `${Math.random() * 200 - 100}px`);
            ember.style.setProperty('--random-y', `${Math.random() * -150 - 50}px`); // Subir
            ember.style.animation = `ember-move ${Math.random() * 15 + 5}s infinite, ember-glow ${duration}s infinite alternate`;
        }
        
        effectsContainer.appendChild(ember);
        
        // Remover se sair da tela
        setTimeout(() => {
            if (ember.parentNode) {
                const rect = ember.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight || 
                    rect.right < 0 || rect.left > window.innerWidth) {
                    ember.remove();
                }
            }
        }, 30000); // Verificar após 30s
    }
    
    // Gerar brasas no rodapé - versão corrigida
    function generateFooterEmbers() {
        const footer = document.querySelector('.footer');
        if (!footer) return;
        
        for (let i = 0; i < 8; i++) {
            const ember = document.createElement('div');
            ember.className = 'ember footer-ember';
            
            // Posição aleatória no rodapé
            ember.style.left = `${Math.random() * 100}%`;
            ember.style.bottom = `${Math.random() * 20 + 5}%`; // 5% a 25% do rodapé
            
            // Duração aleatória da animação
            const duration = Math.random() * 3 + 1;
            ember.style.animationDuration = `${duration}s`;
            
            footer.appendChild(ember);
        }
    }
    
    // Iniciar geração de efeitos
    function startEffects() {
        // Gerar fumaça periodicamente
        setInterval(generateSmoke, 1500);
        
        // Gerar brasas iniciais
        for (let i = 0; i < 25; i++) {
            generateEmbers();
        }
        
        // Adicionar mais brasas periodicamente
        setInterval(() => {
            if (document.querySelectorAll('.ember').length < 30) {
                generateEmbers();
            }
        }, 2000);
        
        // Gerar brasas no rodapé
        generateFooterEmbers();
    }
    
    // Esperar um pouco antes de iniciar para evitar sobrecarga inicial
    setTimeout(startEffects, 1000);
    
    // Limpeza periódica
    setInterval(() => {
        const embers = document.querySelectorAll('.ember:not(.footer-ember)');
        embers.forEach(ember => {
            const rect = ember.getBoundingClientRect();
            if (rect.bottom < 0 || rect.top > window.innerHeight || 
                rect.right < 0 || rect.left > window.innerWidth) {
                ember.remove();
            }
        });
    }, 10000);
});