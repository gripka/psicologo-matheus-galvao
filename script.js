// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Apenas alterna o estado do item clicado
            item.classList.toggle('active');
        });
    });

    // Carrossel com controles
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = Array.from(carouselTrack.children);
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    // Duplica os itens para criar o efeito de loop infinito
    carouselItems.forEach(item => {
        const clone = item.cloneNode(true);
        carouselTrack.appendChild(clone);
    });

    let currentPosition = 0;
    const itemWidth = 330; // 300px width + 30px gap
    const totalItems = carouselItems.length;
    const maxScroll = totalItems * itemWidth;
    let autoScrollInterval;
    let isScrolling = false;

    // Variáveis para drag/swipe
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Função para mover o carrossel
    function moveCarousel(position) {
        carouselTrack.style.transform = `translateX(-${position}px)`;
        
        // Reset quando chegar ao fim
        if (position >= maxScroll) {
            setTimeout(() => {
                carouselTrack.style.transition = 'none';
                currentPosition = 0;
                carouselTrack.style.transform = `translateX(0)`;
                setTimeout(() => {
                    carouselTrack.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    }

    // Auto scroll constante
    function startAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
        
        autoScrollInterval = setInterval(() => {
            if (!isScrolling && !isDragging) {
                currentPosition += 1;
                moveCarousel(currentPosition);
            }
        }, 30);
    }

    // Botão próximo
    nextBtn.addEventListener('click', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        currentPosition += itemWidth * 2;
        
        if (currentPosition > maxScroll) {
            currentPosition = 0;
        }
        
        moveCarousel(currentPosition);
        
        setTimeout(() => {
            isScrolling = false;
        }, 600);
    });

    // Botão anterior
    prevBtn.addEventListener('click', () => {
        if (isScrolling) return;
        
        isScrolling = true;
        currentPosition -= itemWidth * 2;
        
        if (currentPosition < 0) {
            currentPosition = maxScroll - itemWidth;
        }
        
        moveCarousel(currentPosition);
        
        setTimeout(() => {
            isScrolling = false;
        }, 600);
    });

    // Pausa ao passar o mouse
    carouselTrack.addEventListener('mouseenter', () => {
        isScrolling = true;
    });

    carouselTrack.addEventListener('mouseleave', () => {
        isScrolling = false;
    });

    // Funções para drag/swipe
    function touchStart(index) {
        return function(event) {
            isDragging = true;
            isScrolling = true;
            startPos = getPositionX(event);
            prevTranslate = currentPosition;
            carouselTrack.style.transition = 'none';
            
            if (animationID) {
                cancelAnimationFrame(animationID);
            }
        };
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPos = getPositionX(event);
            const diff = startPos - currentPos;
            currentTranslate = prevTranslate + diff;
            
            // Limitar o arrasto
            if (currentTranslate < 0) {
                currentTranslate = 0;
            } else if (currentTranslate > maxScroll) {
                currentTranslate = maxScroll;
            }
            
            carouselTrack.style.transform = `translateX(-${currentTranslate}px)`;
        }
    }

    function touchEnd() {
        isDragging = false;
        carouselTrack.style.transition = 'transform 0.5s ease';
        currentPosition = currentTranslate;
        
        // Retoma auto scroll após 2 segundos
        setTimeout(() => {
            isScrolling = false;
        }, 2000);
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    // Event listeners para mouse
    carouselTrack.addEventListener('mousedown', touchStart(0));
    carouselTrack.addEventListener('mousemove', touchMove);
    carouselTrack.addEventListener('mouseup', touchEnd);
    carouselTrack.addEventListener('mouseleave', () => {
        if (isDragging) {
            touchEnd();
        }
        isScrolling = false;
    });

    // Event listeners para touch
    carouselTrack.addEventListener('touchstart', touchStart(0), { passive: true });
    carouselTrack.addEventListener('touchmove', touchMove, { passive: true });
    carouselTrack.addEventListener('touchend', touchEnd);

    // Prevenir seleção de texto durante o drag
    carouselTrack.addEventListener('dragstart', (e) => e.preventDefault());

    // Inicia o auto scroll
    startAutoScroll();

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animação de entrada ao scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa elementos para animação
    const animateElements = document.querySelectorAll('.about-content, .interests-content, .faq-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Função para adicionar imagens personalizadas
function addCustomImage(placeholderId, imagePath) {
    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
        placeholder.innerHTML = `<img src="${imagePath}" alt="Imagem" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">`;
    }
}

// Função para adicionar imagens ao carrossel
function addCarouselImages(images) {
    const carouselTrack = document.querySelector('.carousel-track');
    carouselTrack.innerHTML = ''; // Limpa os placeholders
    
    images.forEach(image => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.innerHTML = `
            <div class="carousel-placeholder">
                <img src="${image.src}" alt="${image.alt}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
            </div>
        `;
        carouselTrack.appendChild(item);
    });
    
    // Duplica para loop infinito
    const items = Array.from(carouselTrack.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carouselTrack.appendChild(clone);
    });
}

/* 
INSTRUÇÕES PARA PERSONALIZAR:

1. Para adicionar suas fotos pessoais:
   - Coloque as imagens na pasta do projeto
   - No HTML, substitua as divs com classe "image-placeholder" por:
     <img src="caminho/para/sua-foto.jpg" alt="Descrição" style="width: 100%; height: 100%; object-fit: cover; border-radius: inherit;">

2. Para adicionar imagens ao carrossel:
   - Adicione as imagens do carrossel na pasta
   - Use a função no console ou adicione ao final do arquivo:
   
   addCarouselImages([
       { src: 'images/anime1.jpg', alt: 'Anime 1' },
       { src: 'images/jogo1.jpg', alt: 'Jogo 1' },
       { src: 'images/anime2.jpg', alt: 'Anime 2' },
       // ... adicione mais imagens
   ]);

3. Para atualizar links das redes sociais:
   - No HTML, substitua os links nos ícones sociais com seus perfis reais
   - Atualize o número do WhatsApp em href="https://wa.me/5585999999999"

4. Para ajustar cores:
   - No arquivo styles.css, modifique as variáveis em :root
*/
