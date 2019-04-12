var express = require('express');
var app = express();

const Discord = require("discord.js");

const client = new Discord.Client();

const idChannel = "294605545464135690";
var channel = null
var rodar = false;
var lista = require('./lista.json')

client.on("ready", () => {
    console.log(`${new Date()} Logged in as ${client.user.tag}!`);

    channel = client.channels.find(ch => ch.id === idChannel);
});

client.on("message", msg => {
    if (msg.channel.id === idChannel) {
        if (msg.content.includes("GO GO GO!")) {
            lista = require('./lista.json')
            rodar = true
        } else if (msg.content.includes("Competition is finished, come back soon!")) {
            rodar = false
        }else{
            for(var i=0; i<lista.length; i++){
                if(lista[i].name === msg.content.toLowerCase()){
                    console.log("Removido: %s - %s restantes...", msg.content.toLowerCase(),lista.length)
                    lista.splice(i,1);
                }
             }
        }
    }
});


app.listen(3001, function () {
    yourFunction();
    setInterval(yourFunction, 11000);
});

function yourFunction () {
    if (rodar) {
        channel.send(lista[Math.floor( Math.random()*lista.length )].name)
    }
}

client.login(process.argv[2]);
