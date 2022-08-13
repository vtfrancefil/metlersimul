# By FIL
# Build stage
FROM node:16-alpine3.15 as build

# Install dependencies
WORKDIR /
COPY package.json .
RUN npm ci --production

# Final stage
FROM alpine:3.15 as final

# Upgrade APK
RUN apk --no-cache add --upgrade nodejs~16

# Setup application
RUN mkdir -p /metler-server
WORKDIR /metler-server
COPY . .

# Run application
ENTRYPOINT ["node", "index.js"]
