module.exports = class Command {
    constructor(client, meta = {}) {
        this.client = client;
        this.data = meta.data;
        this.name = meta.name;
        this.alias = meta.alias;
        this.category = meta.category;
    }

    async run() {
        throw new Error(`The Slash Command ${this.name} Doesn't Have Any Run Method.`);
    }
};
