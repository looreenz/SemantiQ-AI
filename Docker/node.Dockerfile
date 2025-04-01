FROM node:20.17-alpine

# Configurar un directorio para paquetes globales del usuario node
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Cambiar al usuario node


# Crear estructura completa de directorios para npm global
RUN mkdir -p /home/node/.npm-global && \
    mkdir -p /home/node/.npm-global/lib && \
    mkdir -p /home/node/.npm-global/bin && \
    mkdir -p /home/node/.cache/npm

# Configurar npm para usar el nuevo directorio
RUN npm config set prefix '/home/node/.npm-global'

# Instalar paquetes globales como el usuario node

WORKDIR /app