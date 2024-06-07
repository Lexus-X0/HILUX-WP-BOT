const { command, isPrivate, getJson } = require("../lib/");
const fetch = require("node-fetch");
const axios = require("axios");

command(
    {
        pattern: "igpp",
        fromMe: isPrivate,
        desc: "instagram details",
        type: "search",
    },
    async (message, match) => {
        if (!match) return await message.sendMessage("_Give me insta user name_");
var {result} = await getJson(`https://levanter.onrender.com/ig?q=${match}`)
        
const { avatar } =
			result
await message.client.sendMessage(message.jid, { image:{url: (avatar)},  mimetype:"image/jpeg"},{quoted: message });
    }
    );
