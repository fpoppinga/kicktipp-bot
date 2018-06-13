FROM node:8.4

# Install Chrome
RUN apt update
RUN apt install -yf libxss1 libappindicator1 libindicator7
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome*.deb || apt install -yf && dpkg -i google-chrome*.deb


# Setup app
WORKDIR /opt/kicktipp-bot
COPY . .
RUN yarn install
CMD ["yarn", "start"]
