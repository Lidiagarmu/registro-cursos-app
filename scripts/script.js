const emailRegex = /^[^@]+@mail\.(com|es)$/;
const telefonoRegex = /^\d{3}-\d{3}-\d{3}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Validación positiva al salir del campo (blur)
document.querySelectorAll('#registroForm input[required], #registroForm select[required]').forEach(el => {
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
    document.getElementById('registroForm').reset();
    document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
  }, 1000);
});

function mostrarModal(mensaje, success = false) {
  document.getElementById('modalMensaje').textContent = mensaje;
  const modalContent = document.getElementById('modalContenido');
  modalContent.classList.remove('success', 'error');
  modalContent.classList.add(success ? 'success' : 'error');

  const modal = new bootstrap.Modal(document.getElementById('mensajeModal'));
  modal.show();
}
