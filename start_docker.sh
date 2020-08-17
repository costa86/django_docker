#!/bin/bash

port=8000
echo Which mode? Options:
echo 1 - Development mode with SQLite 
echo 2 - Development mode with PosgreSQL
echo BOTH MODES WILL RUN ON DOCKER CONTAINERS

pm="python manage.py migrate"
pmm="python manage.py makemigrations"
cru="python manage.py createsuperuser"
open="firefox localhost:$port"

read mode
if [[ $mode -eq 1 ]];
then
    docker images
    notify-send "Pick an image"
    echo ----------------------
    echo "Docker image (listed above):"
    read img
    cd app/
    notify-send "image ${img}" "Will run container with current folder as volume. DB records will persist"
    docker run -p $port:$port --rm -v $(pwd):/usr/src/app/ $img python manage.py runserver 0.0.0.0:$port
    fuser -k $port/tcp
elif [[ $mode -eq 2 ]];
then
    notify-send "PostgreSQL + Docker" "Starting container..."
    docker-compose up -d
    notify-send "Container started"
    $open
else
    echo Choose either 1 or 2
fi