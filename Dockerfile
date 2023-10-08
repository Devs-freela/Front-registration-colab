FROM node:lts-alpine as build

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run start

FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
