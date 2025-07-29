FROM node:22

WORKDIR /app
COPY package*.json .

RUN npm install
COPY . .

COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

RUN npx prisma generate
RUN npm run build

ENTRYPOINT [ "./entrypoint.sh" ]