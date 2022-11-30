const { SlashCommandBuilder } = require(`discord.js`)

module.exports = {
	type: "global",
	data: new SlashCommandBuilder()
		.setName("status")
		.setDescription("Показывает статус бота"),
	async execute(interaction) {
		interaction.reply({
			content: `Статус **Render**: Активен`,
			ephemeral: true
		})
	}
}