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

singer-sync: docker-up virtualenv
	tap-covid-19 --config singer-io/covid_config.json | target-postgres --config singer-io/postgres_config.json >> singer-io/state.json
