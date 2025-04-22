const { esEmailValido, esTelefonoValido, esPasswordValido } = require('../scripts/validation');

test('Email válido', () => {
  expect(esEmailValido('lidia@mail.com')).toBe(true);
});

test('Email inválido', () => {
  expect(esEmailValido('lidia@gmail.com')).toBe(false);
});

test('Teléfono válido', () => {
  expect(esTelefonoValido('123-456-789')).toBe(true);
});

test('Teléfono inválido', () => {
  expect(esTelefonoValido('123456789')).toBe(false);
});

test('Password válida', () => {
  expect(esPasswordValido('Hola1234!')).toBe(true);
});

test('Password inválida', () => {
  expect(esPasswordValido('hola')).toBe(false);
});
