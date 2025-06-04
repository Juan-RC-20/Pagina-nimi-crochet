// Función para rastrear pedidos
function rastrearPedido() {
    const ticketNumber = document.getElementById('ticket-number').value;
    const resultadoRastreo = document.getElementById('resultado-rastreo');

    if (!ticketNumber) {
        resultadoRastreo.innerHTML = '<p class="error">Por favor, ingrese un número de ticket.</p>';
        return;
    }

    // Aquí se simula una búsqueda de pedido
    // En un caso real, esto se conectaría con una base de datos
    const estadosPedido = {
        'TICKET001': 'En preparación',
        'TICKET002': 'En camino',
        'TICKET003': 'Entregado'
    };

    const estado = estadosPedido[ticketNumber.toUpperCase()];
    
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
}

// Función para manejar el menú responsive
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
});

// Animación suave para los enlaces de navegación
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

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('sharingan-overlay');
    const video = document.getElementById('sharingan-video');
    
    // Iniciar reproducción del video
    video.play();
    
    // Configurar temporizador para detener el video después de 4 segundos
    setTimeout(() => {
        video.pause();
        // Agregar fade out al overlay
        overlay.style.transition = 'opacity 1s';
        overlay.style.opacity = '0';
        
        // Remover el overlay después de la animación
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 1000);
    }, 4000);
}); 