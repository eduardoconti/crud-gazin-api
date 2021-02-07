FROM node:15.7.0-alpine

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

CMD [ "npm", "run", "start" ]