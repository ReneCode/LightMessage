#
#  LightMessage
#
#  Angular2 app build with angular-cli
#
#

FROM nginx

COPY dist/* /usr/share/nginx/html/

COPY dist/* /usr/share/nginx/html/
CMD rm /usr/share/nginx/html/*.map




