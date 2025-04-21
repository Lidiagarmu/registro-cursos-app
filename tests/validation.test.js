/**
 * @jest-environment jsdom
 */
import { emailRegex, telefonoRegex, passwordRegex } from '../script';

test('Email válido', () => {
  expect(emailRegex.test('ejemplo@mail.com')).toBe(true);
  expect(emailRegex.test('invalido.com')).toBe(false);
});

test('Teléfono válido', () => {
  expect(telefonoRegex.test('600-123-456')).toBe(true);
  expect(telefonoRegex.test('123456789')).toBe(false);
});

test('Contraseña válida', () => {
  expect(passwordRegex.test('Abcd1234!')).toBe(true);
  expect(passwordRegex.test('abcd1234')).toBe(false);
});
