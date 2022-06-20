FROM node:16
WORKDIR /usr/src/furio-docker
COPY package*.json ./
RUN curl https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn 
RUN yarn 
COPY . .
EXPOSE 8080
CMD [ "node", "compound.js" ]
