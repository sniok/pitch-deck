FROM node:14

RUN apt-get update && apt-get install -y \
    imagemagick libmagickwand-dev ghostscript

RUN sed 's/rights="none" pattern="PDF"/rights="read|write" pattern="PDF"/g' /etc/ImageMagick-6/policy.xml

COPY . /app

WORKDIR /app

RUN yarn install

CMD yarn start 