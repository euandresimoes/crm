FROM node:22

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN apt-get update && apt-get install -y dos2unix && \
    dos2unix entrypoint.sh && chmod +x entrypoint.sh

RUN npx prisma generate
RUN npm run build

ENTRYPOINT [ "./entrypoint.sh" ]