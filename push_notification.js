const TelegramBot = require('node-telegram-bot-api')
const Discord = require('discord.js')

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

    if (msg.channel.id === ID_CHANNEL_NOTIFICATION) {
        var id = msg.content.substr(msg.content.indexOf("<a:") + 3, 5)
        id = id.slice(0,id.indexOf(":"))
        id = id.replace(':', '')

        if (!lista.includes(id)) {

            var mensagem = msg.content.replace(/\s/g, '')

            var nome = mensagem.substr(mensagem.indexOf(":**") + 3, mensagem.indexOf("**<a") - 11)
            var info = mensagem.substr(mensagem.indexOf("CP"), 10)
            info = info.slice(0, info.indexOf("L"))
            var link = mensagem.substring(mensagem.indexOf("Community:") + 10, mensagem.indexOf("Supportus"))
            if (link.includes('http')) {
                link = mensagem.substring(mensagem.indexOf("Community:<") + 11, mensagem.indexOf("Supportus") - 1)
            } else {
                link = 'ispoofer-pmgo://?location=' + link
            }


            bot.sendMessage(CHAT_ID, `${id}: ${nome} - ${info} \n ${link}`);

            console.log(mensagem)
            console.log(`${nome} - ${info}`)
            console.log(link)
        }
    }
});


client.login('MjczMDU1NjAxMDAzODU1ODcy.XLX-TA.SD8NKME-rJ0F7a84zMh17hAsY7s');

process.on('uncaughtException', function(err) {
    bot.sendMessage(CHAT_ID, 'Caught exception: ' + err);
    console.log('Caught exception: ' + err);
    if(cluster.isWorker) {
        process.exit(1);
    }
    bot.stopPolling().then(() => {
        cluster.fork();

        cluster.on('exit', function(worker){
            console.log('Worker ' + worker.id + ' died..');
            cluster.fork();
         });
    })
    
  });
