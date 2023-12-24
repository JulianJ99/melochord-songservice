FROM library/postgres
ENV POSTGRES_USER agent1
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB melochord
COPY melochord.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

FROM node:20
WORKDIR /server

COPY package.json .
COPY package-lock.json ./

EXPOSE 3002

COPY . ./

CMD ["node", "server.js", "localhost:3002" ]