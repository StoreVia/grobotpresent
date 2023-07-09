const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js');
const { Collection } = require('@discordjs/collection');
const CommandHandler = require('../handler/Command');
const EventHandler = require('../handler/Event');
const { QuickDB } = require("quick.db");
const { GiveawaysManager } = require("../B_Gro_Modules/discord-giveaways");
const { Player } = require('discord-player');
require('dotenv').config();

module.exports = class BotClient extends Client {
	constructor(...opt) {
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
		
		
		this.commands = new Collection();
		this.messagecommands = new Collection();
		this.aliases = new Collection();
		this.cooldowns = new Collection();
		this.messagecategories = require("fs").readdirSync(`./commands/message`);
		this.categories = require("fs").readdirSync(`./commands/slash`);
		["Command", "Event", "RegisterSlash", "AntiCrash"]
		.filter(Boolean)
		.forEach(h => {
  			require(`../handler/${h}`);
		})
		this.events = new Collection();
		this.db = new QuickDB();
		this.player = new Player(this);
		this.functions = require(`../handler/Functions`)
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
		new CommandHandler(this).build('../C_Private_Slash');
	}

	async login() {
		await super.login(process.env.token);
	}

	exit() {
		if (this.quitting) return;
		this.quitting = true;
		this.destroy();
	}

	fetchSlashCommand(cmd) {
		return this.commands.get(cmd);
	}

	fetchMessageCommand(cmd) {
		return this.messagecommands.get(cmd);
	}
};