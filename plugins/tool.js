const { command, qrcode, isUrl, isPrivate, findMusic } = require("../lib/");
const jimp = require("jimp");
const QRReader = require("qrcode-reader");
let { unlink } = require("fs/promises");
const got = require("got");
const FormData = require("form-data");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const fs = require("fs");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

command(
    {
        pattern: "find",
        fromMe: isPrivate,
        desc: "Song finder",
        type: "search",
    },
    async (message, match, m, client) => {
        if (!message.reply_message) return await message.reply('_Reply at audio/video!_');
let buff = await m.quoted.download();
    let data = await findMusic(buff);
    if (!data.status) return message.reply(data);

    let myre = `╭────────────┈⊷\n   _find results_ \n╰────────────┈⊷\n╭────────────┈⊷
 │⪼ _Title_ : ${data.title}            
 │⪼ _Artist_ : ${data.artists}            
 │⪼ _Album_ : ${data.album}            
 │⪼ _Genre_ : ${data.genres}          
 │⪼ _Release_ : ${data.release_date}\n╰────────────┈⊷`
                   await message.client.sendMessage(message.jid,{ text: (myre)}, {quoted: message })
    }
    );



command(
  {
    pattern: "vo",
    fromMe: isPrivate,
    desc: "anti viewOnce",
    type: "user",
  },
  async (message, match, m) => {
if (!message.reply_message || (!m.quoted.message.viewOnceMessageV2 && !m.quoted.message.viewOnceMessageV2Extension)) return await message.reply('_Reply  viewOnce message!_')
    if(m.quoted.message.viewOnceMessageV2Extension){
const downloadedMedia1 = await downloadMediaMessage(m.quoted.message.viewOnceMessageV2Extension, 'buffer', {}, { reuploadRequest: message.client.updateMediaMessage })
await message.client.sendMessage(message.jid, { audio :downloadedMedia1 ,  mimetype:"audio/mpeg"},{ quoted: message })
} else if(m.quoted.message.viewOnceMessageV2){
const downloadedMedia = await downloadMediaMessage(m.quoted.message.viewOnceMessageV2, 'buffer', {}, { reuploadRequest: message.client.updateMediaMessage })
await message.client.sendMessage(message.jid, {image: downloadedMedia },{ quoted: message })
}
  }
);

