# App de Registro de Alumnos

Aplicación web creada para la asignatura "Desarrollo Web Entorno Cliente".

## Funcionalidades

- Registro con validaciones en tiempo real
- Expresiones regulares para validar:
  - Correo electrónico
  - Teléfono con formato internacional
  - Contraseñas fuertes
- Modal de Bootstrap para mostrar mensajes
- Envío de formulario con Fetch API
- Tests con Jest

## Scripts

- `npm install`
- `npm test`

## Estructura

- `index.html`: Estructura del formulario
- `style.css`: Estilos y efectos `focus`
- `script.js`: Validaciones y envío con `fetch`
- `__tests__/validation.test.js`: Pruebas con Jest
