FROM node:17.0.0-alpine

WORKDIR ./app

COPY package.json /app/package.json

RUN cd /app; npm install

EXPOSE 3000

COPY . /app

CMD npm run start