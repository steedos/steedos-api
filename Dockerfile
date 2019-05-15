FROM node:12.2.0-alpine

RUN npm install -g typescript

ADD . /steedos-api

WORKDIR /steedos-api

RUN yarn --force

RUN tsc

CMD ["node", "lib/index.js"]
