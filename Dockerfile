FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g prisma

COPY . .

RUN npm run build

RUN npm run prisma:generate

RUN npm run prisma:migrate 

EXPOSE 3000

CMD npm start