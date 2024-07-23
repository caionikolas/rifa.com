FROM node:16.13-alpine as builder

WORKDIR /app

ENV NODE_ENV development

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start" ]