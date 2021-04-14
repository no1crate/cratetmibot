const tmi = require("tmi.js")
let newMessage;
const streamer = "pylord_"
let chillMode = false;
function roll(min, max) {
	return Math.floor(Math.random() * (max - min)) + min; // You can remove the Math.floor if you don't want it to be an integer
}
function rollFloat(minInt, maxInt, minFloat, maxFloat){
  return Math.floor(Math.random() * (maxInt - minInt)) + minInt + "." + Math.floor(Math.random() * (maxFloat - minFloat)) + minFloat; // You can remove the Math.floor if you don't want it to be an integer
}
const blacklist = []
const prefix = "-"
let backdoorUser;

let blacklistuser = ""
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

client.on('connected', (address, port) => {
  
  const date = new Date()
  const minutes = date.getMinutes()
  const hours = date.getHours()
  console.log(`[${hours}:${minutes}] info: Connected to ${address}:${port}`)
  client.say(streamer, `Conectado`)
})
client.on('chat', (target, ctw, message, self) => {
  if(self) return;

  const username = ctw.username;
  const isMod = ctw.mod;
  const isSubscriber = ctw.subscriber;
  const isVip = ctw.turbo;
  const date = new Date()
  const minutes = date.getMinutes()
  const hours = date.getHours()
  console.log(`[${hours}:${minutes}] info: Connected to the ${target} IRC channel!`);
  console.log(ctw);
  console.log(blacklistuser)

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
  if(chillMode == false){ 
    if(blacklistuser.includes(username) != true){
      if (userMessage.startsWith(prefix + "say")){
        const say = withUpperCaseMessage.replace(prefix + "say ", "")
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
          client.say(streamer, `${blockedUser} bloqueado sastifactoriamente (bloqueado por ${username})`)
          blacklistuserstring += blockedUser + " "
          } else {
          client.say(streamer, `${username} bloqueado sastifactoriamente (bloqueado por ${username})`)
          blacklistuserstring += username + " "
          }
        }
      } else if(userMessage == prefix + "facha"){
        const porcentajesAleatorio = roll(0, 100);
        client.say(streamer, `${username} tiene un ${porcentajesAleatorio}% de facha`)
      } else if(userMessage == prefix + "calle"){
        const porcentajesAleatorio = roll(0, 100);
        client.say(streamer, `${username} tiene un ${porcentajesAleatorio}% de calle`)
      }else if(userMessage == prefix + "roll"){
        const rollNum = roll(0, 10);
        client.say(streamer, `${username} ha sacado ${rollNum}`)
      } else if(userMessage.startsWith(prefix + "unbanall")){
        if(username == "no1crate" || username == streamer || isMod == true || username == backdoorUser){
          client.say(streamer, `Todos fueron desbloquedos sastifactoriamente por ${username}`)
          blacklistuser = ""
        }
      } else if(userMessage == prefix + "disconnect"){
        if(username == "no1crate"){
          client.say(target, "Bueno gente, me retiro")
          client.disconnect()
        }
      } else if(userMessage.startsWith(prefix + "confi")){
          usernameConfi = userMessage.replace(prefix + "confi ", "")
          client.say(target, `${usernameConfi} deja de flashear confianza pa`)
      } else if(userMessage == prefix + "historybans"){
        client.say(target, blacklistuser)
      } else if(userMessage == prefix + "floatroll"){
        const randomFloatNumber = rollFloat(0, 10, 0, 99)
        if(randomFloatNumber < 5.00){
          client.say(target, `${username} ha sacado ${randomFloatNumber}, reprobado :(`)
        } else if(randomFloatNumber > 5.99){
          client.say(target, `${username} ha sacado ${randomFloatNumber}, aprobado :)`)
        } else if(randomFloatNumber > 4.99 && randomFloatNumber < 6.00){
          client.say(target, `${username} ha sacado ${randomFloatNumber}, repeti pa :|`)
        }
      } else if(userMessage == prefix + "chillmode"){
        if(username == "no1crate" || username == streamer || isMod == true){
          client.say(target, "Bueno gente, me voy a chillear un poco")
          chillMode = true
        }
      } else {
        return
      }
  } else {
    if(userMessage.startsWith(prefix)){
      client.say(target, `Estas bloqueado de el bot ${username}`)
    } else{ return }
  }
   
} else if(chillMode == true){
  if(userMessage == prefix + "nochill"){
     if(username == "no1crate" || username == streamer || isMod == true){ 
      chillMode = false
      client.say(target, "A trabajar")
    }
  } else if(userMessage.startsWith(prefix)){
    client.say(target, `Ando chill, no quiero que me molesten porfavor ${username}`)
  } 
}


})

process.stdin.on('data', function(data){
  newMessage = data.toString();
  if(chillMode == false){
    client.say(streamer, newMessage)
  } else if(chillMode == true){
    const date = new Date()
    const minutes = date.getMinutes()
    const hours = date.getHours()
    console.log(`[${hours}:${minutes}] info: Quiero estar chill, dejame estar tranca`)
  }
})
