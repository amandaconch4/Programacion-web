// Estado del carrito
let carrito = [];
let total = 0;

// Elementos del DOM
const carritoBtn = document.getElementById('carritoBtn');
const carritoModal = document.createElement('div');
carritoModal.className = 'carrito-modal';
document.body.appendChild(carritoModal);

// Crear estructura del modal
carritoModal.innerHTML = `
    <div class="carrito-header">
        <h2>Carrito de Compras</h2>
        <button class="cerrar-carrito">&times;</button>
    </div>
    <div class="carrito-items">
        <!-- Los items se agregarán aquí dinámicamente -->
    </div>
    <div class="carrito-total">
        <div class="total-row">
            <span>Subtotal:</span>
            <span>$0.00</span>
        </div>
        <div class="total-row">
            <span>IVA (16%):</span>
            <span>$0.00</span>
        </div>
        <div class="total-row final">
            <span>Total:</span>
            <span>$0.00</span>
        </div>
        <button class="checkout-btn">Proceder al pago</button>
    </div>
`;

// Funciones del carrito
function actualizarContador() {
    const contador = document.querySelector('.carrito-contador');
    contador.textContent = carrito.length;
}

function actualizarTotal() {
    const subtotal = carrito.reduce((sum, item) => sum + item.precio, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;

    const subtotalElement = carritoModal.querySelector('.total-row:nth-child(1) span:last-child');
    const ivaElement = carritoModal.querySelector('.total-row:nth-child(2) span:last-child');
    const totalElement = carritoModal.querySelector('.total-row.final span:last-child');

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    ivaElement.textContent = `$${iva.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function actualizarCarrito() {
    const carritoItems = carritoModal.querySelector('.carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="item-details">
                <h3>${item.nombre}</h3>
                <span class="item-price">$${item.precio.toFixed(2)}</span>
            </div>
            <button class="eliminar-item" data-index="${index}">&times;</button>
        `;
        carritoItems.appendChild(itemElement);
    });

    actualizarContador();
    actualizarTotal();
}

// Event Listeners
carritoBtn.addEventListener('click', () => {
    carritoModal.classList.add('activo');
});

carritoModal.querySelector('.cerrar-carrito').addEventListener('click', () => {
    carritoModal.classList.remove('activo');
});

carritoModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-item')) {
        const index = parseInt(e.target.dataset.index);
        carrito.splice(index, 1);
        actualizarCarrito();
    }
});

// Función para agregar items al carrito
function agregarAlCarrito(nombre, precio, imagen) {
    carrito.push({ nombre, precio, imagen });
    actualizarCarrito();
    carritoModal.classList.add('activo');
}

// Ejemplo de uso:
// agregarAlCarrito('Nombre del juego', 59.99, 'ruta/a/la/imagen.jpg'); 