# Code-Op MVP

![This is an image](./my-app/client/src/images/logo.png)

## Project Description

### **The problem**

Climbers struggle finding consistent belay partners.

### **How this app will solve it**

BelayMe connects climbers based on their level, location, gender and schedule.

## **Userflow**

![This is an image](/userflow.png)

### **Features Phase 1**

- User can set-up/edit personal profile
- User gets matched with others climbers based on:
  - Location
  - Level
  - Lead certified or not
  - Days
  - Gender

You can find a live version of phase 1 [here](https://climbingapp.herokuapp.com/)

### **Future features**

- Account authentication & verification
- User can select multiple levels and genders in preferences
- User can specify time of day  (i.e. morning, lunch, afternoon, evening) in preferences
- User can add pre-defined interest categories/tags to profile
- User can send/accept contact request
- User can message once contact request accepted
- User can see list of connected climbers (i.e. matched & accepted connection request)
- User can see list of climbers pending connected climbers (i.e. sent connection request, but not yet accepted)
- User can link IG profile to climber profile
- User can bookmark other climbers until user decides to send connection request
- User gets notification when other user interacts i.e. send connection request, new message
- User can choose to allow/disable notifications

## **Technical Specs**

### **Technologies**

- React
- Express
- Node.js (v16.14.2)
- Bootstrap
- MySQL
- RAPID API - IP Geo Location

### API Routes

#### Route 1

- URL: "/users"
- METHOD: GET
- Description: Gets all users
- Req Body: N/A
- Res Obj: {uID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: Boolean, level: string}

#### Route 2

- URL: "/users/:id"
- METHOD: GET
- Description: Gets user info by id
- Req Body: N/A
- Res Obj: {uID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 3

- URL: "/users"
- METHOD: POST
- Description: Adds new user to db
- Req Body {username: string, pronouns: string, avatar: url, bio: string,  location: string, tope: Boolean, lead: boolean, level: string, gender: string}
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 4

- URL: "/users/:id"
- METHOD: PUT
- Description: Edits user info in db
- Req Body {username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: boolean, level: string, gender: string}
- Res Obj: {uID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 5

- URL: "/users/recommend"
- METHOD: POST
- Description: Gets recommended users based on matching criteria in Req Body
- Req Body: {location, top, lead, level, days, gender }
- Res Obj: {uID: integer, firstname: string, lastname: string, email: string, username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string, gender: string}

#### Route 6

- URL: "/users/days"
- METHOD: POST
- Description: Adds days a user climbs to db
- Req Body: {uID, day}
- Res Obj: {uID: number, dID: number, day: string}

### Database Info

DATABASE 'users' > TABLES 'user_info' & 'days'

TABLE 'user_info'

- uID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- firstname VARCHAR() NOT NULL; String
- lastname VARCHAR() NOT NULL; String
- email VARCHAR() String
- username VARCHAR() String
- pronouns VARCHAR() String
- avatar VARCHAR(); String
- bio VARCHAR(); String
- location VARCHAR() String
- top BINARY(); Boolean
- level VARCHAR(); String
- gender VARCHAR(); String

TABLE 'days'

- dID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- uID INT NOT NULL FOREIGN KEY; Number ----- REFERENCES user_info.UID
- day VARCHAR(20); String

## **Setup Instructions**

### Dependencies

- `cd my-app` and run `npm install` in project directory. This will install server dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies.

### Database Prep

- Access the MySQL interface in terminal by running `mysql -u root -p`
- Create a new database called users: `create database users`
- Add a `.env` file to the climbing-app folder of this repo containing MySQL authentication information:

```
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=users
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the `my-app` folder in a new terminal window. This will create the 'user_info' and 'days' tables in your database and populate with fake user info.**

**If npm run migrate doesn't work, seperate instructions are in days.sql and user_info.sql to set-up tables directly via MySQL interface.

### External API Prep

- Go to `https://rapidapi.com/damngoodapis/api/geolocation`. You will need to create an account to access the API Key.
- Add a `.env` file to the client folder containing your API Key:

```
REACT_APP_API_KEY=YOUR_KEY
```

### Development

- `cd my-app` and run `npm start` in to start the Express server on port 5002
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000

