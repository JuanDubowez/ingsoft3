
FROM node:13.12.0-alpine AS node_build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .

ENTRYPOINT [ "npm", "install"]

# copy app to container
COPY . .

EXPOSE 3001

# starts the app
CMD ["npm", "start"]

FROM node:13.12.0-alpine AS node_prod

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install

# copy app to container
COPY . .

EXPOSE 3000

# starts the app
CMD ["npm", "start"]