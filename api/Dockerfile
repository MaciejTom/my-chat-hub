FROM node:latest
WORKDIR /usr/app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn run build
COPY .env ./dist/
WORKDIR ./dist
EXPOSE 8080
CMD [ "yarn", "start" ]