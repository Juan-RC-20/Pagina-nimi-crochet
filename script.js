// Función para mejorar el rendimiento de los event listeners
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Función para optimizar las animaciones
const requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

// Inicialización optimizada
document.addEventListener('DOMContentLoaded', () => {
    // Cache de elementos DOM frecuentemente usados
    const navbar = document.querySelector('.navbar');
    const videos = {
        desktop: document.getElementById('sharingan-video'),
        mobile: document.getElementById('mobile-video')
    };
    const overlay = document.getElementById('sharingan-overlay');

    // Optimización del scroll
    let lastScroll = 0;
    const handleScroll = debounce(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > lastScroll && currentScroll > 100) {
            requestAnimFrame(() => {
                navbar.style.transform = 'translateY(-100%)';
            });
        } else {
            requestAnimFrame(() => {
                navbar.style.transform = 'translateY(0)';
            });
        }
        lastScroll = currentScroll;
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimización de reproducción de video
    const setupVideo = (video) => {
        if (!video) return;
        
        video.addEventListener('loadedmetadata', () => {
            if (video.height >= 2160) {
                requestAnimFrame(() => {
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'cover';
                });
            }
        });

        video.playbackQuality = 'high';
        video.playbackRate = 1.0;
    };

    // Detección de dispositivo optimizada
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const activeVideo = isMobile ? videos.mobile : videos.desktop;

    if (activeVideo) {
        setupVideo(activeVideo);
        activeVideo.play();
        setTimeout(() => {
            activeVideo.pause();
            requestAnimFrame(() => {
                overlay.style.animation = 'fadeOut 1.5s forwards';
            });
        }, 5000);
    }

    // Optimización de navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Sistema de rastreo optimizado
    const rastrearPedido = debounce(() => {
        const ticketNumber = document.getElementById('ticket-number').value;
        const resultadoRastreo = document.getElementById('resultado-rastreo');

        if (!ticketNumber) {
            resultadoRastreo.innerHTML = '<p class="error">Por favor, ingrese un número de ticket.</p>';
            return;
        }

        const estadosPedido = {
            'TICKET001': 'En preparación',
            'TICKET002': 'En camino',
            'TICKET003': 'Entregado'
        };

        const estado = estadosPedido[ticketNumber.toUpperCase()];
        
        requestAnimFrame(() => {
            if (estado) {
                resultadoRastreo.innerHTML = `
                    <div class="resultado-success">
                        <h3>Estado del Pedido</h3>
                        <p>Ticket: ${ticketNumber}</p>
                        <p>Estado: ${estado}</p>
                    </div>
                `;
            } else {
                resultadoRastreo.innerHTML = '<p class="error">Ticket no encontrado. Por favor, verifique el número.</p>';
            }
        });
    }, 300);

    // Event listener para rastreo
    const btnRastrear = document.querySelector('.btn-primary[onclick="rastrearPedido()"]');
    if (btnRastrear) {
        btnRastrear.onclick = null;
        btnRastrear.addEventListener('click', rastrearPedido);
    }

    // Carga diferida de imágenes
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    };

    // Iniciar lazy loading si el navegador lo soporta
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // Animación del logo graffiti
    const logoLetters = document.querySelectorAll('.logo-graffiti span');
    
    // Aplicar retraso a cada letra
    logoLetters.forEach((letter, index) => {
        letter.style.animationDelay = `${index * 0.1}s`;
    });

    // Efecto de spray al hacer hover
    const logoGraffiti = document.querySelector('.logo-graffiti');
    if (logoGraffiti) {
        logoGraffiti.addEventListener('mouseover', () => {
            // Crear efecto de partículas de spray
            const createSprayParticle = () => {
                const particle = document.createElement('div');
                particle.className = 'spray-particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                logoGraffiti.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 500);
            };

            // Crear múltiples partículas
            for (let i = 0; i < 10; i++) {
                setTimeout(createSprayParticle, i * 50);
            }
        });
    }
});

// Agregar estilos dinámicos para las partículas
const style = document.createElement('style');
style.textContent = `
    .spray-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: currentColor;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: particleSpray 0.5s ease-out forwards;
    }

    @keyframes particleSpray {
        0% {
            transform: scale(0) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Función para cargar productos dinámicamente
function cargarProductos() {
    const productos = {
        amigurumis: [
            {
                imagen: 'amigurumi-conejo.jpg',
                nombre: 'Amigurumi Conejo',
                descripcion: 'Tierno conejo tejido a mano',
                precio: 'COP 85.000'
            },
            {
                imagen: 'amigurumi-unicornio.jpg',
                nombre: 'Amigurumi Unicornio',
                descripcion: 'Mágico unicornio multicolor',
                precio: 'COP 95.000'
            }
        ],
        accesorios: [
            {
                imagen: 'bufanda-invierno.jpg',
                nombre: 'Bufanda de Invierno',
                descripcion: 'Bufanda suave y cálida',
                precio: 'COP 65.000'
            },
            {
                imagen: 'gorro-tejido.jpg',
                nombre: 'Gorro Tejido',
                descripcion: 'Gorro con diseño único',
                precio: 'COP 45.000'
            }
        ],
        ropa: [
            {
                imagen: 'chaleco-tejido.jpg',
                nombre: 'Chaleco Tejido',
                descripcion: 'Chaleco elegante y cómodo',
                precio: 'COP 120.000'
            },
            {
                imagen: 'sueter-crochet.jpg',
                nombre: 'Suéter de Crochet',
                descripcion: 'Suéter artesanal con diseño único',
                precio: 'COP 150.000'
            }
        ],
        decoracion: [
            {
                imagen: 'cesta-decorativa.jpg',
                nombre: 'Cesta Decorativa',
                descripcion: 'Perfecta para organizar',
                precio: 'COP 75.000'
            },
            {
                imagen: 'tapete-mandala.jpg',
                nombre: 'Tapete Mandala',
                descripcion: 'Hermoso tapete tejido a mano',
                precio: 'COP 180.000'
            }
        ]
    };

    // Función para mostrar productos por categoría
    function mostrarProductos(categoria) {
        const productosGrid = document.querySelector('.productos-grid');
        productosGrid.innerHTML = ''; // Limpiar grid actual
        
        productos[categoria].forEach(producto => {
            const productoCard = document.createElement('div');
            productoCard.className = 'producto-card';
            productoCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">${producto.precio}</p>
                <button class="btn-primary">Agregar al Carrito</button>
            `;
            productosGrid.appendChild(productoCard);
        });
    }

    // Agregar event listeners para los enlaces de categorías
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const categoria = e.target.getAttribute('href').replace('#', '');
            mostrarProductos(categoria);
        });
    });

    // Mostrar productos iniciales (amigurumis por defecto)
    mostrarProductos('amigurumis');
}

// Cargar productos cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProductos); 