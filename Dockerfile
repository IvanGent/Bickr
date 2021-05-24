FROM node:12

WORKDIR /frontend
COPY frontend/. .

ENV REACT_APP_BASE_URL=https://git.heroku.com/bickr-app.git

RUN npm install && npm run build

WORKDIR /backend
COPY backend/. .

ENV JWT_EXPIRES_IN=604800

EXPOSE 5000

RUN npm install 

CMD ["npm","run","start:production"]

