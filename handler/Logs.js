const { readdirSync } = require("fs");
const colors = require("colors");

const logging = async () => {

  let slashamount = 0;
  let messageamount = 0;

  try {
    let stringlength = 69;
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Loading Slash Commands`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Loading Slash Commands`.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)

    readdirSync("./commands/slash").forEach((dir) => {
    const commands = readdirSync(`./commands/slash/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../commands/slash/${dir}/${file}`);
        console.log(colors.red(`Slash : `) + colors.green(`${dir} : `) + colors.yellow(file + " - " + "File Was Loaded"));
        if (pull.name) {
          slashamount++;
        } else {
          console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
          continue;
        }
      }
    });
  }catch (e) {
    console.log(String(e.stack).bgRed)
  }
  try {
    let stringlength = 69;
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Loading Message Commands`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Loading Message Commands`.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)

    readdirSync("./commands/message").forEach((dir) => {
    const commands = readdirSync(`./commands/message/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../commands/message/${dir}/${file}`);
        console.log(colors.red(`Message : `) + colors.green(`${dir} : `) + colors.yellow(file + " - " + "File Was Loaded"));
        if (pull.name) {
          messageamount++;
        } else {
          console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
          continue;
        }
      }
    });
  }catch (e) {
    console.log(String(e.stack).bgRed)
  }
  console.log(`${slashamount} Message Command Files Exists.`.brightGreen);
  console.log(`${messageamount} Message Command Files Exists.`.brightGreen);
}
logging();