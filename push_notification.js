const Discord = require('discord.js');
const request = require("request")
const TelegramBot = require(`node-telegram-bot-api`)


const TOKEN = '720740691:AAHqaJ2HaBXiPKxtTKqOhNro8_LweqvOfDc'
const ID_CHANNEL_NOTIFICATION = '259536527221063683'
const CHAT_ID = '836091152'

const client = new Discord.Client();
const bot = new TelegramBot(TOKEN, { polling: true })

var lista = require('./lista.json')


client.on('ready', () => {
    bot.sendMessage(CHAT_ID, `Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.channel.id === ID_CHANNEL_NOTIFICATION && lista.includes(msg.content.substr(msg.content.indexOf("<a:") + 3, 3))) {

        var mensagem = msg.content.replace(/\s/g, '')

        var nome = mensagem.substr(mensagem.indexOf(":**") + 3, mensagem.indexOf("**<a") - 11)
        var info = mensagem.substr(mensagem.indexOf("CP"), 6)
        info = info.slice(0, info.indexOf("L"))
        var link = mensagem.substring(mensagem.indexOf("Community:<") + 11, mensagem.indexOf("Supportus") - 1)


        bot.sendMessage(CHAT_ID, `${nome} - ${info} \n ${link}`);

        console.log(mensagem)
        console.log(`${nome} - ${info}`)
        console.log(link)

    }
});


client.login(process.env.API_KEY || 'MjczMDU1NjAxMDAzODU1ODcy.XLDqRw.7pmo7cyGlhmj01K5uIyNDI8DcH0')
