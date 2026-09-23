FROM nginx:alpine

# Kopējam Nginx konfigurāciju
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopējam statiskos failus
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
