module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
        console.log(' [ AntiCrashDetection ]:- Unhandled Rejection/Catch');
        console.log(reason, p);
    });
      process.on("uncaughtException", (err, origin) => {
        console.log(' [ AntiCrashDetection ]:- Uncaught Exception/Catch');
        console.log(err, origin);
    }); 
      process.on('uncaughtExceptionMonitor', (err, origin) => {
        console.log(' [ AntiCrashDetection ]:- Uncaught Exception/Catch (MONITOR)');
        console.log(err, origin);
    });
}