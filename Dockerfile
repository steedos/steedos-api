FROM node:12.2.0-alpine

ADD . /steedos-api

WORKDIR /steedos-api

RUN tsc

RUN yarn --force

CMD ["node", "lib/index.js"]
