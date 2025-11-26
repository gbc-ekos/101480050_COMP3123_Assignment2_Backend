# COMP 3123 - Assignment 2 - Backend
### By  Eduard Kosenko, 101480050


libraries used:
"bcrypt": "^6.0.0",
"express": "^5.1.0",
"express-validator": "^7.2.1",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.19.1"

## Installation
populate .env file (sample provided in .env.example)<br>
npm install (or npm ci)<br>
npm start 

## Structure
/config - configures database connection<br>
/middleware - contains middleware functions<br>
/models - contains database models<br>
/routes - contains routes exposed to public<br>
/app.js - main file<br>

## Routes structure
Each route has a defined router module, validator module and controller module.<br>
Validator module includes applicable express-validator function arrays.<br>
Router module defines routes and applies any relevant middleware functions.<br>
Controller.js module contain actual logic, expecting already validated input data.

## Models
Models have extra validation layer for redundancy.
Some instance methods are defined for ease of use (see user.js - checkPassword), or have pre-save middleware defined to contain business logic to the repository level.

## Exception handling
Middleware functions were populated to handle most common exceptions in generic fashion (i.e. general 400 error handler, generic mongoose error handler, etc.)