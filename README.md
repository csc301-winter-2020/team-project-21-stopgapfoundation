# Local Setup Guidelines

## Starting the application
1) Run:
    export NODE_ENV="development"
2) Change directory into the cloned repository
3) Run:
    docker-compose -f docker-compose.yml up --build -d


## After making changes:
1) Run:
    docker-compose down
    docker-compose -f docker-compose.yml up --build -d