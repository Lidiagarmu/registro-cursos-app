const emailRegex = /^[^@]+@mail\.(com|es)$/;
const telefonoRegex = /^\d{3}-\d{3}-\d{3}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

function esEmailValido(email) {
  return emailRegex.test(email);
}

function esTelefonoValido(tel) {
  return telefonoRegex.test(tel);
}

function esPasswordValido(pass) {
  return passwordRegex.test(pass);
}

module.exports = { esEmailValido, esTelefonoValido, esPasswordValido };
