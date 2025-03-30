const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const passwordError = document.getElementById('password-error');

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById('toggleIcon-' + inputId);
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = "password";
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function validarContraseña(contraseña) {
    const tieneNumero = /[0-9]/.test(contraseña);
    const tieneMayuscula = /[A-Z]/.test(contraseña);
    const longitudCorrecta = contraseña.length >= 6 && contraseña.length <= 18;

    if (!longitudCorrecta) {
        passwordError.textContent = 'La contraseña debe tener entre 6 y 18 caracteres';
        passwordError.style.display = 'block';
        return false;
    }

    if (!tieneNumero) {
        passwordError.textContent = 'La contraseña debe contener al menos un número';
        passwordError.style.display = 'block';
        return false;
    }

    if (!tieneMayuscula) {
        passwordError.textContent = 'La contraseña debe contener al menos una letra mayúscula';
        passwordError.style.display = 'block';
        return false;
    }

    passwordError.style.display = 'none';
    return true;
}

// Event Listeners para validación
usernameInput.addEventListener('invalid', function(e) {
    e.preventDefault();
    if (!this.validity.valid) {
        usernameError.textContent = 'Por favor, ingrese su nombre de usuario';
        usernameError.style.display = 'block';
    } else {
        usernameError.textContent = '';
        usernameError.style.display = 'none';
    }
});

usernameInput.addEventListener('input', function() {
    if (this.validity.valid) {
        usernameError.textContent = '';
        usernameError.style.display = 'none';
    }
});

passwordInput.addEventListener('invalid', function(e) {
    e.preventDefault();
    if (!this.validity.valid) {
        passwordError.textContent = 'Por favor, ingrese su contraseña';
        passwordError.style.display = 'block';
    } else {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
    }
});

passwordInput.addEventListener('input', function() {
    if (this.validity.valid) {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!usernameInput.validity.valid) {
        usernameError.textContent = 'Por favor, ingrese su nombre de usuario';
        usernameError.style.display = 'block';
        return;
    }

    if (!passwordInput.validity.valid) {
        passwordError.textContent = 'Por favor, ingrese su contraseña';
        passwordError.style.display = 'block';
        return;
    }

    // Aquí iría la lógica de autenticación
    mostrarMensajeExito();
});

function mostrarMensajeExito() {
    const formBox = document.querySelector('.form-box');
    formBox.innerHTML = `
        <div class="mensaje-exito">
            <h2>¡Inicio de sesión exitoso!</h2>
            <p>Bienvenido de vuelta.</p>
            <a href="index.html" class="submit-btn">Ir al inicio</a>
        </div>
    `;
} 