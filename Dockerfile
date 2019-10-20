FROM alpine:3.9

# File Author / Maintainer
LABEL authors="huhn <huhn@einfachiota.de>"

# Update & install required packages
RUN apk add --update nodejs bash git npm

# Set work directory to /src
WORKDIR /app

# Install app dependencies
COPY package.json /app/package.json
RUN  npm install

# Copy app source

WORKDIR /app/frontend
COPY ./frontend/package.json /app/frontend/package.json
RUN npm install
COPY ./frontend /app/frontend


RUN npm run build

WORKDIR /app
COPY . /app


# set your port
ENV PORT 3001

# expose the port to outside world
EXPOSE  3001

# start command as per package.json
CMD ["npm", "start"]