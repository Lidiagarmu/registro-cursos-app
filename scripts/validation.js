export const emailRegex = /^[^@]+@mail\.(com|es)$/;
export const telefonoRegex = /^\d{3}-\d{3}-\d{3}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

export function esEmailValido(email) {
  return emailRegex.test(email);
}

export function esTelefonoValido(tel) {
  return telefonoRegex.test(tel);
}

export function esPasswordValido(pass) {
  return passwordRegex.test(pass);
}
