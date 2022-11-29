const express = require(`express`)
const app = new express()

app.get("/", (req, res) => {
    res.send("<h1>Hello, world!</h1>")
})

app.listen(3000, () => {
    console.log("Website loaded")
})

const Discord = require(`discord.js`)
const bot = new Discord.Client({
    intents: [
        "AutoModerationConfiguration",
        "AutoModerationExecution",
        "DirectMessageReactions",
        "DirectMessageTyping",
        "DirectMessages",
        "GuildBans",
        "GuildEmojisAndStickers",
        "GuildIntegrations",
        "GuildInvites",
        "GuildMembers",
        "GuildMessageReactions",
        "GuildMessageTyping",
        "GuildMessages",
        "GuildPresences",
        "GuildScheduledEvents",
        "GuildVoiceStates",
        "GuildWebhooks",
        "Guilds",
        "MessageContent"
    ]
})
bot.on("ready", () => {
    console.log(`${bot.user.tag} started`)
})