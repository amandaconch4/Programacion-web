const form = document.getElementById('recuperarPasswordForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validarEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validarFormulario() {
    let esValido = true;

    // Validar correo electrónico
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Por favor, ingrese su correo electrónico';
        emailError.style.display = 'block';
        esValido = false;
    } else if (!validarEmail(emailInput.value)) {
        emailError.textContent = 'Por favor, ingrese un correo electrónico válido';
        emailError.style.display = 'block';
        esValido = false;
    } else {
        emailError.style.display = 'none';
    }

    return esValido;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarFormulario()) {
        // Aquí iría la lógica para enviar el correo de recuperación
        // Por ahora, solo mostraremos un mensaje de éxito
        const datosHTML = `
            <div class="datos-mostrados">
                <h2>¡Correo enviado!</h2>
                <p>Se ha enviado un enlace de recuperación a tu correo electrónico.</p>
                <p>Por favor, revisa tu bandeja de entrada.</p>
                <button onclick="window.location.href='login.html'" class="submit-btn">Volver al login</button>
            </div>
        `;
        document.querySelector('.form-box').innerHTML = datosHTML;
    }
}); 