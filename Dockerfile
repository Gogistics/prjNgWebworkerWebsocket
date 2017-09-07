# Build using:
#   docker build -t atai/ng-app-webworker:v1 .
# Run with:
#   docker run -p 8080:8080 --name ng-webworker -d atai/ng-app-webworker:v1
# Reference:
#   https://github.com/trion-development/angular-docker-multistage (by Thomas Kruse)

FROM trion/ng-cli:latest AS ngcli

USER root
ENV LANG C.UTF-8
WORKDIR /home/node
COPY . .

# RUN npm install && ng build --prod --aot --progress=false
# use `npm run build` instead of `ng build --prod --aot --progress=false`
RUN npm run build

FROM nginx:alpine
COPY --from=ngcli /home/node/dist /usr/share/nginx/html/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf.template
RUN chown -R nginx /etc/nginx

ENV PORT=8080
EXPOSE 8080

CMD ["/bin/sh","-c","envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]