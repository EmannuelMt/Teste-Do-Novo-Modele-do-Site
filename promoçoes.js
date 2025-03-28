document.addEventListener('DOMContentLoaded', function() {
    // Elementos da DOM
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const periodoBtns = document.querySelectorAll('.periodo-btn');
    const promoCards = document.querySelectorAll('.promo-card');
    
    // Filtros Ativos
    let filtroAtivo = 'todos';
    let periodoAtivo = 'diarias';
    
    // Inicializar promoções
    initPromocoes();
    
    function initPromocoes() {
        // Adicionar eventos aos botões de filtro
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', filtrarPorCategoria);
        });
        
        // Adicionar eventos aos botões de período
        periodoBtns.forEach(btn => {
            btn.addEventListener('click', filtrarPorPeriodo);
        });
        
        // Iniciar contadores regressivos
        iniciarContadores();
        
        // Configurar botão de copiar cupom
        configurarCopiarCupom();
        
        // Mostrar promoções iniciais
        filtrarPromocoes();
    }
    
    // Filtrar por categoria
    function filtrarPorCategoria(e) {
        // Remover classe active de todos os botões
        filtroBtns.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        e.target.classList.add('active');
        
        // Atualizar filtro ativo
        filtroAtivo = e.target.dataset.categoria;
        
        // Aplicar filtros
        filtrarPromocoes();
    }
    
    // Filtrar por período
    function filtrarPorPeriodo(e) {
        // Remover classe active de todos os botões
        periodoBtns.forEach(btn => btn.classList.remove('active'));
        
        // Adicionar classe active ao botão clicado
        e.target.classList.add('active');
        
        // Atualizar período ativo
        periodoAtivo = e.target.dataset.periodo;
        
        // Aplicar filtros
        filtrarPromocoes();
    }
    
    // Aplicar todos os filtros
    function filtrarPromocoes() {
        promoCards.forEach(card => {
            const cardCategoria = card.dataset.categoria;
            const cardPeriodo = card.dataset.periodo;
            
            // Verificar filtros
            const mostraCategoria = filtroAtivo === 'todos' || cardCategoria === filtroAtivo;
            const mostraPeriodo = cardPeriodo === periodoAtivo;
            
            if (mostraCategoria && mostraPeriodo) {
                card.style.display = 'block';
                
                // Animação de aparecimento
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Animação de desaparecimento
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Contador regressivo para ofertas
    function iniciarContadores() {
        const countdowns = document.querySelectorAll('.countdown');
        
        // Atualizar todos os contadores imediatamente
        atualizarContadores();
        
        // Atualizar a cada segundo
        setInterval(atualizarContadores, 1000);
        
        function atualizarContadores() {
            const agora = new Date();
            
            countdowns.forEach(countdown => {
                const dataFim = new Date(countdown.dataset.end);
                const diferenca = dataFim - agora;
                
                // Se o tempo acabou
                if (diferenca <= 0) {
                    countdown.innerHTML = 'EXPIRADO';
                    countdown.style.color = '#FF4757';
                    
                    // Desativar botão se a promoção acabou
                    const btn = countdown.closest('.promo-card').querySelector('.btn-promo');
                    if (btn) {
                        btn.disabled = true;
                        btn.style.opacity = '0.7';
                        btn.style.cursor = 'not-allowed';
                    }
                    return;
                }
                
                // Calcular horas, minutos e segundos
                const horas = Math.floor(diferenca / (1000 * 60 * 60));
                const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
                const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
                
                // Formatar e exibir
                countdown.innerHTML = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
                
                // Mudar cor quando estiver acabando (menos de 1 hora)
                if (horas < 1) {
                    countdown.style.color = '#FF6B35';
                    countdown.style.fontWeight = 'bold';
                }
            });
        }
    }
    
    // Configurar função de copiar cupom
    function configurarCopiarCupom() {
        document.querySelectorAll('.btn-promo').forEach(btn => {
            if (btn.textContent.includes('Copiar')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const couponCode = this.closest('.promo-card').querySelector('.coupon-code').textContent;
                    
                    // Copiar para área de transferência
                    navigator.clipboard.writeText(couponCode).then(() => {
                        // Feedback visual
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Código Copiado!';
                        this.style.backgroundColor = '#38B000';
                        
                        // Voltar ao normal após 2 segundos
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.style.backgroundColor = '';
                        }, 2000);
                    }).catch(err => {
                        console.error('Falha ao copiar: ', err);
                        this.innerHTML = '<i class="fas fa-times"></i> Erro ao copiar';
                        this.style.backgroundColor = '#FF4757';
                    });
                });
            }
        });
    }
    
    // Efeito hover nos cards
    promoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 10px 25px rgba(255, 107, 53, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
    
    // Inicializar tooltips (se necessário)
    initTooltips();
    
    function initTooltips() {
        // Adicionar tooltips aos elementos necessários
        document.querySelectorAll('[data-tooltip]').forEach(el => {
            el.addEventListener('mouseenter', showTooltip);
            el.addEventListener('mouseleave', hideTooltip);
        });
        
        function showTooltip(e) {
            const tooltipText = e.target.dataset.tooltip;
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
            
            e.target.tooltip = tooltip;
        }
        
        function hideTooltip(e) {
            if (e.target.tooltip) {
                e.target.tooltip.remove();
            }
        }
    }
});