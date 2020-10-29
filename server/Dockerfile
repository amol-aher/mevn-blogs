FROM node:14.9.0
WORKDIR /src
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN yarn install
COPY . .
CMD [ "node", "app.js" ]