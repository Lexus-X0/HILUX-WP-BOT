const {
    translate
} = require('@vitalets/google-translate-api');
const TRT = async (text, lang = 'en') => {
    const res = await translate(text, {
        to: lang,
        autoCorrect: true
    }).catch(_ => "requst faild with status code 303")
    return res;
}
const { command, isPrivate } = require("../lib/");
command(
	{
		pattern: 'trt ?(.*)',
		fromMe: isPrivate,
		desc: "translate",
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message.text)
			return await message.reply("_Reply to a text msg_")
                if(!match) return await message.reply("_it's not a text msg_");
                const {text} = await TRT(message.reply_message.text, match)
		return await message.sendMessage(text);
	}
)
