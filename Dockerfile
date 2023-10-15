FROM node:alpine

WORKDIR /app
COPY . .

RUN npm install

CMD ["yarn", "build"]
