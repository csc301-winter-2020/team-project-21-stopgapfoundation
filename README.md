# Local Setup Guidelines

## Starting/Updating the Application

1) Change directory into the app folder
2) Run:
        
        yarn add package.json

3) Execute:

        yarn build

3) Run:

        python manage.py collectstatic

4) Run:

        python manage.py runserver

## Deployment instructions
1) Run:

        heroku login

2) Login to heroku
3) Change directory into app and run:

        yarn add package.json
        
to make sure there is a yarn.lock file
4) Change directory back into the root dir
5) Run:

        sudo deploy_app.sh