const TelegramBot = require('node-telegram-bot-api')
const Discord = require('discord.js')
const Pokedex = require('pokedex-promise-v2')


const TOKEN = '720740691:AAHqaJ2HaBXiPKxtTKqOhNro8_LweqvOfDc'
const ID_CHANNEL_NOTIFICATION = '259536527221063683'
const CHAT_ID = '836091152'
const regex = /\d/gm

const client = new Discord.Client();
const bot = new TelegramBot(TOKEN, { polling: true })
const P = new Pokedex()

var lista = require('./lista.json')


client.on('ready', () => {
    bot.sendMessage(CHAT_ID, `Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.channel.id === ID_CHANNEL_NOTIFICATION) {
        var id = msg.content.substr(msg.content.indexOf("<a:") + 3, 3)
        id = id.match( regex )

        P.getPokemonSpeciesByName(id)
            .then(function (response) {
                var idEvolutionChain = response.evolution_chain.url
                idEvolutionChain = idEvolutionChain.split('/')[6]
                P.getEvolutionChainById(idEvolutionChain)
                    .then(function (response) {

                        var evolutionRootNode = response.chain

                        var pokemonEvolutionFamily = getAllEvolutions(evolutionRootNode)
                        var evolutionIds = getPokemonIds(pokemonEvolutionFamily)

                        if (lista.some(v => evolutionIds.includes(v))) {

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

                    })
                    .catch(function (error) {
                        console.log('There was an ERROR: ', error);
                    });
            })
            .catch(function (error) {
                console.log('There was an ERROR: ', error);
            });
    }


});

function getAllEvolutions(node) {
    var storageArray = [];
    storageArray.push(node.species.url);

    var evolutionNodes = node.evolves_to;

    for (var i = 0; i < evolutionNodes.length; i++) {
        storageArray = storageArray.concat(getAllEvolutions(evolutionNodes[i]));
    }

    return storageArray;
}

function getPokemonIds(urlArray) {
    var intArray = [];
    for (var i = 0; i < urlArray.length; i++) {
        urlArray[i] = urlArray[i].split('/');
    }
    for (var j = 0; j < urlArray.length; j++) {
        var temp = (urlArray[j][urlArray[j].length - 2]) + ""
        intArray.push(temp);
    }
    return intArray;
}




client.login(process.env.API_KEY || 'MjczMDU1NjAxMDAzODU1ODcy.XLDqRw.7pmo7cyGlhmj01K5uIyNDI8DcH0')


