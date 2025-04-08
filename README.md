# SemantiQ AI

**SemantiQ AI** es un sistema de análisis inteligente de documentos que integra inteligencia artificial para extraer información y responder preguntas basándose en documentos cargados por los usuarios. Mediante el uso de un sistema **Retrieval-Augmented Generation (RAG)**, el proyecto combina la recuperación de información con la generación de texto para proporcionar respuestas más precisas y contextualizadas. El objetivo principal es optimizar la consulta y gestión de documentos en entornos académicos y empresariales, facilitando el acceso a la información de manera automatizada.

## Instalación

### Requisitos
- `Docker` y `Docker Compose` instalados.
- (Opcional) `make` instalado para comandos más rápidos.

### Pasos de Instalación

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/looreenz/SemantiQ-AI.git
   ```

2. **Entrar en el repositorio**
   ```sh
   cd SemantiQ-AI
   ```

3. **Ejecutar `Docker Compose`**
   ```sh
   docker-compose up --build -d
   ```
   > Si tienes `make` instalado, puedes ejecutar el siguiente comando en su lugar:
   > ```sh
   > make up-build
   > ```
   > Puedes consultar el archivo `Makefile` en la carpeta `Docker` para ver otros atajos disponibles.

5. **Acceder a la aplicación**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - phpMyAdmin: [http://localhost:8080](http://localhost:8080)

---

Ahora ya puedes empezar a usar la aplicación. ¡Disfruta del desarrollo!

---

# SemantiQ AI (English)

**SemantiQ AI** is an intelligent document analysis system that integrates artificial intelligence to extract information and answer questions based on documents uploaded by users. Using a **Retrieval-Augmented Generation (RAG)** system, the project combines information retrieval with text generation to provide more precise and context-aware responses. The main goal is to optimize document query and management in academic and business environments, facilitating automated access to information.

## Installation

### Requirements
- `Docker` and `Docker Compose` installed.
- (Optional) `make` installed for faster commands.

### Installation Steps

1. **Clone the repository**
   ```sh
   git clone https://github.com/looreenz/SemantiQ-AI.git
   ```

2. **Enter the repository**
   ```sh
   cd SemantiQ-AI
   ```

3. **Run `Docker Compose`**
   ```sh
   docker-compose up --build -d
   ```
   > If you have `make` installed, you can run the following command instead:
   > ```sh
   > make up-build
   > ```
   > You can check the `Makefile` in the `Docker` folder for more shortcuts.

5. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - phpMyAdmin: [http://localhost:8080](http://localhost:8080)

---

You can now start using the application. Enjoy the development!
