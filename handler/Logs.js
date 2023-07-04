const { readdirSync } = require("fs");
const colors = require("colors");

const logging = async () => {
  try {
    let amount = 0;
    let stringlength = 69;
    console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + `Loading Slash Commands`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Loading Slash Commands`.length) + "┃".bold.brightGreen)
    console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
    console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)

    readdirSync("./D_Global_Slash/").forEach((dir) => {
    const commands = readdirSync(`./D_Global_Slash/${dir}/`).filter((file) => file.endsWith(".js"));
      for (let file of commands) {
        let pull = require(`../D_Global_Slash/${dir}/${file}`);
        console.log(colors.red(`Slash : `) + colors.green(`${dir} : `) + colors.yellow(file + " - " + "File Was Loaded"));
        if (pull.name) {
          amount++;
        } else {
          console.log(file, `error -> missing a help.name, or help.name is not a string.`.brightRed);
          continue;
        }
      }
    });
    console.log(`${amount} Slash Command Files Exists.`.brightGreen);
  }catch (e) {
    console.log(String(e.stack).bgRed)
  }
}
logging();