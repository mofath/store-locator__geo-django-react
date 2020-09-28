FROM node:9

WORKDIR /code/client

EXPOSE 3000

COPY package.json .
RUN npm install

CMD [ "npm", "run", "start:server" ]

ADD . /code/client