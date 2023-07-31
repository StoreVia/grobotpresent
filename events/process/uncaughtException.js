const ProcessEvent = require('../../structures/ProcessEventClass');

module.exports = class UncaughtException extends ProcessEvent {
	constructor(client){
		super(client, {
			name: 'uncaughtException',
			category: 'process',
		});
	}
	async run(err, origin){
        
        console.log(' [ AntiCrashDetection ]: Uncaught Exception/Catch');
        console.log(err, origin);
		
	}
};