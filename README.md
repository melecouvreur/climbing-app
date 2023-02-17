# Climbing-app

## **The problem**

Climbers struggle finding consistent belay partners that match their skill level, interestst, schedule and location.

## **How this app will solve it**

It will connect fellow climbers based on matching skills, interests, schedule and location

## **How is it different from other apps**

It will focus solely on matching climbers and solving this specific problem. Keeping it simple, but prioritizing user experience and needs

## Features Phase 1

- User can create, edit and delete climber profile containing:

  - Name
  - Email
  - User name
  - Pronouns
  - Profile pic (optional)
  - Bio

- User can edit match preferences/filters containing:
  - Location
  - Climbing category i.e. top rope & lead
  - Skill level
  - Schedule
  - Days
  - Time of Day  i.e. morning, lunch, afternoon, evening

- User can filter/match with others climbers based on preferences
- User can send/accept contact request to matched/filtered climbers
- User can see list of connected climbers (i.e. connected => matched & accepted contact request)
- User can see list of climbers of who requested contact, but have not yet accepted

## **Technologies**

- React
- Node.js
- Bootstrap
- mySQL

## **Future Features**

- Account and profile set-up user flow including email verification & T&Cs
- User can message once matched & contact request accepted
- User can link IG profile to climber profile
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
- Res Obj: { ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, profile_img: url, bio: string, location: string, top-rope: Boolean, lead-top: Boolean, skill_level: string, days: string, time: string }

### Route 2

- URL: "/users/:id"
- METHOD: GET
- Description: Gets user info by id. Shows info from matched climbers when click-through to their profile from matched list.
- Req Body: N/A
- Res Obj: { ID: integer, firstname: string, lastname: string, email: string,
username: string, pronouns: string, profile_img: url, bio: string,  location: string, top-rope: Boolean, lead-top: boolean, skill_level: string, days: string, time: string }

### Route 3

- URL: "/users/create"
- METHOD: POST
- Description: Adds new user
- Req Body {username: string, pronouns: string, profile_img: url, bio: string,  location: string, top-rope: Boolean, lead-top: boolean, skill_level: string, days: string, time: string}
- Res Obj {
}

### Route 4

- URL: "/users/my-profile"
- METHOD: GET
- Description: Gets active user info → displays info on myProfile + account + preferences
- Req Body: N/A
- Res Obj:

### Route 5

- URL: "/users/my-profile"
- MEHTHOD: PUT
- Description: Edits active user info. Allows user to edit account + preferences
- Req Body {username: string, pronouns: string, profile_img: url, bio: string,  location: string, top-rope: Boolean, lead-top: boolean, skill_level: string, days: string, time: string}
- Res Obj:

### Route 6

- URL: "/users/my-profile"
- METHOD: POST
- Description: Adds active user data (not needed for now)
- Req Body {username: string, pronouns: string, profile_img: url, bio: string,  location: string,top-rope: Boolean, lead-top: boolean, skill_level: string, days: string, time: string}
- Res Obj:

### Route 7

- URL: "/users/recommend"
- METHOD: POST
- Description: Gets recommended users based on matching criteria
- Req Body: {location, top-rope, lead-rope, skill_level, days, time }
- Res Obj: {username: string, username: string, pronouns: string, profile_img: url, bio: string, location: string, top-rope: Boolean, lead-top: boolean, skill_level: string, days: string, time: string}

## Database

USER_INFO
- ID	INT NOT NULL PRIMARY KEY AUTO_INCREMENT; Number
- firstname	VARCHAR() NOT NULL; String
- lastname	VARCHAR() NOT NULL; String
- email	VARCHAR() NOT NULL; String
- username	VARCHAR() NOT NULL; String
- pronouns	VARCHAR() NOT NULL; String
- profile_img	VARCHAR(); String
- bio	VARCHAR(); String
- location	VARCHAR() NOT NULL; String
- top	BINARY(); Boolean
- lead	BINARY(); Boolean
- grade	SET(val1, val2, val3, ...); String Obj
- days	SET(val1, val2, val3, ...); String Obj
- time	SET(val1, val2, val3, ...); String Obj

## Userflow

![This is an image](/BelayMe%20UserFlow.png)
