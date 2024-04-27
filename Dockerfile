FROM node:20.11.0

WORKDIR /src

COPY package.json /src
COPY package-lock.json /src

RUN npm install

COPY . /src

ENV HOST=0.0.0.0 PORT=5559 NODE_ENV=production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

#RUN chmod +x wait-for-http.sh
#RUN ./wait-for-http.sh
#RUN npm run build --env.GQL_HOST="https://demo.evitadb.io:5555/gql/evita"
#ENV GQL_HOST="http://evita:5555/gql/evita"
#CMD ["node", ".output/server/index.mjs"]