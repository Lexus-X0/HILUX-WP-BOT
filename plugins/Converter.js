const {
  Function,
  command,
  qrcode,
  webp2mp4,
  isUrl,
  isPrivate,
  getJson,
  getUrl,
  isIgUrl,
  findMusic,
} = require("../lib/");
const { yta, ytIdRegex, ytv } = require("../lib/yotube");
const { search } = require("yt-search");
let gis = require("g-i-s");
const { AddMp3Meta } = require("../lib");
const googleTTS = require('google-tts-api')
const jimp = require("jimp");
const QRReader = require("qrcode-reader");
const { RMBG_KEY } = require("../config");
let { unlink } = require("fs/promises");
const got = require("got");
const FormData = require("form-data");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const fs = require("fs");
const fetch = require("node-fetch");
const config = require("../config");
command(
  {
    pattern: "tts",
    fromMe: isPrivate,
    desc: "google tts by aswin sparky",
    type: "converter",
  },
  async (message, match, m) => {
if (!match) return await message.reply(`_Need Text!_`);
            let [txt,lang] = match.split`:`
            const audio = googleTTS.getAudioUrl(`${txt}`, {
                lang: lang || "en-US",
                slow: false,
                host: "https://translate.google.com",
            })
            message.client.sendMessage(message.jid, {
                audio: {
                    url: audio,
                },
                mimetype: 'audio/mpeg',
                ptt: true,
            }, {
                quoted: message,
            })
  }
  );

command(
  {
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_its Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(buff,{mimetype: 'image/jpeg'}, {quoted: message }, "image")
  }
);

const { toAudio } = require("../lib/media");
command(
  {
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/audio/voice to mp3",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || (!message.reply_message.video && !message.reply_message.audio)) return await message.reply('_Reply at audio/video!_')  
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
     await message.sendMessage(buff,{mimetype: 'audio/mpeg'}, {quoted: message }, "audio");
  }
);

