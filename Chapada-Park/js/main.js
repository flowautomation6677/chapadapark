document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const submenuItems = document.querySelectorAll('.has-submenu');
    const header = document.querySelector('header');

    // Função para abrir/fechar o menu mobile
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        const isExpanded = menuToggle.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        menuToggle.setAttribute('aria-label', isExpanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    }

    // Event listener para o botão do menu hambúrguer
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Toggle para submenus em mobile
    submenuItems.forEach(item => {
        const link = item.querySelector("a");
        if (link) {
            link.addEventListener("click", function(e) {
                // Previne o comportamento padrão apenas se for um submenu e em mobile
                if (item.classList.contains("has-submenu") && window.innerWidth <= 992) {
                    e.preventDefault();
                    item.classList.toggle("active");
                }
            });
        }
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (menuToggle && nav && !header.contains(e.target) && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Fechar menu ao redimensionar a janela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && nav.classList.contains('active')) {
            toggleMenu();
            submenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Scroll suave para âncoras
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Fechar menu mobile se estiver aberto
                    if (nav.classList.contains('active')) {
                        toggleMenu();
                    }
                }
            }
        });
    });

    // Animação de entrada dos cards (mantido do original)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.card, .accommodation-card, .content-wrapper');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Lazy loading para imagens (mantido do original)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Melhorar performance do scroll (mantido do original)
    let ticking = false;
    function updateHeader() {
        const scrolled = window.scrollY;
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Validação de formulários (mantido do original)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.addEventListener('input', function() {
                        this.classList.remove('error');
                    });
                } else {
                    field.classList.remove('error');
                }
            });
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });

    // Melhorar acessibilidade do teclado (mantido do original)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu();
        }
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('menu-toggle')) {
            e.preventDefault();
            e.target.click();
        }
    });

    // Prevenção de FOUC (Flash of Unstyled Content) (mantido do original)
    document.body.classList.add('js-loaded');
});

// Funções utilitárias (mantidas do original)
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 992;
}

function isDesktop() {
    return window.innerWidth > 992;
}

window.ChapadadParkUtils = {
    debounce,
    isMobile,
    isTablet,
    isDesktop
};



    // Tratamento para os botões 'SEJA SÓCIO'
    const btnSocioHeader = document.getElementById('btn-socio-header');
    const btnSocioConversion = document.getElementById('btn-socio-conversion');

    if (btnSocioHeader) {
        btnSocioHeader.addEventListener('click', function() {
            const target = document.querySelector('#area-socio');
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    if (btnSocioConversion) {
        btnSocioConversion.addEventListener('click', function() {
            const target = document.querySelector('#area-socio');
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }


