#
#  LightMessage
#
#  Angular2 app build with angular-cli
#
#

FROM nginx

RUN ng build

COPY dist /usr/share/nginx/html



