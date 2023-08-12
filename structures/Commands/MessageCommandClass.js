module.exports = class Command {
    constructor(client, meta = {}){
        this.client = client;
        this.name = meta.name;
        this.category = meta.category;
        this.cooldown = meta.cooldown || "3";
        this.alias = meta.alias;
    }

    async run(){
        throw new Error(`The Slash Command ${this.name} Doesn't Have Any Run Method.`);
    }
};
