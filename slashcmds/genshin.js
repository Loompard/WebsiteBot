const { SlashCommandBuilder } = require(`discord.js`)
const config = {
	command: "genshinimpact",
	name: "Genshin Impact",
	roleId: "899254370183565323"
}

module.exports = {
	type: "guild",
	data: new SlashCommandBuilder()
		.setName(config.command)
		.setDescription(`Получить доступ к чатам ${config.name}`),
	async execute(interaction) {
		if(interaction.member.roles.cache.has(config.roleId)) {
			interaction.member.roles.remove(config.roleId)
			await interaction.reply({
				content: `Доступ к каналам **${config.name}** отключен\nЕсли захочешь вернуться - напиши эту команду ещё раз`,
				ephemeral: true
			})
		} else {
			interaction.member.roles.add(config.roleId)
			await interaction.reply({
				content: `Теперь у тебя есть доступ к каналам **${config.name}**\nЕсли тебе хочется убрать эти каналы, то можешь написать команду ещё раз`,
				ephemeral: true
			})
		}
	}
}