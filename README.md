# covid-dashboard

Dashboard to explore covid data.

## Requirements
- Python 3.5+
- Pip
- Leiningen 2.7.1
- npm 6.13.7+
- docker-compose
- make

## Data Store
The backend is backed by a Postgres database. To launch one locally in a Docker container run:
```bash
make docker-up
```

[singer-io](https://www.singer.io/) is used to load the database with fresh covid-19 data from various sources.
To seed the database with covid-19 data run the following commands (preferably within a Python virtual environment):
```bash
# Install the tap and target
pip install -r singer-io/requirements.txt

# Create the tap-covid-19 catalog
make singer-catalog

# Seed the database with data from tap-covid-19
make singer-seed
```

To load new tap-covid-19 data run:
```bash
make singer-sync
```

## Backend
Clojure based APIs serve data from Postgres to the frontend. To launch the backend run:
```bash
make start-backend
```

## Frontend
React consumes data from the backend and displays a dashboard. To launch the frontend run:
```bash
make start-frontend
```
