const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const fs = require('fs');
require('dotenv').config();

const deploy = async () => {

	const commandData = [];
	const privateData = [];
	function devPrefix(name){
		return `dev${name}`;
	}	

	fs.readdirSync('./commands/slash').forEach(async category => {
		const commands = fs.readdirSync(`./commands/slash/${category}/`).filter(cmd => cmd.endsWith('.js'));
		for (const command of commands) {
			const Command = require(`../commands/slash/${category}/${command}`);
			const cmd = new Command();
			const cmdData = cmd.data.toJSON();
			commandData.push(cmdData);
		}
	});

	fs.readdirSync('./developer_commands/').forEach(async category => {
		const commands1 = fs.readdirSync(`./developer_commands/${category}/`).filter(cmd => cmd.endsWith('.js'));
		for(const command of commands1) {
			const Command1 = require(`../developer_commands/${category}/${command}`);
			const cmd1 = new Command1();
			const cmdData1 = cmd1.data.toJSON();
			privateData.push(cmdData1)		  
		}
	})

	const rest = new REST({ version: '10' }).setToken(process.env.token);

	try{
		let clientId = `${process.env.client_id}`;
		let psid = `${process.env.privateserver_id}`;
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commandData },
		)
		await rest.put(
			Routes.applicationGuildCommands(clientId, psid),
			{ body: privateData },
		)
	}
	catch(e){
		console.error(e);
	}
};

deploy();