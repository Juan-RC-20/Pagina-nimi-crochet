document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const form = document.getElementById('personalizacion-form');
    const precioTotal = document.getElementById('precio-total');
    const colorPrincipal = document.getElementById('color-principal');
    const colorSecundario = document.getElementById('color-secundario');
    const tamaño = document.getElementById('tamaño');
    const accesorios = document.querySelectorAll('input[name="accesorios"]');
    const referenciaInput = document.getElementById('referencia');
    const previewImage = document.getElementById('preview-image');

    // Precios base por tamaño
    const preciosPorTamaño = {
        'pequeño': 25000,
        'mediano': 35000,
        'grande': 45000,
        'extra-grande': 60000
    };

    // Precios por accesorio
    const preciosPorAccesorio = {
        'lazo': 5000,
        'flores': 8000,
        'botones': 3000,
        'bordado': 10000
    };

    // Función para calcular el precio total
    function calcularPrecioTotal() {
        let precio = preciosPorTamaño[tamaño.value];

        // Sumar precio de accesorios seleccionados
        accesorios.forEach(accesorio => {
            if (accesorio.checked) {
                precio += preciosPorAccesorio[accesorio.value];
            }
        });

        // Actualizar el precio en la interfaz
        precioTotal.textContent = `$${precio.toLocaleString()}`;
    }

    // Evento para actualizar el precio cuando cambia el tamaño
    tamaño.addEventListener('change', calcularPrecioTotal);

    // Evento para actualizar el precio cuando cambian los accesorios
    accesorios.forEach(accesorio => {
        accesorio.addEventListener('change', calcularPrecioTotal);
    });

    // Manejar la vista previa de la imagen de referencia
    referenciaInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Recopilar datos del formulario
        const formData = {
            tamaño: tamaño.value,
            colorPrincipal: colorPrincipal.value,
            colorSecundario: colorSecundario.value,
            detalles: document.getElementById('detalles').value,
            accesorios: Array.from(accesorios)
                .filter(acc => acc.checked)
                .map(acc => acc.value),
            precio: precioTotal.textContent
        };

        // Aquí puedes agregar la lógica para enviar los datos al carrito
        // Por ahora, mostraremos un mensaje de confirmación
        alert('¡Producto personalizado agregado al carrito!\n' + 
              `Precio total: ${formData.precio}`);
        
        // Opcional: redirigir al carrito
        // window.location.href = 'carrito.html';
    });

    // Calcular precio inicial
    calcularPrecioTotal();
}); 