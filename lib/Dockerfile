FROM node:latest
RUN git clone https://github.com/Lexus-X0/HILUX-WP-BOT.git /root/HILUX-WP-BOT/
WORKDIR /root/HILUX-WP-BOT/
RUN yarn global add pm2
RUN npm install
RUN yarn install --ignore-engines --network-concurrency 1
CMD ["npm", "start"]
