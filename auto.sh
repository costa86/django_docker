#!/bin/bash


git add .

git commit -m cool

git push

notify-send "Hello world $(whoami)"
