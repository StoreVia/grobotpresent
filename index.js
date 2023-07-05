require('dotenv').config();
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { shardCount: auto, token: `${process.env.token}` });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();
