# Stage 1
# Build docker image of react app
FROM node:latest as build-stage
RUN mkdir /usr/app
#copy all files from current directory to docker
COPY . /usr/app

WORKDIR /usr/app

# install and cache app dependencies
RUN npm install

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm run build
# Stage 2
# Copy the react app build above in nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /usr/app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]