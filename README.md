# Fieldhouse-Manager

### Start the Program
To start the web server and programs run this in the terminal
```
npm run dev
```

### Instructions on how to use mongoose to manipulate mongoDB database
https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/#inserting-data----method-2

-------------------------------------------------------------------------------------------

### Meeting 11/25
    - Look at the linked documentation (^^^) and index.js to see basics on finding uploading and deleting data from out database
    - Look at models/ folder to see the mongoDB schemas for our database. Note how schemas can point to objects in other schemas AND that schemas can store lists of data
    - The web server and example code can be started with ```npm run dev``` 
    - Make sure to install all packages (I believe it it just dotenv and mongodb but maybe there's more)
    - There is a necessary .env file that I emailed everyone that needs to be placed in the root for the Database to connect

    #### What else we need to do:
    - Page allowing logged in users to create reservations
    - Page allowing logged in users to view reservations
    - Way for admin to change schema?