# Project 1: Shared shopping list

This is a course project for the course web software development. This readme cointains the necessary documentation to use and understand said project, how to use tests and so forth.

The webapp is a simple app for handling shopping lists. It allows the user to create lists, add items to said lists, mark items as collected and deactivate/remove shopping lists. The webapp is built using js, and meant to be deployed using docker. It can be ran locally, but is also deployed online on https://wsd-project1-1u2c.onrender.com (more on this later).

## Requirements
- Docker: the user needs docker to launch the webapp.

## Using the webapp
To run the website using docker, simply do
```
docker compose up
```
If everything works correctly, flyway will take care of setting up the initial postgres db and tables.

## Testing
Automated tests can be found in e2e-playwright/tests. There are currently five tests, that test these respective end to end functionalities:
* Checking the main / statistics page
* Adding a shopping list
* Adding an item to a list
* Marking an item as collected
* Deactivating a list

To run the tests (using a docker deployment), do:
```
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```
Observe! To get the tests to work smoothly, I found it easiest to first do docker compose down and docker compose up, to make sure that a) the database is empty and b) the service is up and running when the tests start, making sure there are no errors caused by this.

## Online deployment
This web service is deployed online at https://wsd-project1-1u2c.onrender.com . The service name is wsd-project1, and it is deployed using render. It utilizes a connection pool to a render-hosted postgres database, and environment variables to keep db credentials safe.

Notice that the free tier subscription on render causes the service to sometimes respond quite slowly. 



