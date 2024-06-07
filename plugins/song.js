const { command , isPrivate , getBuffer, getJson } = require("../lib");
const fetch = require("node-fetch");
const axios = require("axios");
const X = require("../config");

command(
    {
        pattern: "song",
        fromMe: isPrivate,
        desc: "Song Downloader",
        type: "downloader",
    },
    async (message, match) => {
        if (!match) return await message.reply("_Enter A song name_");
  let { key } = await message.reply("_Downloading_");
const res = await axios.get(`https://api-viper-x.koyeb.app/api/song?name=${match}`)
    let response = await res.data
    const songbuff = await (await fetch(`${response.data.downloadUrl}`)).buffer()
  await message. client.sendMessage(message.jid,{audio: songbuff, mimetype : 'audio/mpeg'} , { quoted : message});
   return await message.client. sendMessage(message.jid,{text:("_Successfull!_"),edit:key});
})
