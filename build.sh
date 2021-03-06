#!/bin/bash

port=8000
echo "Keep in mind that this will build a new image, create a DB and a new superuser"
echo "Which mode? Options:"
echo "1 - Development mode with SQLite (WITHOUT DOCKER)"
echo "2 - Development mode with PosgreSQL (WITH DOCKER)"

pm="python manage.py migrate"
pmm="python manage.py makemigrations"
cru="python manage.py createsuperuser"
open="firefox localhost:$port/admin"

read mode
if [[ $mode -eq 1 ]];
then
    notify-send "SQLite" "Creating DB..."
    cd app/
    $pm
    notify-send "Create user"
    $cru
    $open & python manage.py runserver
    fuser -k $port/tcp
elif [[ $mode -eq 2 ]];
then
    notify-send "PostgreSQL + Docker" "Starting container..."
    docker-compose up -d --build
    docker-compose exec web $pmm
    docker-compose exec web $pm
    notify-send "Create user"
    docker-compose exec web $cru
    $open
else
    echo Choose either 1 or 2
fi