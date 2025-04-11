# SemantiQ AI

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

3. **Copy environment files content**
   - Copy the `agent-api/.env.exemple` file content into a `agent-api/.env` file
   - Copy the `frontend/.env.exemple` file content into a `frontend/.env` file

4. **Run `Docker Compose`**
   ```sh
   cd Doker
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
