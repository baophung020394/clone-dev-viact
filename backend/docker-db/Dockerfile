FROM mysql:8.3.0

ENV MYSQL_ALLOW_EMPTY_PASSWORD=yes

ENV MYSQL_DATABASE=viact

COPY init.sql /docker-entrypoint-initdb.d/

