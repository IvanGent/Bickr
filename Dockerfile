FROM node:12

COPY package.json package.json

RUN mkdir /frontend && mkdir /backend
WORKDIR /frontend
COPY frontend/. .

ENV REACT_APP_BASE_URL=https://git.heroku.com/bickr-app.git

RUN npm install && npm run build

EXPOSE 5432

WORKDIR /backend
COPY backend/. .
ENV NODE_ENV=production

WORKDIR /

# WORKDIR /frontend
# COPY frontend/. .


# RUN npm install && npm run build

# WORKDIR /backend
# COPY backend/. .



CMD ["npm","run","start", "gunicorn", "app:app"]


