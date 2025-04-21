const emailRegex = /^[^@]+@mail\.(com|es)$/;
const telefonoRegex = /^\d{3}-\d{3}-\d{3}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Validación positiva al salir del campo (blur)
document.querySelectorAll('#registroForm input, #registroForm select').forEach(el => {
    el.addEventListener('blur', () => {
      validarCampoIndividual(el, true);
    });
  });
  

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
      if (valor === '') {
        invalido = true;
        mensaje = 'Este campo es obligatorio';
      } else if (valor !== pass) {
        invalido = true;
        mensaje = 'Las contraseñas deben coincidir';
      }
      break;
    case 'curso':
      invalido = valor === '';
      mensaje = 'Selecciona un curso';
      break;
      default:
  // Si no es obligatorio pero tiene contenido, lo marcamos como válido
  if (valor !== '') {
    el.classList.add('is-valid');
    el.classList.remove('is-invalid');
  } else {
    el.classList.remove('is-valid');
  }
  return; // Evitamos continuar el resto de validación

  }

  const feedback = el.closest('.mb-3').querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = mensaje;

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

function validarCampos() {
  const campos = document.querySelectorAll('#registroForm input[required], #registroForm select[required]');
  campos.forEach(el => {
    validarCampoIndividual(el);
  });
}

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

function mostrarModal(mensaje, success = false) {
  document.getElementById('modalMensaje').textContent = mensaje;
  const modalContent = document.getElementById('modalContenido');
  modalContent.classList.remove('success', 'error');
  modalContent.classList.add(success ? 'success' : 'error');

  const modal = new bootstrap.Modal(document.getElementById('mensajeModal'));
  modal.show();
}

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


const modal = document.getElementById('mensajeModal');
modal.addEventListener('hidden.bs.modal', () => {
  const form = document.getElementById('registroForm');
  form.reset();
  form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
    el.classList.remove('is-valid', 'is-invalid');
    // Reiniciar estado de requisitos de contraseña
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
  
  // Resetear barra de progreso
  passwordStrengthBar.style.width = '0%';
  passwordStrengthBar.className = 'progress-bar';
  
  });
});
