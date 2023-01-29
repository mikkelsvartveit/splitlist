FROM php:8.0-apache
WORKDIR /var/www/html
ENV DOCKER=true

RUN docker-php-ext-install mysqli pdo pdo_mysql

COPY / .
EXPOSE 80
