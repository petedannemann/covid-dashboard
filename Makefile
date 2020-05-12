# docker-compose
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

# db
postgres-shell:
	docker exec -it --user postgres covid-dashboard_postgres_1 psql

# singer-io
virtualenv: ./singer-io/env/bin/activate

# manually run docker-up before these, need to wait for postgres availability
singer-catalog: virtualenv
	tap-covid-19 --config singer-io/covid_config.json --discover > singer-io/catalog.json

singer-seed: virtualenv
	tap-covid-19 --config singer-io/covid_config.json --catalog singer-io/catalog.json | target-postgres --config singer-io/postgres_config.json > singer-io/state.json

singer-sync: virtualenv
	tap-covid-19 --config singer-io/covid_config.json --catalog singer-io/catalog.json --state singer-io/state.json | target-postgres --config singer-io/postgres_config.json > singer-io/state.json

# clojure
start-backend:
	cd backend && lein ring server-headless

# react
start-frontend:
	cd frontend && npm start
