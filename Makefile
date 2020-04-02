# docker-compose
docker-up:
	docker-compose up -d

docker-down:
	docker-compose down

# singer-io
virtualenv: ./singer-io/env/bin/activate

# manually run docker-up before these, need to wait for postgres availability
singer-catalog: virtualenv
	tap-covid-19 --config singer-io/covid_config.json --discover > singer-io/catalog.json

singer-sync: virtualenv
	tap-covid-19 --config singer-io/covid_config.json --catalog singer-io/catalog.json --state singer-io/state.json | target-postgres --config singer-io/postgres_config.json > singer-io/state.json
