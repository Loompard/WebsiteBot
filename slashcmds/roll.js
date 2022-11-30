const { SlashCommandBuilder } = require(`discord.js`)

module.exports = {
	type: "global",
	data: new SlashCommandBuilder()
		.setName("roll")
		.setDescription("Бросить кубик 🎲")
		.addStringOption(option => option.setName('edges').setDescription('Количество граней на кубике')),
	async execute(interaction) {
		let max = parseInt(interaction.options.getString("edges")) || 6
		let random = Math.floor(Math.random() * max) + 1
		interaction.reply({
			content: `Выпало **${random}**🎲 ${max == 6 ? ("") : (`(максимум - ${max})`)}`
		})
	}
}