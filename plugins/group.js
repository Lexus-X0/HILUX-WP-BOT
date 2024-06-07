const {
  getFilter,
  setFilter,
  deleteFilter,
  toggleFilter,
} = require("../lib/database/filters");
const { command, isPrivate, tiny } = require("../lib");
const config = require("../config");
const { isAdmin, parsedJid, isUrl } = require("../lib");
const { cron, saveSchedule } = require("../lib/scheduler");
const Jimp = require("jimp");
const Lang = {
  FILTER_DESC:
    "It adds a filter. If someone writes your filter, it send the answer. If you just write .filter, it show's your filter list.",
  NO_FILTER: "* There are no filters in this chat!*",
  FILTERS: tiny("your filters for this chat"),
  NEED_REPLY: "* Please type in reply!*\n*Example:*",
  FILTERED: "* Successfully set* ```{}``` *to filter!*",
  STOP_DESC: "Stops the filter you added previously.",
  NEED_FILTER: "* Please type a filter!*\n*Example:*",
  ALREADY_NO_FILTER: "* There is already no filter like this!*",
  DELETED: "* The filter was successfully deleted!*",
};

command(
  {
    pattern: "add ?(.*)",
    fromMe: true,
    desc: "Adds a person to the group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This Group Only Command_")
    let num = match || message.reply_message.jid
    if (!num) return await message.reply("_give  number or mention person_");
    let user = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    let admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_Add Me Admin First_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "add")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]} welcome duplicate indian kazhuverida Mwone_`, mentions: [user] })
  }
);


command(
  {
    pattern: "kick ?(.*)",
    fromMe: true,
    desc: "kick a person from the group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This group only command_")
    let num = match || message.reply_message.jid
    if (!num) return await message.reply("_give number or mention person_");
    let user = num.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
    let admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_Add Me admin first_");
    await message.client.groupParticipantsUpdate(message.jid, [user], "remove")
    return await message.client.sendMessage(message.jid, { text: `_@${user.split("@")[0]}, Odu myre kandam vazhi_`, mentions: [user] })
  }
);
command(
    {
        pattern: "ginfo",
        fromMe: isPrivate,
        desc: "group infp",
        type: "group",
    },
    async (message, match, client, m) => {
        if (!match || !match.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) return await message.reply("_Need A Group Link_");
let urlArray = (match).trim().split("/")[3];
	const metadata = await message.client.groupGetInviteInfo(urlArray)
const pari = "╭───────────┈⊷\n    _GROUP INFO_\n╰───────────┈⊷\n╭───────────┈⊷\n │═ ⪼ _Gname_ : " + metadata.subject + "\n │═ ⪼ _size_ : " + metadata.size + "\n │═ ⪼ _creator_ : " + (metadata.owner ? metadata.owner.split('@')[0] : 'unknown') + "\n │═ ⪼ _created on_ : " + require('moment-timezone')(metadata.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY') + "\n╰───────────┈⊷";
return await message.client.sendMessage(message.jid,{ text : (pari)}, {quoted: message })
    }
    );

command(
      { 
        pattern: "gjid",
        fromMe: isPrivate,
        desc: "group jid",
        type: "group",
      },
      async (message, match, client, m) => {
          if (!match || !match.match(/^https:\/\/chat\.whatsapp\.com\/[a-zA-Z0-9]/)) return await message.reply("_Need A Group Link_");
let urlArray = (match).trim().split("/")[3];
	const metadata = await message.client.groupGetInviteInfo(urlArray)
const andi = "╭───────────┈⊷\n    _GROUP JId_\n╰───────────┈⊷\n╭───────────┈⊷\n │═ ⪼:"+ metadata.id + "\n╰───────────┈⊷ ";
return await message.client.sendMessage(message.jid,{ text : (andi)},{quoted:message})
  });
