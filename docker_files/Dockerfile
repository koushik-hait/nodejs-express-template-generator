FROM node:18

RUN mkdir -p /usr/src/pocapi && chown -R node:node /usr/src/pocapi

WORKDIR /usr/src/pocapi

# Copy package json and yarn lock only to optimise the image building
COPY package.json ./

# copy prepare.js prior. It will be executed after package installation and before ROOT dir is cloned
COPY prepare.js ./

USER node

RUN npm install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 5000

CMD [ "npm", "start" ]