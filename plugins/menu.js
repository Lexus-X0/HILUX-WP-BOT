const events = require("../lib/event");
const { command, isPrivate, tiny, serif_B, clockString } = require("../lib");
const config = require("../config");
const plugins = require("../lib/event");
const { HANDLERS, BOT_NAME, BOT_INFO } = require("../config");
const { PluginDB, installPlugin } = require("../lib/database/plugins");
const { hostname, uptime } = require("os");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

  command(
    {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All Commands",
    dontAddCommandList: true,
    type: "user",
  },
  async (message, match, m, client) => {
try{
    if (match) {
      for (let i of plugins.commands) {
        if (
          i.pattern instanceof RegExp &&
          i.pattern.test(message.prefix + match)
        ) {
          const cmdName = i.pattern.toString().split(/\W+/)[1];
let usern = message.pushName;
          message.reply(`\`\`\`Command: ${message.prefix}${cmdName.trim()}
Description: ${i.desc}\`\`\``);
        }
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");

      let menu = `╭───────────┈⊷ \n         *SUPERIOR* \n╰───────────┈⊷
╭───────────┈⊷
╠» Prefix : ${config.HANDLERS}
╠» mode :${config.WORK_TYPE.toLowerCase()}
╠» Date : ${date}
╠» Time : ${time}
╠» Creator : Superior
╰───────────┈⊷\n${readMore}\n`;

menu +=`\n`;

      let cmnd = [];
      let cmd;
      let category = [];
      plugins.commands.map((command, num) => {
        if (command.pattern instanceof RegExp) {
          cmd = command.pattern.toString().split(/\W+/)[1];
        }

        if (!command.dontAddCommandList  && cmd !== undefined) {
          let type = command.type ? command.type.toLowerCase() : "misc";

          cmnd.push({ cmd, type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `╭─────────────┈⊷`;
        menu += `\n│═ ⪼ *${cmmd.toUpperCase()}*`;
        menu += `\n╰─────────────┈⊷`
menu += `\n`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }) => {
          menu += `\n ➪  ${cmd.trim()}`;
        });
        menu += `\n`;
        menu += `\n`;
      });
      menu += `𝘊𝘳𝘦𝘢𝘵𝘦𝘥 𝘣𝘺 *𝘚𝘜𝘗𝘌𝘙𝘐𝘖𝘙.*`;
      let penu = tiny(menu)
      let img = config.BOT_INFO.split(';')[2]
      return await message.sendFromUrl(img, {fileLength: "5555544444", gifPlayback: true, caption: (penu)}, {quoted: message })
    }
}catch(e){
message.reply(e)
}
  }
);
