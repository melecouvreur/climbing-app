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
  - Skill level/grade
  - Days

- User can filter/match with others climbers based on preferences
- User can see list of connected climbers (i.e. connected => matched & accepted contact request)

## **Technologies**

- React
- Node.js
- Bootstrap
- mySQL

## **Future Features**

- Account and profile set-up user flow including email verification & T&Cs
- User can send/accept contact request to matched/filtered climbers
- User can see list of climbers of who requested contact, but have not yet accepted
- User can message once matched & contact request accepted
- User can link IG profile to climber profile
- User can add time of Day  i.e. morning, lunch, afternoon, evening as filter
- User can add pre-defined interest categories to profile
- User can find climbers based on username (irrespective of match)
- User can follow/bookmark other climbers until user decides to send contact request
- User gets notification when other user interacts i.e. send contact request, new message
- User can choose to allow/disable notifications

## API Routes

### Route 1

- URL: "/users"
- METHOD: GET
- Description: Gets all users
- Req Body: N/A
- Res Obj: {ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, profile_img: url, bio: string, location: string, top-rope: Boolean, lead-top: Boolean, beginner: Boolean, intermediate: Boolean, advanced: Boolean}

### Route 2

- URL: "/users/:id"
- METHOD: GET
- Description: Gets user info by id. Shows info from matched climbers when click-through to their profile from matched list.
- Req Body: N/A
- Res Obj: { ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, profile_img: url, bio: string,  location: string, top-rope: Boolean, lead-top: boolean, beginner: Boolean, intermediate: Boolean, advanced: Boolean}

### Route 3

- URL: "/users"
- METHOD: POST
- Description: Adds new user
- Req Body {username: string, pronouns: string, profile_img: url, bio: string,  location: string, top-rope: Boolean, lead-top: boolean, beginner: Boolean, intermediate: Boolean, advanced: Boolean}
- Res Obj {
}

### Route 4

- URL: "/users/recommend"
- METHOD: POST
- Description: Gets recommended users based on matching criteria
- Req Body: {location, top-rope, lead-rope, skill_level, days }
- Res Obj: {username: string, username: string, pronouns: string, profile_img: url, bio: string, location: string, top-rope: Boolean, lead-top: boolean, beginner: Boolean, intermediate: Boolean, advanced: Boolean}

## Database

USER_INFO

- uID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- firstname VARCHAR() NOT NULL; String
- lastname VARCHAR() NOT NULL; String
- email VARCHAR() NOT NULL; String
- username VARCHAR() NOT NULL; String
- pronouns VARCHAR() NOT NULL; String
- profile_img VARCHAR(); String
- bio VARCHAR(); String
- location VARCHAR() NOT NULL; String
- top BINARY(); Boolean
- lead BINARY(); Boolean
- level VARCHAR(); NOT NULL; String

DAYS

- dID INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- uID INT NOT NULL FOREIGN KEY; Number
- day VARCHAR(20)

MY SQL COMMANDS

SETTING UP USER DATABASE:

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

SETTING UP DAYS DATABASE

`CREATE TABLE days (
dID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
day VARCHAR(20),
uID INT REFERENCES user_info(uID)
SET CONNECTION TO user_info TABLE);`

*TODO - check commands again on blank database

## Userflow

![This is an image](/BelayMe%20UserFlow.png)
