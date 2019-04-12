const Discord = require('discord.js');
const request = require("request")
const PushBullet = require('pushbullet');

const client = new Discord.Client();
const pusher = new PushBullet('o.layyISk0FGq5U6VXJiNkmoqzZShmDdB8');

const idChannel = '259536527221063683'
const idChannelPromo = '294605545464135690'
const url = "https://api.myjson.com/bins/lll9k"

var wanted = []

client.on('ready', () => {
    console.log(`${new Date()} Logged in as ${client.user.tag}!`);
        pusher.note(
            {},
            "Ready Notification",
            "",
            function (error, response) {

            });
});

client.on('message', msg => {
    if (msg.channel.id === idChannel && wanted.includes(msg.content.substr(msg.content.indexOf("<a:") + 3, 3))) {
        var mensagem = msg.content.replace(/\s/g,'')
        var nome = mensagem.substr(mensagem.indexOf(":**") + 3, mensagem.indexOf("**<a") - 11)
        var info = mensagem.substr(mensagem.indexOf("CP"), 6)
        info = info.slice(0,info.indexOf("L"))
        var link = mensagem.substring(mensagem.indexOf("Community:<") + 11, mensagem.indexOf("Supportus") - 1)
        pusher.link(
            {},
            `${nome} - ${info}`,
            link,
            "",
            function(error, response) {
                console.log(mensagem)
                console.log(`${nome} - ${info}`)
                console.log(link)
            });

    } else if (msg.channel.id === idChannelPromo && msg.content.includes("GO GO GO!")) {
        pusher.note(
            {},
            "Giveaway started!!!!",
            "",
            function (error, response) {

            });
    } else if (msg.channel.id === idChannelPromo && msg.content.includes("Competition is finished, come back soon!")) {
        pusher.note(
            {},
            "Giveaway ended!",
            "",
            function (error, response) {

            });
    }
});

request({
    url: url,
    json: true
}, function (error, response, body) {
    wanted = body;
    client.login('MjczMDU1NjAxMDAzODU1ODcy.XKzsFg.0Pmla3AHQ-C-tP64P3gw6nI6fdc');

})
