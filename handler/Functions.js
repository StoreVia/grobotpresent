const { Collection } = require("discord.js");

/////////////////////////////////////////////{exports}/////////////////////////////////////////////////////////

module.exports.cmdCoolDown = cmdCoolDown;
module.exports.escapeRegex = escapeRegex;
module.exports.discordActivity = discordActivity;
module.exports.getOptions = getOptions;
module.exports.isValidURL = isValidURL;

/////////////////////////////////////////////{exports}/////////////////////////////////////////////////////////

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getOptions(interaction){
  function string(text){
    let stringInput = interaction.options.getString(text);
    return stringInput;
  }
  function user(usr){
    let usrInput = interaction.options.getUser(usr);
    return usrInput;
  }
  function channel(chl){
    let chlInput = interaction.options.getChannel(chl);
    return chlInput;
  }
  function integer(int){
    let intInput = interaction.options.getInteger(int);
    return intInput;
  }
  function number(num){
    let numInput = interaction.options.getNumber(num);
    return numInput;
  }
  function role(rle){
    let rleInput = interaction.options.getRole(rle);
    return rleInput;
  }
  return { string, user, channel, integer, number, role }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isValidURL(url){
  const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  return pattern.test(url);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cmdCoolDown(message, command) {
  let client = message.client;
  if(!message || !client) return;
  if(!command || !command.name) return;
  if(!client.cooldowns.has(command.name)){
    client.cooldowns.set(command.name, new Collection());
  }
  const time = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown) * 1000;
  if (time.has(`${message.member.id}`)) {
    const expirationTime = time.get(message.member.id) + cooldownAmount;
    if (Date.now() < expirationTime) {
      const timeLeft = (expirationTime - Date.now()) / 1000;
      return timeLeft
    } else {
      time.set(message.member.id, Date.now()); 
      setTimeout(() => time.delete(message.member.id), cooldownAmount); 
      return false;
    }
  }else {
    time.set(message.member.id, Date.now()); 
    setTimeout(() => time.delete(message.member.id), cooldownAmount); 
    return false;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function discordActivity(vcId, appId){
  const codes = {
    youtube: '880218394199220334',
    poker: '755827207812677713',
    jamspace: '1070087967294631976',
    puttparty: '763133495793942528',
    garticphone: '1007373802981822582',
    kwim: '1078728822972764312',
    chess: '832012774040141894',
    bobble: '947957217959759964',
    landio: '903769130790969345',
    sketchheads: '902271654783242291',
    blazing8: '832025144389533716',
    spellcast: '852509694341283871',
    checkers: '832013003968348200',
    lettertile: '879863686565621790',
  };
  let response = await fetch(`https://discord.com/api/v10/channels/${vcId}/invites`, {
    method: 'POST',
    body: JSON.stringify({
    max_age: 86400,
    max_uses: 0,
    target_application_id: codes[appId],
    target_type: 2,
    temporary: false,
    validate: null,
  }),
  headers: { Authorization: `Bot ${process.env.token}`, 'Content-Type': 'application/json', },
  });
  const invite = await response.json();
  if (invite.error || !invite.code) return console.log('An Error Occured While Genrating Link.');
  return `https://discord.com/invite/${invite.code}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////