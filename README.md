![This is an image](./my-app/client/src/images/logo.png)

## Project Description

### **The problem**

Climbers struggle finding consistent belay partners.

### **How this app will solve it**

BelayMe connects climbers based on their level, location, gender and schedule.

### **Features Phase 1**

- User can set-up/edit personal profile
- User gets matched with others climbers based on:
  - Location
  - Level
  - Lead certified or not
  - Days
  - Gender

You can find a live version of phase 1 [here](https://climbingapp.herokuapp.com/)

### **Features Phase 2 (WIP)**

- Account authentication & verification
 User's match preferences are updated independently from User Profile i.e. The User can climb Mon, Tues, Wed, Sat (as set in User Profile), but choose to match with climbers who climb only on Mon.
- User can select multiple levels, genders and type of certifications when settings preferences
### **Future Features**
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

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://getbootstrap.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" alt="bootstrap" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> </p>


### Database Info

DATABASE 'climbingapp'
TABLES 
- 'certfications'
- 'users'
- 'days'

```
TABLE users
uID INTEGER NOT NULL AUTO_INCREMENT,
              email VARCHAR(40) NOT NULL,
              password VARCHAR(2000) NOT NULL,
              username VARCHAR(40),
              pronouns VARCHAR(40),
              avatar VARCHAR(5000),
              bio VARCHAR(5000),
              location VARCHAR(500),
              level VARCHAR(200),
              gender VARCHAR(50),
              PRIMARY KEY (uID),
              UNIQUE KEY unique_username (username))

TABLE days
dID INTEGER NOT NULL AUTO_INCREMENT,
              uID INTEGER NOT NULL,
              day VARCHAR(20) NOT NULL,
              selected BOOLEAN NOT NULL,
              PRIMARY KEY (dID),
              FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE)

TABLE certifications
cID INTEGER NOT NULL AUTO_INCREMENT,
              uID INTEGER NOT NULL,
              type VARCHAR(20) NOT NULL,
              selected BOOLEAN NOT NULL,
              PRIMARY KEY (cID),
              FOREIGN KEY (uID) REFERENCES users(uID) ON DELETE CASCADE);
```

## **Setup Instructions**

### Dependencies

- `cd my-app` and run `npm install` in project directory. This will install server dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies.

### Database Prep

- Access the MySQL interface in terminal by running `mysql -u root -p` and enter your password.
- Create a new database called users: `create database users`
- Add a `.env` file to the `my-app` folder of this repo containing your MySQL authentication information:

```
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=climbingapp
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the `my-app` folder in a new terminal window. This will create the 'users', 'days' and 'certifications' tables in your database.

**If npm run migrate doesn't work, seperate instructions are in commands.sql to set-up tables directly via MySQL interface.

### External API Prep

- Go to `https://rapidapi.com/damngoodapis/api/geolocation`. You will need to create an account to access the API Key.
- Add a `.env` file to the client folder containing your API Key:

```
REACT_APP_API_KEY=YOUR_KEY
```

### Development

- `cd my-app` and run `npm start` in to start the Express server on port 5002
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000

