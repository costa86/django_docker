#!/bin/bash


git add .

git -m cool

git push

notify-send "Hello world $(whoami)"
