# Automatización de Pruebas E2E - OrangeHRM

Este repositorio contiene un framework de automatización de pruebas End-to-End (E2E) desarrollado para validar las funcionalidades y la interfaz de usuario de la aplicación web [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/).

## 🚀 Tecnologías Utilizadas

El proyecto está construido con herramientas modernas de automatización y reportería para asegurar la fiabilidad de las pruebas:

- **[Playwright](https://playwright.dev/)**: Framework de automatización principal para las pruebas E2E, garantizando una ejecución rápida y confiable en múltiples navegadores.
- **[TypeScript](https://www.typescriptlang.org/)**: Lenguaje de tipado estricto utilizado para escribir casos de prueba más robustos, limpios y mantenibles.
- **[Allure Report](https://allurereport.org/)**: Sistema de reportería integrado (`allure-playwright`) que proporciona reportes visuales interactivos y detallados, incluyendo el manejo de severidades (ej. *blocker*, *critical*, *trivial*).
- **Node.js & npm**: Entorno de ejecución de JavaScript y gestor de paquetes.

## 📁 Estructura del Proyecto

El repositorio emplea un enfoque basado en utilidades y separación de conceptos (similar al patrón Page Object Model) para abstraer las interacciones con el navegador:

- **`/tests/auth/`**: Casos de prueba relacionados con el inicio de sesión y la autenticación.
- **`/tests/recruitment/`**: Casos de prueba centrados en el módulo de recursos humanos (Candidatos y Vacantes).
- **`/tests/ui/`**: Validaciones visuales y de comportamiento de la interfaz de usuario.
- **Archivos `*-utils.ts`**: Clases auxiliares que encapsulan la lógica de interacción con cada página.
- **Archivos `mock-*.json`**: Datos de prueba (fixtures) utilizados para inyectar información predecible a las pruebas.

## 🧪 Casos de Prueba Implementados

Actualmente, el repositorio automatiza y cubre los siguientes flujos críticos y visuales:

### 1. Autenticación (Auth)
- **Login exitoso**: Inicio de sesión utilizando credenciales válidas.
- **Login fallido**: Verificación del mensaje de error al introducir credenciales inválidas.
- **Seguridad (Inyección SQL)**: Verificación del comportamiento del sistema frente a intentos de inyección SQL en el formulario de login.

### 2. Módulo de Reclutamiento (Recruitment)
- **Creación de Candidato**: Flujo completo para registrar un nuevo `Candidate` con datos válidos y verificar el mensaje de éxito.
- **Creación de Vacante**: Flujo completo para registrar una nueva `Vacancy` con información válida y asegurar que se guarde correctamente.

### 3. Interfaz de Usuario y Navegación (UI)
- **Validación Visual de Login**: Comprobación del color de la estructura principal (layout) en la página de inicio.
- **Menú Lateral (Sidebar)**:
  - Verificación del orden y la existencia de los botones principales del menú.
  - Comprobación del motor de búsqueda interno del menú filtrando por la letra "D".
  - Comprobación del motor de búsqueda interno del menú filtrando por la letra "A".

## 🛠️ Cómo Ejecutar las Pruebas

Para correr el proyecto localmente, asegúrate de haber instalado las dependencias primero:

```bash
npm install
```

El archivo `package.json` incluye varios scripts preconfigurados para facilitar la ejecución y análisis de resultados:

### Ejecución de Pruebas
- **Ejecución en segundo plano (Headless)**:
  ```bash
  npm run test
  ```
- **Ejecución de forma visual (Headed)**:
  ```bash
  npm run test:headed
  ```
- **Ejecución usando Google Chrome**:
  ```bash
  npm run test:chrome
  ```

### Reportes
- **Ver Reporte de Playwright** (Reporte nativo HTML):
  ```bash
  npm run report
  ```
- **Ver Reporte de Allure** (Reporte avanzado con métricas):
  ```bash
  npm run allure:open
  ```
  *(Nota: Los resultados de Allure se guardan en el directorio `./allure-results` de forma automática tras cada ejecución gracias a la configuración de `playwright.config.ts`).*
