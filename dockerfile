FROM --platform=linux/arm64/v8 node:20-alpine
COPY ./lib .
RUN apk add ffmpeg python3 py3-pip 
RUN pip install pydub --break-system-packages
RUN npm install --omit=dev
ENTRYPOINT npm run start 
