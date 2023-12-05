# Project 1: Shared shopping list

Write the documentation of your project here. Do not include your personal
details (e.g. name or student number).

Remember to include the address of the online location where your project is
running as it is a key part of the submission.

## Using the webapp
To run the website using docker, simply do
```
docker compose up
```

## Testing
Automated tests can be found in e2e-playwright/tests. There are currently five tests, that test respective end to end functionality.
To run the tests (using a docker deployment), do:
```
docker compose run --entrypoint=npx e2e-playwright playwright test && docker compose rm -sf
```
Observe! To get the tests to work smoothly, I found it easiest to first do docker compose down and docker compose up, to make sure that a) the database is empty and b) the service is up and running when the tests start, making sure there are no errors caused by this.


## Requirements

### Project structure

The project is returned as a zip, where the root folder of the zip has a docker-compose.yml file that is used to launch the project and a README.md file that contains project documentation.
The application is in a folder called shopping-lists.
The folder flyway has a folder sql that has the SQL scripts used to initiate the database -- this is done automatically when launching the project with docker compose up.

### Application structure

The application is launched using a file called app.js, which is in the root folder of the application (folder shopping-lists in the returned zip).
Dependencies are defined in a file called deps.js, which exports them into use of the project.
The names of the source code files and the folders are understandable and convey their meaning.
The application follows a three-tier architecture.
Application uses a layered architecture with views, controllers, services, and database.

### Main page       DONE

By default, the application starts on the port 7777 and when run locally, can be accessed at http://localhost:7777.
The main page, at http://localhost:7777, has a title "Shared shopping lists" and statistics (outlined later in this document).
The main page has a link with the text "Lists" that links the user to the path /lists.

### Shopping lists   DONE

GET request to /lists shows a form that can be used to add shopping lists, and a list of existing shopping lists. Only shopping lists that are active are shown (active as in the value of active in the database is true).
The form shown at /lists has a text input field with the attribute name that is used to input the name of a new shopping list. Submitting the form is done with a POST request to the path /lists.
Adding a new shopping list with the form at /lists uses the POST/Redirect/GET -pattern. After creating a new shopping list, users are redirected to /lists.
In the list of existing shopping lists, shown for a GET request to /lists, each shopping list is a link to a shopping list -specific page. The links are structured as /lists/{id}, where {id} corresponds to the database id of the specific shopping list.
In the list of existing shopping lists, shown for a GET request to /lists, next or below to each shopping list is a submit button with the text Deactivate list!. The button is within a form; clicking the button makes a POST request to /lists/{id}/deactivate, where {id} corresponds to the database id of the associated shopping list. This deactivates the shopping list, i.e. sets the value of active to false, after which the user is redirected to /lists.
The page listing the shopping lists and allowing the creation of new shopping lists has a link to the main page (i.e. to /). The text of the link is "Main page".

### Viewing individual shopping lists DONE

GET request to /lists/{id}, where {id} corresponds to the database id of a shopping list, shows a shopping list -specific page.
The shopping list -specific page shows the name of the shopping list, a form for adding items to the shopping list, and a list of existing items in the shopping list.
The shopping list -specific page has a link to the page with all the shopping lists (i.e. to /lists). The text of the link is "Shopping lists".

### Adding items to a shopping list DONE

The form for adding items, shown when making a GET request to /lists/{id}, has a text input field with the attribute name that is used to input the name of the item that is being added to the shopping list.
The form for adding items is submitted using a POST request to the path /lists/{id}/items, where {id} corresponds to the database id of the specific shopping list.
Adding an item uses the POST/Redirect/GET -pattern. After an item has been added to the list, the user is redirected to the path /lists/{id}, where {id} corresponds to the database id of the specific shopping list.

### Listing and collecting items DONE

The shopping list -specific page, shown when making a GET request to /lists/{id} shows a list of existing items (in addition to the name of the shopping list and the form used for adding items to the shopping list).
For each listed item, the name of the item is shown.
Next to the name of the item, or after the name, a submit button with the text Mark collected! is shown.
The Mark collected! button is inside a form, which, when submitted, makes a POST request to /lists/{id}/items/{item_id}/collect, where {id} corresponds to the database id of the specific shopping list and {item_id} to the database id of the specific item.
A POST request to /lists/{id}/items/{item_id}/collect marks the item as collected, i.e. sets the value of collected in the database to true. After the item has been collected, the user is redirected to the path /lists/{id}, where {id} corresponds to the database id of the specific shopping list.
When showing an item that has been collected, the name of the item is striked though. Implement this functionality using the del HTML element.
The items in the shopping list are shown in alphabetic order so that the list first contains all uncollected items in alphabetic order, followed by all collected items in alphabetic order, i.e.
Milk
Oranges
Wheat
Apples
Coffee

### Statistics DONE

The main page at / shows statistics for the application. Namely, the page contains the number of created shopping lists and the number of created items. These are shown in a list as follows (in the following example, there are 3 shopping lists and 5 shopping list items):
Shopping lists: 3
Shopping list items: 5
The numbers include both the active and deactive shopping lists and the collected and uncollected items.
If there are no shopping lists in the database, instead of the above statistics, the text "No shopping lists yet." is shown.

### Database 

Real database credentials are not included in the submission code.
Database uses a connection pool.

### Automated tests

The project comes with at least five meaningful end to end tests that can be used to test the functionality of the application.

### Views DONE

Views are stored in a separate folder.
User interface uses a layout.

### Documentation and online deployment

The documentation for the project is written into the README.md -file in the root folder of the project (i.e. the same folder with the docker-compose.yml -file)
The application has been deployed to an online location (e.g. Fly.io), it works there, and the address for the online location is given in the README.md file.
The README.md outlines project specific that has:
The name of the application
A brief description of the application
The location where the application has been deployed and where one can test it, if an online deployment exists.
Guidelines for running the application locally (you can assume that participants have docker-compose).

### Usability DONE?

The application feels intuitive to use.
For the redirections, use the status code 303

## TODO:
1. ~~ Download the starter template for the project. ~~
2. ~~ Create a folder structure for the project into the shopping-lists folder. We highly recommend following the structure shown in "Application Example I". ~~
3. ~~ Create the functionality for adding and listing shopping lists. ~~ Create tests for the functionality.
4. Create the functionality for showing a single shopping list. Create tests for the functionality.
5. Create the functionality for adding and listing items for a single shopping list. Create tests for the functionality.
6. Create the functionality for marking items in the shopping list as collected. Create tests for the functionality.
7. Create the functionality for deactivating shopping lists. Create tests for the functionality.
8. Deploy the application online.
9. Write any necessary documentation, including the link to the address where the application has been deployed into.
10. Verify that all your changes have been saved.
11. Zip the project and submit it.