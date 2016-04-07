# Best Bet

> **Find restaurants around you based on the criteria you care most about _right now._**


## Team

- Product Owner: Pavel Parshakov
- Scrum Master: Jackie Liu
- Development Team Members: Brian Ronaghan, Pavel Parshakov, Jackie Liu

## Table of Contents

1. [FEATURES](#Features)
1. [ARCHITECTURE](#architecture)
    1. [Tech Stack](#tech-stack)
    1. [System Architecture](#system-architecture)
    1. [Zone Based Pub/Sub](#zone-based-pub-sub)
1. [REQUIREMENTS](#requirements)
1. [DEVELOPMENT](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [TEAM](#team)
1. [CONTRIBUTING](#contributing)

## Features

### Summary:
A mobile, map-based restaurant recommendation app that uses pattern recognition and real time user data to predict how much a specific user will enjoy a restaurant right now. (Pandora+Waze+Yelp)

#### Our App Flow

![Overview](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/bestBetMockScreens.png "Overview")

- Sign In
- Zoomed Out Map View
- Zoomed In Map View With Brief Restaurant Details
- Full Restaurant Detail View
- Rate a Restaurant View

#### How do I know if I'll like a restaurant?

###### It's Complicated:
- One size (rating) doesn’t fit all
  - Zagat/Yelp/Google’s opinions != to mine
- Even if one does fit you, you don’t get that experience every time
  - 3pm Tuesday != 10pm Saturday
- Plus, at any given time, YOU are different
  - Business Lunch != Date != Parents != Starving at 3am

###### Current Options:
1. Read ~100 reviews on the internet
  - look for mentions of the thing you care about
  - figure out what the reviewer’s opinion on that thing is
  - guess if you’d have the same opinion
  - calculate if the opinion applies right now
2. Just go to the restaurant and take your chances

### Basically: TRIAL & ERROR

## Our Solution:
Our app allows users to indicate their preferences and rate restaurants based on those preferences. The database tracks (in real time) the aggregated scores based on user preferences. (73% of users who care about loudness found this restaurant too loud).

Thus, when searching a map for restaurants around me, I can see how every restaurant scores on the specific criteria I care about.

#### Sign In and Sign Up View

![Login](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/login.jpg "Login Screen")![Sign Up](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/signup.jpg "Sign Up")

#### Map Views

 ![Zoomed Out](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/zoomedOut.jpg "Zoomed Out") ![Zoomed In](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/zoomedIn.jpg "Zoomed In")

#### Restaurant Info Views

![Zoomed Out](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/briefDetails.jpg "Zoomed Out") ![Zoomed In](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/fullDetails.jpg "Zoomed In")

#### Rate a Restaurant Screen
![Zoomed Out](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/rateScreen.jpg "Rating Screen")

## Architecture

### Tech Stack

1) Front-End
- React-Native  
- Redux with Thunk
- Socket.io

2) Back-End
- Node/Express
- Socket.io
- Postgres
- sequelize

3) Testing
- Mocha
- Chai

4) Deployment
- Digital Ocean

### System Architecture

![Server/DB/Architecture](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/architecture.jpg "Architecture")

### Zone Based Sub/Pub

![Zone Layout](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/zoneSystem.jpg "Zone Layout")

![Render vs. Preload](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/zoneRendering.jpg "Render vs. Preload")

## Requirements

- Node 0.10.x
- Postgresql 9.1.x
- Express
- bcrypt
- q
- socket.io
- sequelize

## Development

### Installing Dependencies

  1. If you don't already have Postgres, install it: `brew install postgres`
  2. In the terminal, run:

  ```
    > initdb paperclipsdb
    > pg_ctl -D paperclipsdb -l logfile start
    > createdb paperclipsdb
  ```

  3. Run the psql command line tool to create a role:

  ```
    > psql paperclipsdb
    $ CREATE ROLE postgres WITH superuser;
    $ ALTER ROLE postgres WITH login;
    $ \q
  ```

  4. Install other dependencies and start the server: `npm start`


### To start your local database

```
  > pg_ctl -D paperclipsdb -l logfile start
```

### Access/Update your local database via terminal

  ```
  > psql paperclipsdb
  ```

### Roadmap

View the project roadmap [here](https://waffle.io/paperclips/paperclips)
