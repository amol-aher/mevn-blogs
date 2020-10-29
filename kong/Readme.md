Installation: macOS
brew tap kong/kong
brew install kong

Kong offers support for two databases: Postgress and cassandra

PGSQL:
Shell: psql postgres
create user kong with password 'kong';

Create a docker network — this network will be use for kong and our API server
=> docker network create kong-net

Start database for Kong — there is two option database : Postgres or Cassandra. For know we use postgres.
=> docker run -d --name kong-database --network=kong-net -p 5555:5432 -e "POSTGRES_USER=kong" -e "POSTGRES_DB=kong" postgres:12.4

Prepare database, run migration with Kong container:
=> docker run --rm --network=kong-net -e "KONG_DATABASE=postgres" -e "KONG_PG_HOST=kong-database" kong:latest kong migrations up

