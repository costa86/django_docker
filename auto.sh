#!/bin/bash

git add .

echo Message:

read msg

git commit -m $msg

git push

notify-send "commit ${msg}"
