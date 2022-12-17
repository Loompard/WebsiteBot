const { SlashCommandBuilder } = require(`discord.js`)

module.exports = {
	type: "guild",
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Получить приглашение на сервер 🌀 𝙀𝙏𝙀𝙍𝙉𝙄𝙏𝙔"),
	async execute(interaction) {
		interaction.guild.invites.create(interaction.guild.channels.cache.find(x => x.name == "чат"), {
			maxUses: 0,
			maxAge: 0,
			temporary: true,
			unique: false
		}).then(invite => {
			interaction.reply({
				content: `${invite.url}`
			})
		})
	}
}