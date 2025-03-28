const form = document.getElementById('loginForm');
const username = document.getElementById('username');
const password = document.getElementById('password');
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

function validarFormulario() {
    let esValido = true;

    // Validar nombre de usuario
    if (username.value.trim() === '') {
        usernameError.textContent = 'Por favor, ingrese su nombre de usuario';
        usernameError.style.display = 'block';
        esValido = false;
    } else {
        usernameError.style.display = 'none';
    }

    // Validar contraseña
    if (password.value.trim() === '') {
        passwordError.textContent = 'Por favor, ingrese su contraseña';
        passwordError.style.display = 'block';
        esValido = false;
    } else {
        passwordError.style.display = 'none';
    }

    return esValido;
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validarFormulario()) {
        // Aquí puedes agregar la lógica para enviar los datos al servidor
        // Por ahora, solo mostraremos un mensaje de éxito
        const datosHTML = `
            <div class="datos-mostrados">
                <h2>¡Bienvenido!</h2>
                <p>Has iniciado sesión correctamente.</p>
                <p>Usuario: ${username.value}</p>
                <button onclick="window.location.href='index.html'" class="submit-btn">Ir al inicio</button>
            </div>
        `;
        document.querySelector('.form-box').innerHTML = datosHTML;
    }
}); 