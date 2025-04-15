#!/bin/bash

# Inicia el servidor Ollama en segundo plano
ollama serve &

# Espera a que el servidor esté disponible
sleep 5

# Arranca el modelo
ollama run deepseek-r1

# Mantiene el contenedor activo
tail -f /dev/null
