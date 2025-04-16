#!/bin/bash

export OLLAMA_HOST=0.0.0.0

echo "Iniciando Ollama..."
ollama serve &

sleep 10

echo "Cargando modelo..."
ollama pull deepseek-r1
ollama run deepseek-r1

tail -f /dev/null
