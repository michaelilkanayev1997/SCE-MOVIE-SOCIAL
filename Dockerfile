FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install --frozen-lockfile --production

COPY . .

CMD ["yarn", "start"]
