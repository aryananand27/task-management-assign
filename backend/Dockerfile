FROM node:20

WORKDIR /mea/backend

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD ["npm","run","dev","--","--host","0.0.0.0"]


