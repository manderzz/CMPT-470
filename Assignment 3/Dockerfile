FROM node

WORKDIR /usr/src/asn3

COPY package*.json ./

RUN npm install 

COPY . . 

COPY bin/ /

EXPOSE 8080

CMD ["npm", "start"]