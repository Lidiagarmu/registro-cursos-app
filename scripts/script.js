/**
 * Expresión regular para validar correos con dominio @mail.com o @mail.es
 * @type {RegExp}
 */
const emailRegex = /^[^@]+@mail\.(com|es)$/;

/**
 * Expresión regular para validar números de teléfono con formato 000-000-000
 * @type {RegExp}
 */
const telefonoRegex = /^\d{3}-\d{3}-\d{3}$/;

/**
 * Expresión regular para validar contraseñas seguras:
 * mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo.
 * @type {RegExp}
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

/**
 * Añade eventos de validación positiva al salir de cada input/select del formulario (blur)
 */
document.querySelectorAll('#registroForm input, #registroForm select').forEach(el => {
    el.addEventListener('blur', () => {
      validarCampoIndividual(el, true);
    });
  });
  



  /**
 * Valida un campo individual del formulario según su ID
 * @param {HTMLInputElement | HTMLSelectElement} el - Elemento a validar
 * @param {boolean} [soloPositivo=false] - Si se debe validar solo para aplicar estilo positivo
 */
function validarCampoIndividual(el, soloPositivo = false) {
  const id = el.id;
  const valor = el.value.trim();
  let invalido = false;
  let mensaje = '';

  switch (id) {
    case 'nombre':
      invalido = valor === '';
      mensaje = 'Este campo es obligatorio';
      break;
    case 'correo':
      if (valor === '') {
        invalido = true;
        mensaje = 'Este campo es obligatorio';
      } else if (!emailRegex.test(valor)) {
        invalido = true;
        mensaje = 'Introduce un correo válido (ejemplo@mail.com)';
      }
      break;
    case 'telefono':
      if (valor === '') {
        invalido = true;
        mensaje = 'Este campo es obligatorio';
      } else if (!telefonoRegex.test(valor)) {
        invalido = true;
        mensaje = 'Introduce un número válido con formato (600-123-456)';
      }
      break;
    case 'contrasena':
      if (valor === '') {
        invalido = true;
        mensaje = 'Este campo es obligatorio';
      } else if (!passwordRegex.test(valor)) {
        invalido = true;
        mensaje = 'La contraseña no cumple con los requisitos';
      }
      break;
    case 'confirmar':
      const pass = document.getElementById('contrasena').value.trim();
      if (valor !== pass) {
        invalido = true;
        mensaje = 'Las contraseñas deben coincidir';
      } 
      break;
    case 'curso':
      invalido = valor === '';
      mensaje = 'Selecciona un curso';
      break;
       default:
      if (valor !== '') {
        el.classList.add('is-valid');
        el.classList.remove('is-invalid');
      } else {
        el.classList.remove('is-valid');
        // No marcamos como inválido si el campo es opcional
        if (!el.required) return;
        invalido = true;
        mensaje = 'Este campo es obligatorio';
      }


  }

  const feedback = el.parentElement.querySelector('.invalid-feedback') 
  || el.closest('.mb-3')?.querySelector('.invalid-feedback');


if (feedback) {
  if (invalido) {
    feedback.textContent = mensaje;
    feedback.style.display = 'block';
  } else {
    feedback.textContent = '';
    feedback.style.display = 'none';
  }
}




  if (!soloPositivo || id === 'confirmar') {
    el.classList.toggle('is-invalid', invalido);
  }

  if (!invalido && valor !== '') {
    el.classList.add('is-valid');
    el.classList.remove('is-invalid');
  } else {
    el.classList.remove('is-valid');
  }
}



/**
 * Valida todos los campos requeridos del formulario
 */
function validarCampos() {
  const campos = document.querySelectorAll('#registroForm input[required], #registroForm select[required]');
  campos.forEach(el => {
    validarCampoIndividual(el);
  });
}

/**
 * Maneja el evento de envío del formulario de registro
 */
document.getElementById('registroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  validarCampos();

  const hayErrores = [...document.querySelectorAll('#registroForm input[required], #registroForm select[required]')]
    .some(el => el.classList.contains('is-invalid'));

  if (hayErrores) {
    mostrarModal("Por favor, completa correctamente todos los campos requeridos.", false);
    return;
  }

  // Simulación de registro exitoso
  setTimeout(() => {
    mostrarModal("¡Registro completado con éxito!", true);
  }, 500);
});


/**
 * Estado global para saber si el registro fue exitoso
 * @type {boolean}
 */
let fueRegistroExitoso = false; // Estado global


/**
 * Muestra un modal con mensaje de éxito o error
 * @param {string} mensaje - Mensaje a mostrar
 * @param {boolean} [success=false] - Define si es un mensaje de éxito
 */
function mostrarModal(mensaje, success = false) {
  fueRegistroExitoso = success; // <-- ACTUALIZA ESTADO

  document.getElementById('modalMensaje').textContent = mensaje;
  const modalContent = document.getElementById('modalContenido');
  modalContent.classList.remove('success', 'error');
  modalContent.classList.add(success ? 'success' : 'error');

  const modal = new bootstrap.Modal(document.getElementById('mensajeModal'));
  modal.show();
}

/**
 * Maneja el evento `input` de la contraseña para mostrar requisitos y barra de progreso
 */
const passwordInput = document.getElementById('contrasena');
const passwordStrengthBar = document.querySelector('#passwordStrengthBar .progress-bar');

passwordInput.addEventListener('input', () => {
  const pass = passwordInput.value;

  const checks = {
    length: pass.length >= 8,
    uppercase: /[A-Z]/.test(pass),
    lowercase: /[a-z]/.test(pass),
    number: /\d/.test(pass),
    symbol: /[!@#$%^&*(),.?":{}|<>_\-+=\\[\]]/.test(pass)
  };

  // Actualizar textos de los requisitos
  document.getElementById('req-length').textContent = (checks.length ? '✅' : '🔸') + ' Mínimo 8 caracteres';
  document.getElementById('req-uppercase').textContent = (checks.uppercase ? '✅' : '🔸') + ' Una letra mayúscula';
  document.getElementById('req-lowercase').textContent = (checks.lowercase ? '✅' : '🔸') + ' Una letra minúscula';
  document.getElementById('req-number').textContent = (checks.number ? '✅' : '🔸') + ' Un número';
  document.getElementById('req-symbol').textContent = (checks.symbol ? '✅' : '🔸') + ' Un carácter especial';

  // ✅ Color del texto según si se cumple o no
  Object.keys(checks).forEach(key => {
    const el = document.getElementById(`req-${key}`);
    el.classList.toggle('text-success', checks[key]);
    el.classList.toggle('text-light', !checks[key]); // Usa 'text-light' en lugar de 'text-muted'
  });
  

  // Actualizar barra de progreso
  const cumplidos = Object.values(checks).filter(v => v).length;
  const porcentaje = cumplidos * 20;

  passwordStrengthBar.style.width = `${porcentaje}%`;

  passwordStrengthBar.classList.remove('bg-danger', 'bg-warning', 'bg-info', 'bg-success');
  if (porcentaje <= 40) {
    passwordStrengthBar.classList.add('bg-danger');
  } else if (porcentaje <= 60) {
    passwordStrengthBar.classList.add('bg-warning');
  } else if (porcentaje <= 80) {
    passwordStrengthBar.classList.add('bg-info');
  } else {
    passwordStrengthBar.classList.add('bg-success');
  }
});

/**
 * Maneja el cierre del modal para limpiar y resetear el formulario si el registro fue exitoso
 */
const modal = document.getElementById('mensajeModal');
modal.addEventListener('hidden.bs.modal', () => {
  if (!fueRegistroExitoso) return; // 🛑 Si no fue éxito, no resetees

  const form = document.getElementById('registroForm');
  form.reset();

 // Ocultar feedbacks de error
  form.querySelectorAll('.invalid-feedback').forEach(el => {
    el.style.display = 'none';
    el.textContent = ''; // Opcional, por limpieza
  });
  
   // Resetear estilos de validación visual (.is-valid / .is-invalid)
   form.querySelectorAll('input, select').forEach(el => {
    el.classList.remove('is-valid', 'is-invalid');
  });


  // Resetear requisitos contraseña
  const requisitos = {
    length: '• Al menos 8 caracteres',
    uppercase: '• Una mayúscula (A–Z)',
    lowercase: '• Una minúscula (a–z)',
    number: '• Un número (0–9)',
    symbol: '• Un carácter especial (!@#...)'
  };

  for (let clave in requisitos) {
    const el = document.getElementById(`req-${clave}`);
    el.textContent = requisitos[clave];
    el.classList.remove('text-success');
    el.classList.add('text-light');
  }

  // Reset barra de progreso
  passwordStrengthBar.style.width = '0%';
  passwordStrengthBar.className = 'progress-bar';
});



