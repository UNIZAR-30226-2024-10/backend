FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001
# required for docker desktop port mapping

CMD ["npm", "start"]