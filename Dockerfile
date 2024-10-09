FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli

COPY . .

ARG CONFIGURATION=production

ENV CONFIGURATION=${CONFIGURATION}

RUN ng build --configuration=${CONFIGURATION}

FROM nginx:latest

COPY --from=build app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80