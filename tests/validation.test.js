import { esEmailValido, esTelefonoValido, esPasswordValido } from '../scripts/validation';

describe('Validaciones de formulario', () => {

  // ----------------------------- CORREO -----------------------------
  describe('Validación de correo electrónico', () => {
    test('Correo válido con dominio .com', () => {
      expect(esEmailValido('usuario@mail.com')).toBe(true);
    });

    test('Correo válido con dominio .es', () => {
      expect(esEmailValido('usuario@mail.es')).toBe(true);
    });

    test('Correo inválido sin dominio correcto', () => {
      expect(esEmailValido('usuario@gmail.com')).toBe(false);
    });

    test('Correo inválido sin @', () => {
      expect(esEmailValido('usuariomail.com')).toBe(false);
    });
  });

  // ----------------------------- TELÉFONO -----------------------------
  describe('Validación de número de teléfono', () => {
    test('Teléfono válido', () => {
      expect(esTelefonoValido('600-123-456')).toBe(true);
    });

    test('Teléfono sin guiones', () => {
      expect(esTelefonoValido('600123456')).toBe(false);
    });

    test('Teléfono con letras', () => {
      expect(esTelefonoValido('abc-123-456')).toBe(false);
    });
  });

  // ----------------------------- CONTRASEÑA -----------------------------
  describe('Validación de contraseña', () => {
    test('Contraseña válida', () => {
      expect(esPasswordValido('Aa1@abcd')).toBe(true);
    });

    test('Falta letra mayúscula', () => {
      expect(esPasswordValido('aa1@abcd')).toBe(false);
    });

    test('Falta carácter especial', () => {
      expect(esPasswordValido('Aa1abcd')).toBe(false);
    });

    test('Falta número', () => {
      expect(esPasswordValido('Aa@abcdx')).toBe(false);
    });

    test('Demasiado corta', () => {
      expect(esPasswordValido('Aa1@a')).toBe(false);
    });
  });

});
