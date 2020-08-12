#!/bin/bash
notify-send "START" "Container starting"
docker-compose up -d
notify-send "Container started. Create user"
#docker-compose exec web python manage.py createsuperuser
#notify-send "END" "User created"

