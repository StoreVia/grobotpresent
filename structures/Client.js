const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { Collection } = require('@discordjs/collection');
const CommandHandler = require('../handler/Command');
const EventHandler = require('../handler/Event');
const Functions = require('../handler/Functions');
const { QuickDB, JSONDriver } = require("quick.db");
const jsonDriver = new JSONDriver();
const { GiveawaysManager } = require("../B_Gro_Modules/discord-giveaways");
const { Player } = require('discord-player');
const { Server } = require("socket.io");
const Express = require("express");
const http = require("http");
require('dotenv').config();

module.exports = class BotClient extends Client {
	constructor(...opt){
		super({
			opt,
			partials: [
				Partials.GuildMember,
				Partials.Message,
				Partials.Channel,
				Partials.User
			],
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.GuildPresences,
				GatewayIntentBits.GuildBans,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.GuildIntegrations,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.GuildMessageTyping,
				GatewayIntentBits.GuildInvites,
				GatewayIntentBits.GuildEmojisAndStickers,
				GatewayIntentBits.DirectMessages,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.DirectMessageTyping,
				GatewayIntentBits.GuildMessageReactions,
				GatewayIntentBits.GuildVoiceStates,
			],
		});
		
		["Command", "Event", "RegisterSlash"].filter(Boolean).forEach(h => {require(`../handler/${h}`)});
		this.commands = new Collection();
		this.messagecommands = new Collection();
		this.aliases = new Collection();
		this.cooldowns = new Collection();
		this.messagecategories = require("fs").readdirSync(`./commands/message`);
		this.categories = require("fs").readdirSync(`./commands/slash`);
		this.events = new Collection();
		this.db = new QuickDB({ driver: jsonDriver });
		this.player = new Player(this);
		this.functions = new Functions(this);
		//123
		this.server = Express();
    	this.server.use("/", require("../C_Website"));
    	this.http = http.createServer(this.server);
		this.http.listen(3000);
    	this.io = new Server(this.http);
		//123
		this.giveawaysManager = new GiveawaysManager(this, {
			storage: "./giveaway_utility/giveaways.json",
			updateCountdownEvery: 5000,
			default: {
			  botsCanWin: false,
			  embedColor: process.env.ec,
			  embedColorEnd: process.env.ec,
			  reaction: "🎉"
			}
		});

		new EventHandler(this).build('../events');
		new CommandHandler(this).build('../commands/slash');
		new CommandHandler(this).build('../commands/message');
		new CommandHandler(this).build('../developer_commands');
	}

	async login(){
		await super.login(process.env.token);
	}

	exit(){
		if(this.quitting) return;
		this.quitting = true;
		this.destroy();
	}

	fetchSlashCommand(cmd){
		return this.commands.get(cmd);
	}

	fetchMessageCommand(cmd){
		return this.messagecommands.get(cmd);
	}
};