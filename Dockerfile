FROM node:10.15.3-stretch

RUN npm install -g typescript

ADD . /steedos-api

WORKDIR /steedos-api

RUN yarn --force

RUN tsc

CMD ["node", "lib/index.js"]
