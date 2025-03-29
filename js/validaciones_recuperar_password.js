const form = document.getElementById('recuperarPasswordForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

function validarEmail(email) {
    const formatoValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const caracteresPermitidos = /^[a-zA-Z0-9._%+-@]+$/.test(email.split('@')[0]);
    const dominioValido = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.split('@')[1]);

    const reqFormato = document.getElementById('req-email-formato');
    const reqCaracteres = document.getElementById('req-email-caracteres');
    const reqDominio = document.getElementById('req-email-dominio');

    reqFormato.className = formatoValido ? 'valido' : 'invalido';
    reqCaracteres.className = caracteresPermitidos ? 'valido' : 'invalido';
    reqDominio.className = dominioValido ? 'valido' : 'invalido';

    return formatoValido && caracteresPermitidos && dominioValido;
}

// Event Listeners
emailInput.addEventListener('input', function() {
    const esValido = validarEmail(this.value);
    if (!esValido) {
        emailInput.setCustomValidity('Por favor, cumple todos los requisitos del correo electrónico');
    } else {
        emailInput.setCustomValidity('');
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarEmail(emailInput.value)) {
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