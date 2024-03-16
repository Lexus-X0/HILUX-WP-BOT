FROM quay.io/loki-xer/jarvis-md:latest
RUN git clone https://github.com/Lexus-X0/HILUX-WP-BOT/root/bot/
WORKDIR /root/bot/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]
