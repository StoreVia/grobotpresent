const BaseCommand = require('../structures/Commands/CommandClass');
const MessageCommand = require('../structures/Commands/MessageCommandClass');
const path = require('path');
const { readdir, lstat } = require('fs').promises;

module.exports = class CommandClass {
	constructor(client){
		this.client = client;
	}

	async build(dir){
		
		const filePath = path.join(__dirname, dir);
		const files = await readdir(filePath);
		for(const file of files){
			const stat = await lstat(path.join(filePath, file));
			if(stat.isDirectory()) this.build(path.join(dir, file));
			if(file.endsWith('.js')){
				const Command = require(path.join(filePath, file));
				if(Command.prototype instanceof BaseCommand){
					const cmd = new Command(this.client);
					const cmdData = cmd.data.toJSON();
					const cmdSet = {
						name: cmdData.name,
						description: cmdData.description,
						category: cmd.category,
						options: cmdData.options,
						autocomplete: cmd.autocomplete,
						run: cmd.run,
					};
					this.client.commands.set(cmdSet.name, cmdSet);
				} else if(Command.prototype instanceof MessageCommand){
					const cmd = new Command(this.client);
					const cmdSet = {
						name: cmd.name,
						description: cmd.description,
						category: cmd.category,
						cooldown: cmd.cooldown,
						run: cmd.run,
					};
					this.client.messagecommands.set(cmdSet.name, cmdSet);
					if(cmd.alias && Array.isArray(cmd.alias)) cmd.alias.forEach((alias) => this.client.aliases.set(alias, cmd.name));
				}
			}
		}
	}
};