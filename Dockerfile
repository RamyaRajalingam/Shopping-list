FROM denoland/deno:alpine-1.42.2

EXPOSE 7777

WORKDIR /app

COPY deps.js .
COPY app.js .
COPY ./controllers ./controllers
COPY ./services ./services
COPY ./database ./database 
COPY ./views .


RUN deno cache deps.js
EXPOSE 7777
CMD [ "deno", "run", "--allow-env","--allow-net", "--watch", "--unstable","--allow-read", "app.js" ]