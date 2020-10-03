FROM node:latest

LABEL Name=reciprocity_ui Version=0.0.1
EXPOSE 3000

WORKDIR /app

COPY . /app

RUN npm install --global lerna
RUN npm run bootstrap-nohoist

WORKDIR /app/web

CMD ["npm", "run", "start"]