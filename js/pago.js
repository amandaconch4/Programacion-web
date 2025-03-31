document.addEventListener('DOMContentLoaded', () => {
    cargarResumenCarrito();
    configurarFormularioPago();
});

// Función para formatear números en formato de pesos chilenos
function formatearPrecio(precio) {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

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
                <p>Precio unitario: $${formatearPrecio(item.precio)}</p>
                <p>Subtotal: $${formatearPrecio(subtotal)}</p>
            </div>
        `;

        cartSummaryElement.appendChild(itemElement);
    });

    totalAmountElement.textContent = `Total a pagar: $${formatearPrecio(total)}`;
}

function configurarFormularioPago() {
    const form = document.getElementById('paymentForm');
    
    // Formato número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');
    const cardError = document.createElement('div');
    cardError.className = 'error-message';
    cardNumberInput.parentNode.appendChild(cardError);

    cardNumberInput.addEventListener('input', (e) => {
        // Eliminar cualquier carácter que no sea número
        let value = e.target.value.replace(/\D/g, '');
        
        // Limitar a 16 dígitos
        value = value.slice(0, 16);
        
        // Agregar espacios cada 4 dígitos
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        // Actualizar el valor del input
        e.target.value = formattedValue;

        // Validar que tenga exactamente 16 dígitos
        if (value.length > 0 && value.length < 16) {
            cardError.textContent = 'El número de tarjeta debe tener 16 dígitos';
            cardNumberInput.setCustomValidity('El número de tarjeta debe tener 16 dígitos');
        } else {
            cardError.textContent = '';
            cardNumberInput.setCustomValidity('');
        }
    });

    // Formatear y validar fecha de vencimiento
    const expiryDateInput = document.getElementById('expiryDate');
    const expiryError = document.createElement('div');
    expiryError.className = 'error-message';
    expiryDateInput.parentNode.appendChild(expiryError);

    expiryDateInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;

        // Validar la fecha cuando tenga el formato completo (MM/YY)
        if (value.length === 5) {
            const [month, year] = value.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Obtener últimos 2 dígitos del año
            const currentMonth = currentDate.getMonth() + 1; // Los meses en JS son 0-11

            const inputMonth = parseInt(month);
            const inputYear = parseInt(year);

            // Validar que el mes esté entre 1 y 12
            if (inputMonth < 1 || inputMonth > 12) {
                expiryError.textContent = 'Mes inválido';
                expiryDateInput.setCustomValidity('Mes inválido');
                return;
            }

            // Validar que la fecha no sea anterior a la actual
            if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
                expiryError.textContent = 'La tarjeta está vencida';
                expiryDateInput.setCustomValidity('La tarjeta está vencida');
                return;
            }

            // Si pasa todas las validaciones
            expiryError.textContent = '';
            expiryDateInput.setCustomValidity('');
        }
    });

    // Formatear CVV
    const cvvInput = document.getElementById('cvv');
    const cvvError = document.createElement('div');
    cvvError.className = 'error-message';
    cvvInput.parentNode.appendChild(cvvError);

    cvvInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '').slice(0, 3);
        e.target.value = value;
        
        // Validar que tenga exactamente 3 dígitos
        if (value.length > 0 && value.length < 3) {
            cvvError.textContent = 'El CVV debe tener 3 dígitos';
            cvvInput.setCustomValidity('El CVV debe tener 3 dígitos');
        } else {
            cvvError.textContent = '';
            cvvInput.setCustomValidity('');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener el número de tarjeta sin espacios para procesar
        const cardNumber = cardNumberInput.value.replace(/\s/g, '');
        
        // Limpiar el carrito
        localStorage.setItem('carrito', JSON.stringify([]));
        
        // Mostrar el modal de éxito
        const modal = document.getElementById('successModal');
        modal.classList.add('show');
    });
}

// Función para volver al inicio
function volverAlInicio() {
    window.location.href = 'index.html';
}
