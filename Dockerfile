# Dockerfile
 
FROM node:latest as build
 
RUN npm install -g npm
 
WORKDIR /app
COPY package.json ./
RUN npm install
 
COPY . .
RUN npm run build
 
FROM nginx:latest as deploy-static


RUN mkdir /app

RUN mkdir /conf
RUN mkdir /conf/logs
WORKDIR /app
RUN rm -rf ./*
RUN mkdir /app/build
RUN mkdir /app/logs
RUN touch /app/logs/error.log
RUN touch /app/logs/access.log
RUN touch /app/logs/nginx.pid
COPY --from=build /app/build ./build
COPY --from=build /app/nginx /conf
RUN chown -R nginx:nginx /app 
RUN chown -R nginx:nginx /conf 
RUN mkdir /var/cache/nginx/client_temp
RUN mkdir /var/cache/nginx/proxy_temp
RUN chown -R nginx:nginx /var/cache/nginx
USER nginx:nginx
EXPOSE 9099
ENTRYPOINT [ "nginx", "-c", "/conf/nginx.conf", "-g", "daemon off;" ]