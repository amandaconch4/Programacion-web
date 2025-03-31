document.addEventListener('DOMContentLoaded', () => {
    cargarResumenCarrito();
    configurarFormularioPago();
});

function cargarResumenCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartSummaryElement = document.getElementById('cartSummary');
    const totalAmountElement = document.getElementById('totalAmount');
    let total = 0;

    cartSummaryElement.innerHTML = '';

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="cart-item-details">
                <h3>${item.nombre}</h3>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio unitario: $${item.precio}</p>
                <p>Subtotal: $${subtotal}</p>
            </div>
        `;

        cartSummaryElement.appendChild(itemElement);
    });

    totalAmountElement.textContent = `Total a pagar: $${total}`;
}

function configurarFormularioPago() {
    const form = document.getElementById('paymentForm');
    
    // Formatear número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16);
    });

    // Formatear fecha de vencimiento
    const expiryDateInput = document.getElementById('expiryDate');
    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });

    // Formatear CVV
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aquí se procesaría el pago con un servicio real
        alert('¡Pago procesado con éxito!');
        
        // Limpiar el carrito
        localStorage.setItem('carrito', JSON.stringify([]));
        
        // Redirigir a la página principal
        window.location.href = 'index.html';
    });
}
