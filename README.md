# Local Setup Guidelines

## Starting/Updating the Application

1) Run:

        export NODE_ENV=local

	
	On Windows (powershell) instead run:
	
		$env:NODE_ENV="local"
		
                
2) Change directory into the app folder
3) Run:
        
        yarn add package.json

4) Execute:

        yarn build
	
5) Apply any database changes:

        python manage.py makemigrations
        python manage.py migrate
		python manage.py migrate --run-syncdb

6) Run:

        python manage.py collectstatic

7) Run:

        python manage.py runserver
		
Also if you change anything on the model, do:

	Delete db.sqlite3
	
and then step 5, to ensure those
changes are detected by the server.


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
