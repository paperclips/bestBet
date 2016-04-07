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
    1. [Client Architecture](#client-architecture)
    1. [Server Architecture](#server-architecture)
    1. [Database Design](#database-design)
1. [REQUIREMENTS](#requirements)
1. [DEVELOPMENT](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [TEAM](#team)
1. [CONTRIBUTING](#contributing)

## Features

### Summary:
A mobile, map-based restaurant recommendation app that uses pattern recognition and real time user data to predict how much a specific user will enjoy a restaurant right now. (Pandora+Waze+Yelp)



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

#### Overview

![Overview]()

![Login](https://raw.githubusercontent.com/paperclips/paperclips/master/screenshots/login.jpg "Login Screen")




## Architecture

### Tech Stack

> tech stack info

### System Overview

> system (client, server, all that, in a pretty picture)

### Client Architecture

> Client

### Server Architecture

> The server is designed with Node.js using sockets.

### Database Design

> DB


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
