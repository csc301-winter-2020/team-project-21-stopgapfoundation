#!/bin/bash

cd app
git clone https://git.heroku.com/stopgap-project.git
cd stopgap-project

rm -rf ./*
cp -r ../yarn.lock ../Procfile ../backend ../package.json ../requirements.txt ../README.md ../manage.py ../public ../src ../order_manager ../fields .
git add .
git commit -m "Added new deployment files."
git push

cd ..
rm -rf stopgap-project
