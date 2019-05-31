const DISCORD_API_KEY = 'MjczMDU1NjAxMDAzODU1ODcy.XLX-TA.SD8NKME-rJ0F7a84zMh17hAsY7s';
const DISCORD_CHANNEL_KEY = '259536527221063683';
const TELEGRAM_API_KEY = '720740691:AAHqaJ2HaBXiPKxtTKqOhNro8_LweqvOfDc';
const TELEGRAM_CHAT_KEY = '836091152';

const Discord = require('discord.js');
const discordClient = new Discord.Client();

const Telegram = require('node-telegram-bot-api');
const telegramClient = new Telegram(TELEGRAM_API_KEY, { polling: true });

const listaPokemons = require('./lista.json');
const fs = require('fs');

/**
*  Init Functions 
**/

var send = (message) => {
    console.log(message);
    telegramClient.sendMessage(TELEGRAM_CHAT_KEY, message);
};

/**
* End Functions
**/

/**
*  Init Exceptions 
**/
// process.on('uncaughtException', function (err) {
//     send(`Caught exception: ${err}`);
//     if(cluster){
//         if (cluster.isWorker) {
//             process.exit(1);
//         };
//     };
//     telegramClient.stopPolling().then(() => {
//         cluster.fork();
//         cluster.on('exit', function (worker) {
//             send(`Worker ${worker.id} died..`);
//             cluster.fork();
//         });
//     });
// });
/**
*  End Exceptions
**/

discordClient.on('ready', () => {
    send(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.on('message', message => {
    if (message.channel.id === DISCORD_CHANNEL_KEY) {
        let numero = message.content.match(/(?<=\<a:)(.*)(?=:)/)[0];
        // if (!listaPokemons.includes(numero)) {
            let nome = message.content.match(/(?<=\*\*)(.*)(?=\<a)/)[0].replace('**','');
            let cp = message.content.match(/(?<=CP)(.*)(?= L.*\*\*)/)[0];
            let lvl = message.content.match(/(?<=L)(.*)(?=\*\*)/)[0];
            let link = message.content.match(/(?<=Community\: \<)(.*)(?=\>)/)[0];
            let mensagem = `(${numero}) ${nome} - CP ${cp} LV ${lvl} \n${link}`;
            send(mensagem);
        // }
        // console.log(`Número: ${message.content.match(/(?<=\<a:)(.*)(?=:)/)[0]}`);
        // console.log(`Nome: ${message.content.match(/(?<=\*\*)(.*)(?=\<a)/)[0].replace('**','')}`);
        // console.log(`CP: ${message.content.match(/(?<=CP)(.*)(?= L.*\*\*)/)[0]}`);
        // console.log(`LVL: ${message.content.match(/(?<=L)(.*)(?=\*\*)/)[0]}`);
        // console.log(`Link: ${message.content.match(/(?<=Community\: \<)(.*)(?=\>)/)[0]}`);
        fs.appendFile('mensagens.txt', message+"\n", function (err) {
            if (err) throw err;
          })
    }
});

discordClient.login(DISCORD_API_KEY);