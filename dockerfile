FROM node:20-alpine
COPY . .
RUN apk add ffmpeg python3 py3-pip 
RUN pip install pydub --break-system-packages
RUN npm install && npm install ts-node -g
CMD ["ts-node", "index.ts"]