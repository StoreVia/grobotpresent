require('dotenv').config();
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { 
    totalShards: `auto`,
    token: `${process.env.token}` 
});

manager.on('shardCreate', (shard) => {
    console.log(`Launched shard ${shard.id}`)
})

manager.spawn();
