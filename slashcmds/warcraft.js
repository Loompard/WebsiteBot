const { SlashCommandBuilder } = require(`discord.js`)
const config = {
	command: "wow",
	name: "Wolrd of Warcraft",
	roleId: {
		horde: "948269343505014785",
		alliance: "948269264534654996"
	}
}

module.exports = {
	type: "guild",
	data: new SlashCommandBuilder()
		.setName(config.command)
		.setDescription(`Получить доступ к чатам ${config.name}`)
		.addStringOption(option => option.setName("faction").setDescription("Фракция (Альянс или Орда)").addChoices(
			{name: "Орда", value: "horde"},
			{name: "Альянс", value: "alliance"}
		).setRequired(true)),
	async execute(interaction) {
		let faction = interaction.options.getString("faction")
		let output
		if(faction == "horde") {
			if(interaction.member.roles.cache.has(config.roleId.alliance)) interaction.member.roles.remove(config.roleId.alliance)
			if(interaction.member.roles.cache.has(config.roleId.horde)) {
				interaction.member.roles.remove(config.roleId.horde)
				output = 1
			} else {
				interaction.member.roles.add(config.roleId.horde)
				output = 0
			}
		} else {
			if(interaction.member.roles.cache.has(config.roleId.horde)) interaction.member.roles.remove(config.roleId.horde)
			if(interaction.member.roles.cache.has(config.roleId.alliance)) {
				interaction.member.roles.remove(config.roleId.alliance)
				output = 1
			} else {
				interaction.member.roles.add(config.roleId.alliance)
				output = 0
			}
		}
		if(output == 1) interaction.reply({
			content: `Доступ к каналам **${config.name}** отключен\nЕсли захочешь вернуться - напиши эту команду ещё раз`,
			ephemeral: true
		})
		else interaction.reply({
			content: `Теперь у тебя есть доступ к каналам **${config.name}**\nЕсли тебе хочется убрать эти каналы, то можешь написать команду ещё раз`,
			ephemeral: true
		})
	}
}