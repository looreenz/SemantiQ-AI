# Variables
DOCKER_COMPOSE = docker-compose -f Docker/docker-compose.yaml
SERVICE_WEB = web
SERVICE_NODE = node

# Listar todos los contenedores levantados
ps:
	$(DOCKER_COMPOSE) ps

# Levantar los contenedores en segundo plano
up:
	$(DOCKER_COMPOSE) up -d

# Construir y levantar los contenedores en segundo plano
up-build:
	$(DOCKER_COMPOSE) up -d --build

# Detener y eliminar los contenedores
down:
	$(DOCKER_COMPOSE) down

# Mostrar logs en tiempo real
logs:
	$(DOCKER_COMPOSE) logs -f

# Acceder al contenedor del servicio web (Laravel)
bash:
	$(DOCKER_COMPOSE) exec -it $(SERVICE_WEB) bash

# Ejecutar comandos de Artisan dentro del contenedor de Laravel
migrate:
	$(DOCKER_COMPOSE) exec $(SERVICE_WEB) php artisan migrate

# Limpiar la caché de Laravel
cache-clear:
	$(DOCKER_COMPOSE) exec $(SERVICE_WEB) php artisan cache:clear

# Limpiar TODA la caché de Laravel
optimize:
	$(DOCKER_COMPOSE) exec $(SERVICE_WEB) php artisan optimize

# Acceder al contenedor del servicio web (Node)
sh:
	$(DOCKER_COMPOSE) exec -it $(SERVICE_NODE) sh

# Levantar frontend
run: 
	$(DOCKER_COMPOSE) exec $(SERVICE_NODE) npm run dev

# Levantar frontend
build: 
	$(DOCKER_COMPOSE) exec $(SERVICE_NODE) npm run build

# Reiniciar la API
restart:
	$(DOCKER_COMPOSE) restart $(SERVICE_WEB)

# Eliminar los volúmenes (⚠️ Borra la BD y datos persistentes)
clean:
	$(DOCKER_COMPOSE) down -v

.PHONY: ps up up-build down logs bash migrate cache-clear optimize sh run build restart clean
