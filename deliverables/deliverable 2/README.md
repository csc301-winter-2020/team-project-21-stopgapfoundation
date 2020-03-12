# StopGap Foundation Ramp Request System / TEAM 21

## Description 

 At this stage, our product allows a user to log in and submit ramp request information through a series of forms that they can fill out. They can also view the submitted information in a list-like format, in which clicking on an element of the list will bring up more detailed information regarding that request. 
 
 This system provides automatic storage and organization of ramp requests. Previously, StopGap collected this information through a form on their website, which simply placed the information given into a document. This was a hassle to work with, as trying to find specific information in this mess of data was difficult and time consuming. Our app organizes ramp requests in a way that makes them easy and intuitive to look through, and finding specific information on a request is as simple as picking that request out of a list and clicking on it.
 

## Key Features 
 We will go over the user stories that we have targeted with this deliverable and explain what features have been implemented regading them
 
#### As a business owner, I want to be able to give my personal information to StopGap so we can proceed with the ramp transaction:
 * The ramp request form has been set up, and users are able to enter information. Currently this information is not yet stored in the database, although the database has been set up to be able to store the information
 
#### As a StopGap product manager, I want to be able to capture measurements of the ramp so that I can better produce the ramp that the client is requesting
 * Similar to the above story, there is a field in the ramp request form for the user to enter ramp measurement information, and the database is set up in order to recieve this information, although they have not been connected yet.

#### As a business owner, I want to easily sign the liability waiver so that I can continue with the ramp ordering process (somewhat satisfied)
 * There is a field for the client to enter their full name and the full name of a witness, which we are treating as a signature for now, Like above, the database has been set up to hold this info, but the front and back end have not been tied together yet.
  
#### As a StopGap employee I want to be able to log in to the app as a StopGap user so I can access the features only available to users like me
 * The admin login and registration pages have been set up, although a proper account system has not yet. The admin exclusive features are only accessable past the admin login page. There is also code in the backend pertaining to storing account information, although the ends have not been tied together.
 
#### As a StopGap client I want to be able to create and log in to an account so that I can use the StopGap services.
* The client login and regitration pages have also been set up, altough once again a proper account system has not yet been set up. Client exclusive features can only be accessed beyond this login page. Like above, there is code in the backend pertaining to an account system, but the ends have not been tied together.

#### As a StopGap project manager, I want to easily see all the ramp information for each client in one place, so I can be better organized
* The dashboard for displaying ramp request has been designed, and it functional with some hard-coded data currently. It has not yet been integrated with the backend, although the backend does have code that stores the data that would be displayed.

#### As a StopGap employee, I want to create a dashboard that will show me the  total number of ramp requests, how many in next build, how many ramps scheduled for next paint day, total revenue for selected time period and delivered ramps, so that I can be up-to-date on business affairs.
* The dashboard has been set up to show some of this information, although the information displayed currently has been hard-coded. The information that can currently be displayed includes number of ramp requests, number of requests ready for build, number of completed requests, number of requests ready for paint, and number of requests ready for delivery.

#### As a StopGap client I want to be able to see the progress of my ramp request, so that I can have an idea of how long until it is completed.
* The client view has a list of requests from that account, and the progress for a request can be seen by clicking on that request in the list

## Instructions
 
The app is deployed and can be found at this link: http://stopgap-project.herokuapp.com/
 
There are two options on the first page: client view and admin view. 
 
Starting at client view, you are taken to a login page. The account system isn't properly set up yet, so any formatted email and password combination will do.
There is also a page allowing account creation, although this is also not fully set up outside of the text validation, ensuring you enter a proper email and matching
password.
 
At this point the client can press the large button that appears to submit a ramp request. They can also see a list of ramp requests they have currently submitted, and can click on them to see more details. Currently, the information displayed here is hardcoded.

They are also able to log out of their account, or go back to the home screen with those buttons. Information can be entered into the text boxes in order to submit the request, and there are multiple pages
of infomation to enter. Note that although the back-end is set up to be able to recieve and store this information, this front-end has not yet been tied to it, 
so information entered will not be stored in the database at this time.

The admin view also has a login page with the same level of functionality and implementation currently as the client view login page. 

Beyond this page is the dashboard for viewing ramp requests. Clicking on a ramp request in the list will bring up a screen displaying more detailed information about that request. The "go back" button will bring the user back to the list view, and the "log out" buttons will bring them back to the start screen

There is also an server admin view here: http://stopgap-project.herokuapp.com/admin with username 'admin' and password 'stopgapproject'. This allows direct access to the database, although many of the fields do not function funny right now.

 
 ## Development requirements
 
 #### Requirements:
	django>=2.0,<2.1
	django-filter>=1.1,<1.2
	djangorestframework>=3.8,<3.9
	pillow==7.0.0
	whitenoise==5.0.1
	django-heroku==0.3.1
	gunicorn==20.0.4
	dj-database-url==0.5.0

#### Starting/Updating the Application
1. Run:

        export NODE_ENV=local

	**If using Windows Powershell,** instead run:
	
		$env:NODE_ENV="local"
		               
2. Change directory into the app folder
3. Run:  
        yarn add package.json

4. Run:
        yarn build

5. Run:
        python manage.py collectstatic

6. Run:
        python manage.py runserver

#### Deployment instructions
1. Run:
        heroku login

2. Login to heroku

3. Change directory into app and run:

        yarn add package.json
       
to make sure there is a yarn.lock file

4. Change directory back into the root dir

5. Run:
        sudo deploy_app.sh	

 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

Currently, we only have two layers of branching: a master branch, and individual branches for each team member to do individual work. We merged the branches together during an in-person meeting, to ensure good communication that allowed us to easily deal with conflicts. Group members only pull from the master branch if they wish to get an updated version of the product, as the individual branches are often messy.

We ended up with this github workflow after delegating tasks to each group member, as by this point each group member who was working on code had an idea of what they needed to complete, and personal branches allowed them to work on their tasks with ease. In the future we will likely switch to a more layered system, with lower level development branches for newer and untested code, that everyone will contribute to. 

For deployment, we are only going to be using Heroku, in order to set up a server and give us a URL that allows others to access the app.

 ## Licenses 

We decided to go with the MIT License for our codebase. This license is extremely non-limiting, allowing just about anything to be done with our code, including commercial use and the creation of closed-source versions. Our product is intended to be a starting point for a more expansive ramp request system that StopGap will use in the future, With this in mind, we decided it’s most sensible to give them as much freedom as possible to do what they want with the product, and since they are able to make closed-source versions, they can protect any improved versions that they may create.
