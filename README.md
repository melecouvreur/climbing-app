# Climbing-app

## **The problem**

Climbers struggle finding consistent belay partners that match their skills, schedule and location.

## **How this app will solve it**

It will connect fellow climbers based on matching skills, schedule and location

## **How is it different from other apps**

It will focus solely on matching climbers and solving this specific problem. Keeping it simple, but prioritizing user experience and needs

## Features Phase 1

- User can create, edit and delete climber profile containing:

  - Name
  - Email
  - Username
  - Pronouns
  - Profile pic
  - Bio

- User can edit match preferences/filters containing:
  - Location
  - Climbing category i.e. top rope & lead
  - Skill level
  - Days

- User can filter/match with others climbers based on preferences

## **Technologies**

- React
- Node.js
- Bootstrap
- mySQL

## **Future Features**

- Account and profile set-up user flow including email verification & T&Cs
- User can send/accept connection request to matched/filtered climbers
- User can message once connection request accepted
- User can see list of connected climbers (i.e. matched & accepted connection request)
- User can see list of climbers of who sent connection request, but have not yet accepted
- User can link IG profile to climber profile
- User can add time of Day  i.e. morning, lunch, afternoon, evening as filter
- User can add pre-defined interest categories to profile
- User can find/search climbers based on username (irrespective of match)
- User can follow/bookmark other climbers until user decides to send connection request
- User gets notification when other user interacts i.e. send connection request, new message
- User can choose to allow/disable notifications

## API Routes

### Route 1

- URL: "/users"
- METHOD: GET
- Description: Gets all users
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, avatar: url, bio: string, location: string, top: Boolean, lead: Boolean, level: string}

### Route 2

- URL: "/users/:id"
- METHOD: GET
- Description: Gets user info by id
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: Boolean, level: string}

### Route 3

- URL: "/users"
- METHOD: POST
- Description: Adds new user to db
- Req Body {username: string, pronouns: string, avatar: url, bio: string,  location: string, tope: Boolean, lead: boolean, level: string}
- Res Obj {
}

### Route 4

- URL: "/users/:id"
- METHOD: PUT
- Description: Edit user info in db
- Req Body {username: string, pronouns: string, avatar: url, bio: string,  location: string, top: Boolean, lead: boolean, level: string}
- Res Obj {
}

### Route 5

- URL: "/users/recommend"
- METHOD: POST
- Description: Gets recommended users based on matching criteria in Req Body
- Req Body: {location, top, lead, level, days }
- Res Obj: {username: string, username: string, pronouns: string, avatar: url, bio: string, location: string, lead: Boolean, top: boolean, level: string}

## Database

USER_INFO

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
- lead BINARY(); Boolean
- level VARCHAR(); NOT NULL; String

DAYS

- dID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- uID INT NOT NULL FOREIGN KEY; Number
- day VARCHAR(20)

MY SQL COMMANDS TO SET UP DATABASES

USER_INFO DATABASE:

`CREATE TABLE user_info (
uID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
firstname VARCHAR(40) NOT NULL,
lastname VARCHAR(40) NOT NULL,
username VARCHAR(40),
email VARCHAR(40),
pronouns VARCHAR(40),a
avatar VARCHAR(5000),
bio VARCHAR(5000),
location VARCHAR(500),
level VARCHAR(200);
top TINYINT(1),
lead TINYINT(1));`

*TODO - add lead column! Can't seem to add.

DAYS DATABASE

`CREATE TABLE days (
dID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
day VARCHAR(20),
uID INT REFERENCES user_info(uID)
SET CONNECTION TO user_info TABLE);`

*TODO - check commands again on blank database

## Userflow

![This is an image](/BelayMe%20UserFlow.png)
