# untitled restaurant app deal

> **Find restaurants around you based on the criteria you care most about _right now._**


## Team

- Product Owner: Pavel Parshakov
- Scrum Master: Jackie Liu
- Development Team Members: Pavel Parshakov, Jackie Liu, Brian Ronaghan

## Table of Contents

1. [FEATURES](#Features)
1. [ARCHITECTURE](#architecture)
    1. [Tech Stack](#tech-stack)
    1. [Client Architecture](#client-architecture)
    1. [Server Architecture](#server-architecture)
    1. [Database Design](#database-design)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Features

> Some usage instructions

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

### Roadmap

View the project roadmap [here](https://waffle.io/paperclips/paperclips)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
