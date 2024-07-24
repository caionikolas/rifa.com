FROM node:lts
RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

ENV PORT 3333

COPY ["package.json", "package-lock.json", "./"]
COPY prisma ./prisma/

RUN npm install --production --silent && mv node_modules ../

RUN npm i -g prisma

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

EXPOSE 3333

CMD ["npm", "start"]