#!/bin/bash

if [ -d "app" ]; then

    cd app
    git clone https://git.heroku.com/stopgap-project.git

    if [ -d "stopgap-project" ]; then
        cd stopgap-project

        rm -rf ./*
        cp -r ../yarn.lock ../Procfile ../backend ../package.json ../requirements.txt ../README.md ../manage.py ../public ../src ../order_manager ../fields .
        git add .
        git commit -m "Added new deployment files."
        git push

        cd ..
        rm -rf stopgap-project
    else
        echo "Failed to clone the project from Heroku..."
        exit 1
    fi
    
else
    echo "Change to the root directory of the app..."
    exit 1
fi
