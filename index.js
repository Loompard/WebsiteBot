const pg = require(`pg`)
const fs = require(`fs`)
const Discord = require(`discord.js`)
const express = require(`express`)
const app = new express()

app.get("/", (req, res) => {
    res.send("<h1>Status: Active</h1>")
})

app.listen(3000, () => {
    console.log("Website started")
})

async function database() {
    /*const db = await dbpool.connect()
    let result = await db.query("INSERT INTO test VALUES ('aboba')")
    console.log(result)*/
}


const dbpool = new pg.Pool({
    connectionString: process.env.dbtoken,
    ssl: {
        rejectUnauthorized: false
    }
})

// Discord Bot Place
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
bot.commands = new Discord.Collection()

bot.on("ready", () => {
    console.log(`${bot.user.tag} started`)
    database()
})

bot.on("guildScheduledEventCreate", async (event) => {
	let channel
	if (event.channel) {
		let parent = event.channel.parentId
		let parentedChannels = event.guild.channels.cache.filter(x => x.parentId == parent)
		parentedChannels.sort((one, two) => { one.position - two.position })
		if (parentedChannels.size < 1) channel = bot.channels.cache.find(x => x.id == "750046448246063254")
		else channel = parentedChannels.first()
	} else channel = bot.channels.cache.find(x => x.id == "750046448246063254")
	if (channel.type == 0) {
		channel.send(`@here наверное...\n${event.creator} создаёт ивент ***${event.name}***\n${event.url}`)
	}
})

bot.on("messageCreate", (message) => {
    if(message.author.bot) return
    if(message.content.startsWith("!test")) message.reply("Статус **Render**: Активен")
    else return
})

// SLASH COMMANDS
const cmdFiles = fs.readdirSync("./slashcmds").filter(file => file.endsWith(".js"))
for (const file of cmdFiles) {
	const filePath = `./slashcmds/${file}`
	const cmd = require(filePath)
	if ('data' in cmd && 'execute' in cmd) {
		bot.commands.set(cmd.data.name, cmd)
	} else console.log(`[WARNING] Command ${filePath} don't have "data" or "execute" fields`)
}

bot.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if (!command) return
	try {
		await command.execute(interaction)
	} catch (error) {
		console.log(error)
		await interaction.reply({
			content: "Во время выполнения команды произошла ошибка",
			ephemeral: true
		})
	}
})

const rest = new Discord.REST().setToken(process.env.token);
(async () => {
	try {
		console.log(`Refreshing slash commands...`)
		let commandsArray = []
		const slashes = fs.readdirSync("./slashcmds").filter(file => file.endsWith('.js'))
		for (const file of slashes) {
			const cmdsave = require(`./slashcmds/${file}`)
			commandsArray.push(cmdsave.data.toJSON())
		}
		console.log(`Found ${commandsArray.length} application slash commands`)
		const data = await rest.put(
			Discord.Routes.applicationGuildCommands("447394216474050560", "394404781164068867"),
			{ body: commandsArray }
		)
		console.log(`Successfully reloaded ${data.length} application slash commands`)
	} catch (error) {
		console.log(error)
	}
})();

bot.login(process.env.token)