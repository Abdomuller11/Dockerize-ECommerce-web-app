FROM node as base

WORKDIR /app


FROM  base as backend
COPY ecommerce_react_node-main/backend/package.json .
RUN npm install

COPY ecommerce_react_node-main/backend .
EXPOSE 8000
CMD [ "npm", "run", "dev"]



FROM  base as frontend
COPY ecommerce_react_node-main/frontend/package.json .
RUN npm install

COPY ecommerce_react_node-main/frontend .
EXPOSE 3000
CMD [ "npm", "run", "start"]

