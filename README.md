# SemantiQ AI

**SemantiQ AI** és un sistema d’anàlisi intel·ligent de documents que integra intel·ligència artificial per extreure informació i respondre preguntes basant-se en documents carregats pels usuaris. Mitjançant l’ús d’un sistema **Retrieval-Augmented Generation (RAG)**, el projecte combina la recuperació d'informació amb la generació de text per proporcionar respostes més precises i contextualitzades. L’objectiu principal és optimitzar la consulta i gestió de documents en entorns acadèmics i empresarials, facilitant l’accés a la informació de manera automatitzada.

## Instalación

### Requisitos
- `Docker` y `Docker Compose` instalados.  
- (Opcional) `make` instalado para comandos más rápidos.

### Pasos de Instalación

1. Clonar el repositorio
    ```bash
    git clone https://github.com/looreenz/SemantiQ-AI.git
    ```

2. Entrar en el repositorio
    ```bash
    cd SemantiQ-AI
    ```

3. Entrar en la carpeta `Docker`
    ```bash
    cd Docker
    ```

4. Ejecutar `Docker Compose`
    ```bash
    docker-compose up --build -d
    ```
    > Si tienes `make` instalado, puedes ejecutar el siguiente comando en su lugar:
    > ```bash
    > make up-build
    > ```
    > Puedes consultar el archivo `Makefile` en la carpeta `Docker` para ver otros atajos disponibles.

5. Acceder a la aplicación
    - Frontend: http://localhost:5173
    - phpMyAdmin: http://localhost:8080

Ahora ya puedes empezar a usar la aplicación. ¡Disfruta del desarrollo!
