FROM php:8.3-apache

# Instalar extensiones y dependencias necesarias
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    nano \
    libonig-dev \
    libxml2-dev \
    # npm \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql mbstring gd xml

# Instalar Xdebug
RUN pecl install xdebug && docker-php-ext-enable xdebug
COPY Docker/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar los archivos del proyecto
COPY Docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY ./agent-api ./agent-api

# Dar permisos a la carpeta de almacenamiento y bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/agent-api/storage /var/www/html/agent-api/bootstrap/cache
RUN chmod -R 775 /var/www/html/agent-api/storage /var/www/html/agent-api/bootstrap/cache

# Establecer el directorio de trabajo
WORKDIR /var/www/html/agent-api

COPY Docker/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh