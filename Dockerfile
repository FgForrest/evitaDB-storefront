FROM node:18.18.0

WORKDIR /src

COPY package.json /src
COPY package-lock.json /src

RUN npm install

COPY . /src

RUN npm run build

ENV HOST=0.0.0.0 PORT=8080 NODE_ENV=production

CMD [ "node", ".output/server/index.mjs" ]