# BelayMe

## Project Description

### **The problem**

Climbers struggle finding consistent belay partners.

### **How this app will solve it**

BelayMe connects climbers based on their level, location, gender and schedule.

## Userflow

![This is an image](/BelayMe%20UserFlow.png)

### Features Phase 1

- User can set-up/edit personal profile
- User get matched with others climbers based on:
  - Location
  - Level
  - Lead certified or not
  - Days
  - Gender

### **Future features**

- Account set-up process, including email verification & T&Cs
- Add geolocation API to location filter, suggesting user's current location
- User can select multiple levels and genders looking for matches
- User can send/accept contact request
- User can message once contact request accepted
- User can see list of connected climbers (i.e. matched & accepted connection request)
- User can see list of climbers pending connected climbers (i.e. sent connection request, but not yet accepted)
- User can link IG profile to climber profile
- User can add time of day  i.e. morning, lunch, afternoon, evening as filter
- User can add pre-defined interest categories to profile
- User can find/search climbers based on username
- User can bookmark other climbers until user decides to send connection request
- User gets notification when other user interacts i.e. send connection request, new message
- User can choose to allow/disable notifications

## **Technical Specs**

### **Technologies**

- React
- React Router
- Node.js
- Bootstrap
- mySQL

### API Routes

#### Route 1

- URL: "/users"
- METHOD: GET
- Description: Gets all users
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: Boolean, level: string}

#### Route 2

- URL: "/users/:id"
- METHOD: GET
- Description: Gets user info by id
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 3

- URL: "/users"
- METHOD: POST
- Description: Adds new user to db
- Req Body {username: string, pronouns: string, avatar: url, bio: string,  location: string, tope: Boolean, lead: boolean, level: string, gender: string}
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 4

- URL: "/users/:id"
- METHOD: PUT
- Description: Edit user info in db
- Req Body {username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: boolean, level: string, gender: string}
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 5

- URL: "/users/recommend"
- METHOD: POST
- Description: Gets recommended users based on matching criteria in Req Body
- Req Body: {location, top, lead, level, days, gender }
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

### Database info

MAIN DATABASE = 'users' - containing two table, 'user_info' and 'days'

TABLE 1: USER_INFO

- uID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- firstname VARCHAR() NOT NULL; String
- lastname VARCHAR() NOT NULL; String
- email VARCHAR() NOT NULL; String
- username VARCHAR() NOT NULL; String
- pronouns VARCHAR() NOT NULL; String
- avatar VARCHAR(); String
- bio VARCHAR(); String
- location VARCHAR() NOT NULL; String
- top BINARY(); Boolean
- level VARCHAR(); NOT NULL; String
- gender VARCHAR(); String

TABLE 2: DAYS

- dID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- uID INT NOT NULL FOREIGN KEY; Number
- day VARCHAR(20)

## **Setup Instructions**

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install` , `npm install react-router-dom` and `npm install --save react-toastify`. This will install client dependencies (React, React Router and React Tostify (for pop-up messages).

### Database Prep

- Access the MySQL interface in terminal by running `mysql -u root -p`
- Create a new database called users: `create database users`
- Add a `.env` file to the project folder of this repository containing MySQL authentication information:
  - DB_HOST=localhost
  - DB_USER=root
  - DB_NAME=users
  - DB_PASS=YOURPASSWORD

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a tables called 'user_info' and 'days' in your database.**

- Populate 'user_info' and 'days' tables with the MYSQL COMMANDS in:

  - model/days.sql
  - model/user_info.sql

**If npm run migrate doesn't work, seperate instructions are included in model files to set-up tables in MYSQL interfact directly.

### Development

- Run `npm start` in project directory to start the Express server on port 5002
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000
