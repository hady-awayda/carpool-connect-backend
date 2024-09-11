FROM node:latest AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM node:latest AS final
WORKDIR /app
COPY --from=builder /app ./
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "start"]