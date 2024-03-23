FROM --platform=linux/arm64/v8 node:20-alpine
# FROM node:20-alpine
WORKDIR /bot
COPY . /bot
RUN apk add ffmpeg python3 py3-pip 
RUN pip install pydub --break-system-packages
RUN npm install
RUN npm run build
CMD npm run start 
