# 💡 Autor

Desarrollado por Lidia Garcia Muñoz

# 📚 Registro de Cursos App

Una aplicación web sencilla y atractiva para registrar estudiantes en distintos cursos formativos. Ofrece validaciones en tiempo real, feedback visual y un diseño moderno enfocado en la experiencia del usuario.

## 🚀 Tecnologías Utilizadas

- **HTML5**
- **CSS3** (Diseño personalizado con enfoque en Dark UI)
- **JavaScript (Vanilla)** para validación de formularios y comportamiento dinámico
- **Bootstrap 5.3** para estilos y componentes
- **Bootstrap Icons** para mejorar la accesibilidad visual

## 📸 Características

- Validación de campos al momento y al enviar el formulario.
- Feedback visual instantáneo (errores, éxito, requisitos de contraseña).
- Evaluación dinámica de la fortaleza de la contraseña con barra.
- Modal de confirmación al finalizar el registro.
- Formulario responsive con diseño oscuro moderno.
- Opciones dinámicas para cursos y selección de país para prefijos telefónicos.

## 🔧 Requisitos Previos

- Tener instalado **Visual Studio Code**
- Extensión recomendada: **Live Server**

## 🖥️ Cómo Desplegar la App Localmente

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Lidiagarmu/registro-cursos-app.git

   ```

2. Abre la carpeta del proyecto en Visual Studio Code:

   ```bash
   cd registro-cursos-app

   ```

3. Haz clic derecho sobre el archivo index.html y selecciona:

"Open with Live Server"

4. ¡Listo! Se abrirá la app en tu navegador y podrás probar el formulario de registro.

## Estructura del proyecto

registro-cursos-app/
├── index.html ----------> ESTRUCTURA
├── styles/ ----------> DISEÑO
│ └── style.css
├── scripts/
│ └── script.js ----------> INTERACTIVIDAD
│ └── validation.js ----------> LÓGICA PARA PRUEBAS
├── resources/
│ └── fondo.jpg
├── tests/ ----------> PRUEBAS AUTOMÁTICAS
│ └── validation.test.js

## ✅ Validaciones del formulario

Nombre: Obligatorio

Correo: Solo correos @mail.com o @mail.es

Teléfono: Formato 600-123-456

Contraseña: Mínimo 8 caracteres, mayúscula, minúscula, número, símbolo

Confirmación de contraseña: Debe coincidir

Curso: Selección obligatoria
