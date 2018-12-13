const Discord = require('discord.js'); //Z Bot

const Util = require('discord.js');

const GOOGLE_API_KEY = "AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8"

const getYoutubeID = require('get-youtube-id');

const Canvas = require("canvas");

const jimp = require("jimp");

const convert = require("hh-mm-ss");

const dateFormat = require('dateformat');

const fetchVideoInfo = require('youtube-info');

const YouTube = require('simple-youtube-api');

const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4"; 

const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");

const ytdl = require('ytdl-core');

const fs = require('fs');

const gif = require("gif-search");

const moment = require('moment');

const client = new Discord.Client({disableEveryone: true});

const prefix = '$'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setGame(`$help | $inv`,'https://www.twitch.tv/v5bz');
});

client.on("message", message => {
var prefix = "$";
if (message.content === "$help") {
message.channel.send('**تم الارسال علي الخاص**');
const embed = new Discord.RichEmbed() 
.setColor("RANDOM")
.setDescription(`
وصف عن البوت
:gem: البوت فيه كثير ميزات حلوة و جميلة
                                      
:rocket: البوت يعمل 24 ساعه
                                      
:up: خدمة سبورت 24/7
                                      
:free: البوت مجاني %100

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

__**General Commands**__
**『$server / يعرض لك معلومات عن السيرفر』
『$bot / يعرض لك كل معلومات البوت』
『$fm / عرض لك عدد كل حالات الاشخاص وعدد البوتات وعدد الاشخاص』
『$id /  معلومات عنك』
『$allbots /  لعرض جميع البوتات الي بالسيرفر』
『$savatar / صورة السيرفر』
『$avatar / صورتك او صورة الي تمنشنة』
『$inv / لدعوة البوت الى سيرفرك』
『$support / سيرفر الدعم』
『$contact / ارسال اقتراح او لمراسلة صاحب البوت』**

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

 __**Administrative Commands**__
**『$move @user / لسحب الشخص الى روومك』
『$bc / رسالة جماعية الى كل اعضاء السيرفر』
『$hchannel / اخفاء الشات』
『$schannel / اضهار الشات المخفية』
『$clear / مسح الشات』
『$mute @user <reason> / اعطاء العضو ميوت لازم رتبة <Muted>』
『$unmute @user / لفك الميوت عن الشخص 』
『$kick @user <reason> / طرد الشخص من السيرفر』
『$ban @user <reason> / حضر الشخص من السيرفر』
『$mutechannel / تقفيل الشات』
『$unmutechannel / فتح الشات』
『$ct <name> / انشاء شات』
『$cv <name> / انشاء رووم فويس』**

`)
message.author.sendEmbed(embed)
                                    
}
}); 
      

client.on("guildMemberAdd", member => {
    member.createDM().then(function (channel) {
    return channel.send(`:rose:  ولكم نورت السيرفر:rose: 
  :crown:اسم العضو  ${member}:crown:  
  انت العضو رقم ${member.guild.memberCount} `) 
  }).catch(console.error)
  })
  
  
  
  
  
  
  client.on('message', function(msg) {
      if(msg.content.startsWith ('$server')) {
        if(!msg.channel.guild) return msg.reply('**:x: اسف لكن هذا الامر للسيرفرات فقط **');         
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(msg.guild.iconURL)
        .addField(':globe_with_meridians: **اسم السيرفر : **' , `**[ ${msg.guild.name} ]**`,true)
        .addField(':earth_africa: ** موقع السيرفر :**',`**[ ${msg.guild.region} ]**`,true)
        .addField(':military_medal:** الرتب :**',`**[ ${msg.guild.roles.size} ]**`,true)
        .addField(':bust_in_silhouette:** عدد الاعضاء :**',`**[ ${msg.guild.memberCount} ]**`,true)
        .addField(':white_check_mark:** عدد الاعضاء الاونلاين :**',`**[ ${msg.guild.members.filter(m=>m.presence.status == 'online').size} ]**`,true)
        .addField(':pencil:** الرومات الكتابية :**',`**[ ${msg.guild.channels.filter(m => m.type === 'text').size} ]**`,true)
        .addField(':loud_sound:** رومات الصوت :**',`**[ ${msg.guild.channels.filter(m => m.type === 'voice').size} ]**`,true)
        .addField(':crown:** صاحب السيرفر :**',`**[ ${msg.guild.owner} ]**`,true)
        .addField(':id:** ايدي السيرفر :**',`**[ ${msg.guild.id} ]**`,true)
        .addField(':date:** تم عمل السيرفر في : **',msg.guild.createdAt.toLocaleString())
        msg.channel.send({embed:embed});
      }
    });
  
    client.on('message', message =>{
        let args = message.content.split(' ');
        let prefix = '$'; 
        
        if(args[0] === `${prefix}avatar`){
            let mentions = message.mentions.members.first()
            if(!mentions) {
              let sicon = message.author.avatarURL
              let embed = new Discord.RichEmbed()
              .setImage(message.author.avatarURL)
              .setColor("#f7abab") 
              .setDescription(`**${message.author.username}#${message.author.discriminator}**'s avatar :`);
              message.channel.send({embed})
            } else {
              let sicon = mentions.user.avatarURL
              let embed = new Discord.RichEmbed()
              .setColor("#f7abab")
              .setDescription(`**${mentions.user.username}#${mentions.user.discriminator}**'s avatar :`)
              .setImage(sicon)
              message.channel.send({embed})
            }
        };
    });
    
    client.on("message", msg => {
      if(msg.content === '$' + "id") {
          const embed = new Discord.RichEmbed();
      embed.addField("🔱| اسم الحساب :", `${msg.author.username}#${msg.author.discriminator}`, true)
              .addField("🆔| الاي دي :", `${msg.author.id}`, true)
              .setColor("RANDOM")
              .setFooter(msg.author.username , msg.author.avatarURL)
              .setThumbnail(`${msg.author.avatarURL}`)
              .setTimestamp()
              .setURL(`${msg.author.avatarURL}`)
              .addField('📛| الحالة :', `${msg.author.presence.status.toUpperCase()}`, true)
              .addField('🎲| بلاينج :', `${msg.author.presence.game === null ? "No Game" : msg.author.presence.game.name}`, true)
              .addField('🏅| الرتب : ', `${msg.member.roles.filter(r => r.name).size}`, true)
              .addField('📅| تم الانضمام للديسكورد في :', `${msg.createdAt}`,true)
              .addField('🤖| هل هو بوت ؟', `${msg.author.bot.toString().toUpperCase()}`, true);
          msg.channel.send({embed: embed})
      }
    });
    
    
    client.on('message', async message =>{
        if (message.author.boss) return;
          var prefix = "$";
      
      if (!message.content.startsWith(prefix)) return;
          let command = message.content.split(" ")[0];
           command = command.slice(prefix.length);
          let args = message.content.split(" ").slice(1);
          if (command == "mute") {
              if (!message.channel.guild) return;
              if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("انت لا تملك صلاحيات !! ").then(msg => msg.delete(5000));
              if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("البوت لايملك صلاحيات ").then(msg => msg.delete(5000));;
              let user = message.mentions.users.first();
              let muteRole = message.guild.roles.get("name", "Muted");
              if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
              if (message.mentions.users.size < 1) return message.reply('** يجب عليك المنشن اولاً **').then(msg => {msg.delete(5000)});
              let reason = message.content.split(" ").slice(2).join(" ");
              message.guild.member(user).addRole(muteRole);
              const muteembed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setAuthor(`Muted!`, user.displayAvatarURL)
              .setThumbnail(user.displayAvatarURL)
              .addField("**:busts_in_silhouette:  المستخدم**",  '**[ ' + `${user.tag}` + ' ]**',true)
              .addField("**:hammer:  تم بواسطة **", '**[ ' + `${message.author.tag}` + ' ]**',true)
              .addField("**:book:  السبب**", '**[ ' + `${reason}` + ' ]**',true)
              .addField("User", user, true)
              message.channel.send({embed : muteembed});
              var muteembeddm = new Discord.RichEmbed()
              .setAuthor(`Muted!`, user.displayAvatarURL)
              .setDescription(`      
      ${user} انت معاقب بميوت كتابي بسبب مخالفة القوانين
      ${message.author.tag} تمت معاقبتك بواسطة
      [ ${reason} ] : السبب
      اذا كانت العقوبة عن طريق الخطأ تكلم مع المسؤلين
      `)
              .setFooter(`في سيرفر : ${message.guild.name}`)
              .setColor("RANDOM")
          user.send( muteembeddm);
        }
      if(command === `unmute`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
      if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("**ما عندي برمشن**").then(msg => msg.delete(6000))
      
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");
      
        let role = message.guild.roles.find (r => r.name === "Muted");
        
        if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")
      
        await toMute.removeRole(role)
        message.channel.sendMessage("**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:");
      
        return;
      
        }
      
      });
    
      client.on('message', message => {
        var prefix = "$"
      if (message.author.x5bz) return;
      if (!message.content.startsWith(prefix)) return;
    
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
    
      let args = message.content.split(" ").slice(1);
    
      if (command == "ban") {
                   if(!message.channel.guild) return message.reply('** This command only for servers**');
             
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
      if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
      let user = message.mentions.users.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      /*let b5bzlog = client.channels.find("name", "5bz-log");
      if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
      if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
      if(!reason) return message.reply ("**اكتب سبب الطرد**");
      if (!message.guild.member(user)
      .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
    
      message.guild.member(user).ban(7, user);
    
      const banembed = new Discord.RichEmbed()
      .setAuthor(`BANNED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
      .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
      .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
      message.channel.send({
        embed : banembed
      })
    }
    });
    
    client.on('message', message => {
        var prefix = "$"
      if (message.author.x5bz) return;
      if (!message.content.startsWith(prefix)) return;
    
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
    
      let args = message.content.split(" ").slice(1);
    
      if (command == "kick") {
                   if(!message.channel.guild) return message.reply('** This command only for servers**');
             
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
      let user = message.mentions.users.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
      if(!reason) return message.reply ("**اكتب سبب الطرد**");
      if (!message.guild.member(user)
      .kickable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
    
      message.guild.member(user).kick();
    
      const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
      .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
      .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
      message.channel.send({
        embed : kickembed
      })
    }
    });
    
    
     
    
    
    client.on('message', async message => {
                if(message.content.includes('discord.gg')){ 
                    if(message.member.hasPermission("MANAGE_GUILD")) return;
            if(!message.channel.guild) return;
            message.delete()
              var command = message.content.split(" ")[0];
        let muterole = message.guild.roles.find(`name`, "Muted");
        if(!muterole){
          try{
            muterole = await message.guild.createRole({
              name: "Muted",
              color: "#9c9c9c",
              permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          }catch(e){
            console.log(e.stack);
          }
        }
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         message.member.addRole(muterole);
        const embed500 = new Discord.RichEmbed()
          .setTitle("ميوت بسبب نشر")
                .addField(`**لقد تم إعطائك ميوت كتابي **` , `**السبب: نشر رابط سيرفر في الديسكورد**`)
                .setColor("c91616")
                .setThumbnail(`${message.author.avatarURL}`)
                .setAuthor(message.author.username, message.author.avatarURL)
            .setFooter(`${message.guild.name} `)
         message.channel.send(embed500)
         message.author.send('**لو كان الميوت عن طريق الخطاء كلم الاداره**');
    
                  
                  
                  
                  }
    })
    
    
     client.on('message', message => {
        if(!message.channel.guild) return;
    var prefix = "$";
                   if(message.content.startsWith(prefix + 'allbots')) {
    
       
       if (message.author.bot) return;
       let i = 1;
           const botssize = message.guild.members.filter(m=>m.user.bot).map(m=>`${i++} - <@${m.id}>`);
             const embed = new Discord.RichEmbed()
             .setAuthor(message.author.tag, message.author.avatarURL)
             .setDescription(`**Found ${message.guild.members.filter(m=>m.user.bot).size} bots in this Server**
    ${botssize.join('\n')}`)
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();
    message.channel.send(embed)
    
    }
    
    
    });
    
    client.on('message', message => {
        var prefix = "$";
    if(!message.channel.guild) return;
    if(message.content.startsWith(prefix + 'move')) {
     if (message.member.hasPermission("MOVE_MEMBERS")) {
     if (message.mentions.users.size === 0) {
     return message.channel.send("``لاستخدام الأمر اكتب هذه الأمر : " +prefix+"move [USER]``")
    }
    if (message.member.voiceChannel != null) {
     if (message.mentions.members.first().voiceChannel != null) {
     var authorchannel = message.member.voiceChannelID;
     var usermentioned = message.mentions.members.first().id;
    var embed = new Discord.RichEmbed()
     .setTitle("Succes!")
     .setColor("#000000")
     .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
    var embed = new Discord.RichEmbed()
    .setTitle(`You are Moved in ${message.guild.name}`)
     .setColor("RANDOM")
    .setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
     message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
    message.guild.members.get(usermentioned).send(embed)
    } else {
    message.channel.send("``لا تستطيع سحب "+ message.mentions.members.first() +" `يجب ان يكون هذه العضو في روم صوتي`")
    }
    } else {
     message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو أليك``**")
    }
    } else {
    message.react("❌")
     }}});

     client.on("message", message => {
        const prefix = "$"
                  
              if(!message.channel.guild) return;
       if(message.author.bot) return;
          if(message.content === prefix + "savatar"){ 
              const embed = new Discord.RichEmbed()
      
          .setTitle(`${message.guild.name}.png`)
      .setAuthor(message.author.username, message.guild.iconrURL)
        .setColor(0x164fe3)
        .setImage(message.guild.iconURL)
        .setURL(message.guild.iconURL)
                        .setTimestamp()
    
       message.channel.send({embed});
          }
      });
    
      client.on('message',function(message) {
        if (message.author.bot) return;
      var prefix = "$";
                        if(!message.channel.guild) return;
      
                          if (message.content === prefix + "fm") {
       const embed = new Discord.RichEmbed()
      
          .setDescription(`**Members info :sparkles:
      :green_heart: online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
      :heart:  dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
      :yellow_heart:  idle:     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
      :diamond_shape_with_a_dot_inside:   membersCount:  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}
      :bulb: bots: ${message.guild.members.filter(m=>m.user.bot).size} **`)
               message.channel.send({embed});
      
          }
            });  

     client.on('message', message => {
                    var prefix = "$";
                           if(message.content === prefix + "mutechannel") {
                                               if(!message.channel.guild) return message.reply('** This command only for servers**');
                    
                       if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ليس لديك صلاحيات__**');
                                  message.channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: false
                    
                                  }).then(() => {
                                      message.reply("**__تم تقفيل الشات__ :white_check_mark: **")
                                  });
                                    }
                    //FIRE BOT
                        if(message.content === prefix + "unmutechannel") {
                                            if(!message.channel.guild) return message.reply('** This command only for servers**');
                    
                       if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ليس لديك صلاحيات__**');
                                  message.channel.overwritePermissions(message.guild.id, {
                                SEND_MESSAGES: true
                    
                                  }).then(() => {
                                      message.reply("**__تم فتح الشات__:white_check_mark:**")
                                  });
                        }
                           
                    });   

                    client.on('message', omar => {
                        var prefix = "$";
                        if(omar.content.split(' ')[0] == prefix + 'dc') {  // delete all channels
                        if (!omar.channel.guild) return;
                        if(!omar.guild.member(omar.author).hasPermission("MANAGE_CHANNELS")) return omar.reply("**You Don't Have ` MANAGE_CHANNELS ` Permission**");
                        if(!omar.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return omar.reply("**I Don't Have ` MANAGE_CHANNELS ` Permission**");
                        omar.guild.channels.forEach(m => {
                        m.delete();
                        });
                        }
                        if(omar.content.split(' ')[0] == prefix + 'dr') { // delete all roles
                        if (!omar.channel.guild) return;
                        if(!omar.guild.member(omar.author).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return omar.reply("**You Don't Have ` MANAGE_ROLES_OR_PERMISSIONS ` Permission**");
                        if(!omar.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return omar.reply("**I Don't Have ` MANAGE_ROLES_OR_PERMISSIONS ` Permission**");
                        omar.guild.roles.forEach(m => {
                        m.delete();
                        });
                        omar.reply("`تم حذف جميع الرتب بنجاح`")
                        }
                        });
                        
                        client.on("message", (message) => {
                            if (message.content.startsWith("$ct")) {
                                        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
                                    let args = message.content.split(" ").slice(1);
                                message.guild.createChannel(args.join(' '), 'text');
                            message.channel.sendMessage('تـم إنـشاء روم كـتابـي')
                            
                            }
                            });
                            
                            
                            client.on("message", (message) => {
                            if (message.content.startsWith("$cv")) {
                                        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
                                    let args = message.content.split(" ").slice(1);
                                message.guild.createChannel(args.join(' '), 'voice');
                                message.channel.sendMessage('تـم إنـشاء روم صـوتي')
                                
                            }
                            });
                        
                            
                            client.on('message', msg => {
                                if(msg.content.startsWith('$invitebot')) {
                                if(msg.channel.type === 'dm') return;
                            const user = msg.mentions.users.first();
                            if(!user) return msg.channel.send('``' + '**قم بتحديد بوت**' + '``')
                            if(!user.bot) return msg.reply('\`منشن بوت\`');
                            msg.channel.send(`**Bot InviteURL : ** https://discordapp.com/oauth2/authorize?client_id=${user.id}&scope=bot&permissions=384064`)
                                }
                            });
                            
                            
                            client.on('message',function(message) {
                                let prefix = "$";
                            let args = message.content.split(" ").slice(1).join(" ");
                            if(message.content.startsWith(prefix + "say")) {
                            if(!args) return;
                            message.channel.send(`**# ${args}**`); // محطوط # عشان محد يستخدم البوت لتبنيد / طرد احد من السيرفر
                            }
                            });
                            
                            
                            
                                        
                                            
                            
                             
                            client.on('message', message => { //By |.iiMostafaYT#1001
                                if (message.content.startsWith("$bot")) { //By |.iiMostafaYT#1001
                                message.channel.send({ //By |.iiMostafaYT#1001
                                    embed: new Discord.RichEmbed() //By |.iiMostafaYT#1001
                                        .setAuthor(client.user.username,client.user.avatarURL) //By |.iiMostafaYT#1001
                                        .setThumbnail(client.user.avatarURL) //By |.iiMostafaYT#1001
                                        .setColor('RANDOM') //By |.iiMostafaYT#1001
                                        .setTitle('Info RoadBot.') //By |.iiMostafaYT#1001
                                        .addField('**My Ping**' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true) //By |.iiMostafaYT#1001
                                        .addField('**RAM Usage**', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true) //By |.iiMostafaYT#1001
                                        .addField('**Servers**', [client.guilds.size], true) //By |.iiMostafaYT#1001
                                        .addField('**Channels**' , `[ ${client.channels.size} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**Users**' ,`[ ${client.users.size} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**My Name**' , `[ ${client.user.tag} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**My ID**' , `[ ${client.user.id} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**DiscordJS**' , `[ ${Discord.version} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**NodeJS**' , `[ ${process.version} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**Arch**' , `[ ${process.arch} ]` , true) //By |.iiMostafaYT#1001
                                        .addField('**Platform**' , `[ ${process.platform} ]` , true) //By |.iiMostafaYT#1001
                                              .addField('**My Prefix**' , `[ ${prefix} ]` , true) //By |.iiMostafaYT#1001
                                              .addField('**My Language**' , `[ Java Script ]` , true) //By |.iiMostafaYT#1001
                                              .setFooter('By | - Mostafa , RD#1001') //By |.iiMostafaYT#1001
                                }) //By |.iiMostafaYT#1001
                            } //By |.iiMostafaYT#1001
                            }); //By |.iiMostafaYT#1001
   
                          
                          client.on('message', message => {
                              if (!message.channel.guild) return;
                          if(message.content =='$count')
                          var IzRo = new Discord.RichEmbed()
                          .setThumbnail(message.author.avatarURL)
                          .setFooter(message.author.username, message.author.avatarURL)
                          .setTitle('Members Count')
                          .addBlankField(true)
                          .addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
                          message.channel.send(IzRo);
                          });
                          
                          
             
             
                          
                          client.on('guildCreate', guild => {
                              var embed = new Discord.RichEmbed()
                              .setColor(0x5500ff)
                              .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`)
                                  guild.owner.send(embed)
                            });
                          
                          
                            
                          
                          
                          
                          
                          
                           
                                                              
                                                              client.on('message', message => {
                                                                      if (message.content === "$inv") {
                                                                          if(!message.channel.guild) return;
                                                                      let embed = new Discord.RichEmbed()
                                                                      .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
                                                                      .setTitle(`:small_orange_diamond: Invite Link `)
                                                                      .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=520216417191067658&permissions=8&scope=bot`)        
                                                                   message.channel.sendEmbed(embed);
                                                                     }
                                                                 });  
                          
                                                                 client.on('message', message => {
                                                                    if (message.content === "$support") {
                                                                    let embed = new Discord.RichEmbed()
                                                                 .setAuthor(message.author.username)
                                                                 .setColor("#9B59B6")
                                                                 .addField(" ** :gear: Server Support :gear: **" , "  **https://discord.gg/TGGFMCb**")
                                                                    
                                                                    
                                                                 message.channel.sendEmbed(embed);
                                                                   }
                                                               });
                            
                            
                                                               client.on('message', message => {
                                                                var prefix = "$";
                                                        if (message.author.bot) return;
                                                        if (!message.content.startsWith(prefix)) return;
                                                    
                                                        let command = message.content.split(" ")[0];
                                                        command = command.slice(prefix.length);
                                                    
                                                        let args = message.content.split(" ").slice(1);
                                                    
                                                        if (command == "embed") {
                                                            if (!message.channel.guild) return message.reply('** This command only for servers **');
                                                            let say = new Discord.RichEmbed()
                                                                .addField('Emebad:', `${message.author.username}#${message.author.discriminator}`)
                                                                .setDescription(args.join("  "))
                                                                .setColor(0x23b2d6)
                                                            message.channel.sendEmbed(say);
                                                            message.delete();
                                                        }
                                                    });
                            
                               
                                                   
                                                            
                                                               
                                                            
                                                            
                                                               
                             client.on('guildCreate', guild => {
                               
                              client.channels.get("520330714953023518")
                             const embed = new Discord.RichEmbed()
                               .setAuthor(`بوتك دخل سيرفر جديد مبروك ✅`)
                               .setDescription(`**
                             Server name: __${guild.name}__
                             Server id: __${guild.id}__
                             Server owner: __${guild.owner}__
                             Member Count: __${guild.memberCount}__
                             Servers Counter : __${client.guilds.size}__**`)
                                     .setColor("#f3ae10")
                                     .addField("New Server!")
                                     .setFooter('RoadBot.' , client.user.avatarURL)
                                       client.channels.get("520330714953023518").send({embed}); //Sup
                             }
                             
                            );
                            
                            client.on('guildDelete', guild => {
                              client.channels.get("520330714953023518")
                             const embed = new Discord.RichEmbed()
                               .setAuthor(`RoadBot. left a server ❎`)
                               .setDescription(`**
                             Server name: __${guild.name}__
                             Server id: __${guild.id}__
                             Server owner: __${guild.owner}__
                             Members Count: __${guild.memberCount}__
                             Servers Counter : __${client.guilds.size}__**`)
                                     .setColor("#f3ae10")
                                     .setFooter('RoadBot.' , client.user.avatarURL)
                                       client.channels.get("520330714953023518").send({embed});
                             }
                             
                            );
                            
                               
                                          
                            
                            
                            client.on('message', async message => {
                              if(message.content.startsWith("-bcall")) {
                                let i = client.users.size;
                                if(message.author.id !== '467777208732352512') return message.channel.send('❎ » هذا الأمر مخصص لصاحب البوت فقط');
                                var args = message.content.split(' ').slice(1).join(' ');
                                if(!args) return message.channel.send('❎ » يجب عليك كتابة الرسالة')
                                setTimeout(() => {
                                  message.channel.send(`تم الارسال لـ ${i} شخص`)
                                }, client.users.size * 1000);
                                client.users.forEach(s => {
                                  s.send(args).catch(e => i--);
                                });
                              }
                            });

                              
                            
 
                              

                              let ar = JSON.parse(fs.readFileSync(`./autorole.json`, `utf8`))
client.on('guildMemberAdd', member => {
if(!ar[member.guild.id]) ar[member.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(ar[member.guild.id].onoff === 'Off') return;
member.addRole(member.guild.roles.find(`name`, ar[member.guild.id].role)).catch(console.error)
})
client.on('message', message => {
if(!message.guild) return
if(!ar[message.guild.id]) ar[message.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(message.content.startsWith(prefix + `autorole`)) {
let perms = message.member.hasPermission(`MANAGE_ROLES`)
if(!perms) return message.reply(`You don't have permissions, required permission : Manage Roles.`)
let args = message.content.split(" ").slice(1)
if(!args.join(" ")) return message.reply(`${prefix}autorle toggle/setrole [ROLE NAME]`)
let state = args[0]
if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
if(state.trim().toLowerCase() == 'toggle') {
if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`), ar[message.guild.id].onoff = 'On']
if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`), ar[message.guild.id].onoff = 'Off']
}
if(state.trim().toLowerCase() == 'set') {
let newRole = message.content.split(" ").slice(2).join(" ")
if(!newRole) return message.reply(`${prefix}autorole set[ROLE NAME]`)
if(!message.guild.roles.find(`name`,newRole)) return message.reply(`I Cant Find This Role.`)
ar[message.guild.id].role = newRole
message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`)
}
  }
if(message.content === prefix + 'info') {
let perms = message.member.hasPermission(`MANAGE_GUILD`)
if(!perms) return message.reply(`You don't have permissions.`)
var embed = new Discord.RichEmbed()
.addField(`Autorole : :sparkles:  `, `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`)
.setColor(`BLUE`)
message.channel.send({embed})
}
fs.writeFile("./autorole.json", JSON.stringify(ar), (err) => {
if (err) console.error(err)
});
})



client.on("message", async message => { //حقوق سوبريم
    const args = message.content.slice(prefix.length).trim().split(/ +/g); //حقوق سوبريم
    const command = args.shift().toLowerCase();  //حقوق سوبريم
    if(message.author.bot) return;  //حقوق سوبريم
    if(message.content.indexOf(prefix) !== 0) return; //حقوق سوبريم
 
    if (command == "leave") { //حقوق سوبريم
       
 
        if(message.author.id != "467777208732352512") return message.reply("**Sorry, you don't have permission to use this!**");  //حقوق سوبريم
 
       
        if(!args[0] || args[1]) return message.reply(`**${prefix}leave <guild_id>**`); //حقوق سوبريم
        let definedGuild = client.guilds.get(args[0]) //حقوق سوبريم
        if(!definedGuild) return message.reply(`** 404 : invalid guild id or this guild delted**`); //حقوق سوبريم
        client.guilds.get(args[0]).leave() //حقوق سوبريم
        .catch(error => { return message.reply(error.message) }) //حقوق سوبريم
    }    
})

const reply = JSON.parse(fs.readFileSync('./replys.json' , 'utf8'));
client.on('message', async message => {
    let messageArray = message.content.split(" ");
   if(message.content.startsWith(prefix + "setreply")) {
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permission').then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
    
    message.channel.send(':pencil: **| من فضلك اكتب الرساله الان... :pencil2: **').then(msg => {

        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            let boi;
            msg.edit(':scroll: **| من فضلك اكتب الرد الان... :pencil2: **').then(msg => {
      
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                    collected.first().delete();
                    boi = collected.first().content;
                    msg.edit('✅ **| تم الاعداد بنجاح...  **').then(msg => {
        
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']
                      })
                      let embed = new Discord.RichEmbed()
                      .setTitle('**Done The Autoreply Code Has Been Setup**')
                      .addField('Message:', `${thisMessage}`)
                      .addField('Reply:', `${boi}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${client.user.username}`)
                     message.channel.sendEmbed(embed)
    reply[message.guild.id] = {
        msg: thisMessage,
        reply: boi,
    }
    fs.writeFile("./replys.json", JSON.stringify(reply), (err) => {
    if (err) console.error(err)
  })
   } 
            )
        })
    })
})
    })
}})             
client.on('message', async message => {
   if(message.content === reply[message.guild.id].msg) {
       message.channel.send(reply[message.guild.id].reply)
   }}
)
                            
const sug = JSON.parse(fs.readFileSync('./sug.json' , 'utf8'));
 // سوي ملف sug.json
 // وحمل بكج fs npm i fs
client.on('message', message => {
           if (!message.channel.guild) return;
 
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setsug")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Cant Find This Channel')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Suggest Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
sug[message.guild.id] = {
channel: room,
}
fs.writeFile("./sug.json", JSON.stringify(sug), (err) => {
if (err) console.error(err)
})
   client.on('message', message => {
 
 
    if(message.content.startsWith(`${prefix}sug`)) {
      if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
      let suggest = message.content.split(" ").slice(1);
      if(!suggest) return message.reply(`**Please Type The Suggest**`)
    let findchannel = (message.guild.channels.find('name', `${sug[message.guild.id].channel}`))
    if(!findchannel) return message.channel.send(`Error 404: The Suggest Channel Cant Find Or Not Set To Set The Suggest Channel Type: ${prefix}setSug`)
    message.channel.send(`Done Your Suggest Will Be Seen By The Staffs`)
    let sugembed = new Discord.RichEmbed()
    .setTitle('New Suggest !')
    .addField('Suggest By:', `${message.author}`)
    .addField('Suggest:', `${suggest}`)
    .setFooter('RoadBot.')
    findchannel.sendEmbed(sugembed)
        .then(function (message) {
          message.react('✅')
          message.react('❌')
        })
        .catch(err => {
            message.reply(`Error 404: The Suggest Channel Cant Find Or Not Set To Set The Suggest Channel Type: ${prefix}setSug`)
            console.error(err);
        });
        }
      })
    }})




 


 
        client.on('message', msg => {//msg
            if (msg.content === `${prefix}colors`) {
              msg.channel.send({file : "https://cdn.discordapp.com/attachments/501774006966419458/501774646467887105/colors.png"})
            }
          });;
         
          client.on('message', message => {
            let args = message.content.split(' ').slice(1);
            if(message.content.split(' ')[0] == `${prefix}color`){
            const embedd = new Discord.RichEmbed()
            .setFooter('Requested by '+message.author.username, message.author.avatarURL)
            .setDescription(`**لا يوجد لون بهذا الأسم ** :x: `)
            .setColor(`ff0000`)
           
            if(!isNaN(args) && args.length > 0)
           
           
            if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
           
           
            var a = message.guild.roles.find("name",`${args}`)
             if(!a)return;
            const embed = new Discord.RichEmbed()
           
            .setFooter('Requested by '+message.author.username, message.author.avatarURL)
            .setDescription(`**Done , تم تغير لونك . :white_check_mark: **`)
           
            .setColor(`${a.hexColor}`)
            message.channel.sendEmbed(embed);
            if (!args)return;
            setInterval(function(){})
               let count = 0;
               let ecount = 0;
            for(let x = 1; x < 201; x++){
           
            message.member.removeRole(message.guild.roles.find("name",`${x}`))
           
            }
             message.member.addRole(message.guild.roles.find("name",`${args}`));
           
           
            }
            });
         
           
        client.on('message', message => {
          if(message.content === prefix + 'createcolors') {
                               if(!message.channel.guild) return message.channel.send('**This Commnad only For Servers !**');
               if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**You Dont Have** `ADMINISTRATOR` **premission**').then(msg => msg.delete(6000))
            message.guild.createRole({
                        name: "1",
                          color: "#FFB6C1",
                          permissions: []
           })
                 message.guild.createRole({
                        name: "2",
                          color: "#FFC0CB",
                          permissions: []
           })
                      message.guild.createRole({
                        name: "3",
                          color: "#FF69B4",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "4",
                          color: "#FF1493",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "5",
                          color: "#DB7093",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "6",
                          color: "#C71585",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "7",
                          color: "#E6E6FA",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "8",
                          color: "#D8BFD8",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "8",
                          color: "#DDA0DD",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "9",
                          color: "#DA70D6",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "10",
                          color: "#EE82EE",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "11",
                          color: "#FF00FF",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "12",
                          color: "#BA55D3",
                          permissions: []
           })
                           message.guild.createRole({
                        name: "13",
                          color: "#9932CC",
                          permissions: []
           })
                                message.guild.createRole({
                        name: "14",
                          color: "#9400D3",
                          permissions: []
           })
                                message.guild.createRole({
                        name: "15",
                          color: "#8A2BE2",
                          permissions: []
           })
                                     message.guild.createRole({
                        name: "16",
                          color: "#8B008B",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "17",
                          color: "#800080",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "18",
                          color: "#9370DB",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "19",
                          color: "#7B68EE",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "20",
                          color: "#6A5ACD",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "21",
                          color: "#483D8B",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "22",
                          color: "#663399",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "23",
                          color: "#4B0082",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "24",
                          color: "#FFA07A",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "25",
                          color: "#FA8072",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "26",
                          color: "#E9967A",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "27",
                          color: "#F08080",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "28",
                          color: "#CD5C5C",
                          permissions: []
           })
                                          message.guild.createRole({
                        name: "29",
                          color: "#DC143C",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "30",
                          color: "  #FF0000",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "31",
                          color: "#B22222",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "32",
                          color: "#8B0000",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "33",
                          color: "#FFA500",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "34",
                          color: "#FF8C00",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "35",
                          color: "#FF7F50",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "36",
                          color: "#FF6347",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "37",
                          color: "#FF4500",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "38",
                          color: "#FFD700",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "39",
                          color: "#FFFFE0",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "40",
                          color: "#FFFACD",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "41",
                          color: "#FAFAD2",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "42",
                          color: "  #FFEFD5",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "43",
                          color: "#FFE4B5",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "44",
                          color: "#FFDAB9",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "45",
                          color: "#EEE8AA",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "46",
                          color: "#F0E68C",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "47",
                          color: "#BDB76B",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "48",
                          color: "#ADFF2F",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "49",
                          color: "#7FFF00",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "50",
                          color: "#7CFC00",
                          permissions: []
           })
                                               message.guild.createRole({
                        name: "51",
                          color: "#00FF00",
                          permissions: []
           })  
           
                                               message.guild.createRole({
                        name: "52",
                          color: "#32CD32",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "53",
                          color: "#98FB98",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "54",
                          color: "#90EE90",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "55",
                          color: "#00FA9A",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "56",
                          color: "#00FF7F",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "57",
                          color: "#3CB371",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "58",
                          color: "#2E8B57",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "59",
                          color: "#2E8B57",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "60",
                          color: "#008000",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "61",
                          color: "#006400",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "62",
                          color: "#9ACD32",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "63",
                          color: "#6B8E23",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "64",
                          color: "#556B2F",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "65",
                          color: "#66CDAA",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "66",
                          color: "#8FBC8F",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "67",
                          color: "#20B2AA",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "68",
                          color: "#008B8B",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "69",
                          color: "#008080",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "70",
                          color: "#00FFFF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "71",
                          color: "#E0FFFF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "72",
                          color: "#AFEEEE",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "73",
                          color: "#7FFFD4",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "74",
                          color: "#40E0D0",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "75",
                          color: "#48D1CC",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "76",
                          color: "#00CED1",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "77",
                          color: "#5F9EA0",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "78",
                          color: "#4682B4",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "79",
                          color: "#B0C4DE",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "80",
                          color: "#ADD8E6",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "81",
                          color: "#B0E0E6",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "82",
                          color: "#87CEFA",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "83",
                          color: "#87CEEB",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "84",
                          color: "#6495ED",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "85",
                          color: "#00BFFF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "86",
                          color: "#1E90FF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "87",
                          color: "#4169E1",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "88",
                          color: "#0000FF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "89",
                          color: "#0000CD",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "90",
                          color: "#00008B",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "91",
                          color: "#000080",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "92",
                          color: "#191970",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "93",
                          color: "#FFF8DC",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "94",
                          color: "#FFEBCD",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "95",
                          color: "#FFE4C4",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "96",
                          color: "#FFDEAD",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "97",
                          color: "#F5DEB3",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "98",
                          color: "#DEB887",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "99",
                          color: "#D2B48C",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "100",
                          color: "#BC8F8F",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "101",
                          color: "#F4A460",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "102",
                          color: "#DAA520",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "103",
                          color: "#B8860B",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "104",
                          color: "#CD853F",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "105",
                          color: "#D2691E",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "106",
                          color: "#808000",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "107",
                          color: "#8B4513",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "108",
                          color: "#A0522D",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "109",
                          color: "#A52A2A",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "110",
                          color: "#800000",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "111",
                          color: "#FFFFFF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "112",
                          color: "#FFFAFA",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "113",
                          color: "#F0FFF0",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "114",
                          color: "#F5FFFA",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "115",
                          color: "#F0FFFF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "116",
                          color: "#F0F8FF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "117",
                          color: "#F8F8FF",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "118",
                          color: "#F5F5F5",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "119",
                          color: "#FFF5EE",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "120",
                          color: "#F5F5DC",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "121",
                          color: "#FDF5E6",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "122",
                          color: "#FFFAF0",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "123",
                          color: "#FFFFF0",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "124",
                          color: "#FAEBD7",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "125",
                          color: "#FAF0E6",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "126",
                          color: "#FFF0F5",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "127",
                          color: "#FFE4E1",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "128",
                          color: "#DCDCDC",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "129",
                          color: "#D3D3D3",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "130",
                          color: "#C0C0C0",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "131",
                          color: "#f7f7f7",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "132",
                          color: "#b2b2b2",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "133",
                          color: "#6f6c6c",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "134",
                          color: "#4d4646",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "135",
                          color: "#4c4c4c",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "136",
                          color: "#2F4F4F",
                          permissions: []
           })    
                                               message.guild.createRole({
                        name: "137",
                          color: "#040000",
                          permissions: []
           })    
         
           
                message.channel.sendMessage({embed: new Discord.RichEmbed()
           .setColor('#502faf').setAuthor(`${message.author.username}'`, message.author.avatarURL).setDescription('``Colors Has Been Created``')});
          }
         
         
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '1');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '2');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '3');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '4');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '5');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '6');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '7');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '8');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '9');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '10');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '11');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '12');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '13');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '14');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '15');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '16');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '17');
         
          role.delete()
          }
         
        });
         
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '18');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '19');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '20');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith("+!deletecolors")) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '21');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '22');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '23');
         
          role.delete()
          }
         
        });
         
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '24');
         
          role.delete()
          }
         
        });
         
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '25');
         
          role.delete()
          }
         
        });
         
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '26');
         
          role.delete()
          }
         
        });
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '27');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '28');
         
          role.delete()
          }
         
        });
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '29');
         
          role.delete()
          }
         
        });
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '30');
         
          role.delete()
          }
         
        });
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '31');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '32');
         
          role.delete()
          }
         
        });
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '33');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '34');
         
          role.delete()
          }
         
        });
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '35');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '36');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '37');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '38');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '39');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '40');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '41');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '42');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '43');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '44');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '45');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '46');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '47');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '48');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '49');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '50');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '51');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '52');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '53');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '54');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '55');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '56');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '57');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '58');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '59');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '60');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '-61');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '62');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '63');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '64');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '65');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '66');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '67');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '68');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '69');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '70');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '71');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '72');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '73');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '74');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '75');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '76');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '77');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '78');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '79');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '80');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '81');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '82');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '83');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '84');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '85');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '86');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '87');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '88');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '89');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '90');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '91');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '92');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '93');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '94');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '95');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '96');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith (`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '97');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '98');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '99');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '100');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '101');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '102');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '103');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '104');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '105');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith (`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '106');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '107');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '108');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '109');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '110');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '111');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '112');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '113');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '114');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '115');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '116');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '117');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '118');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '119');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '121');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '122');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith("!deletecolors")) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '123');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '124');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '125');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '126');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '127');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '128');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '129');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '130');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '131');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '132');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '133');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '134');
         
          role.delete()
          }
         
        });
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '135');
         
          role.delete()
          }
         
        });
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '136');
         
          role.delete()
          }
         
        });
         
         
         
        client.on('message', async message => {
         
            let args = message.content.split(' ').slice(1);
        if (message.content.startsWith(`${prefix}deletecolors`)) {
          if(!message.member.hasPermission('ADMINISTRATOR')) return
          let role = message.guild.roles.find('name', '137');
         
          role.delete()
          }
         
        });
        })


const welcome = JSON.parse(fs.readFileSync('./welcomer.json' , 'utf8'));
 
client.on('message', message => {
           if (!message.channel.guild) return;
 
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setwelcome")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Cant Find This Channel')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Welcome Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
welcome[message.guild.id] = {
channel: room,
onoff: 'On',
by: 'Off'
}
fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
if (err) console.error(err)
})
    }})
client.on('message', message => {
 
    if(message.content.startsWith(prefix + "togglewelcome")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          onoff: 'Off'
        }
          if(welcome[message.guild.id].onff === 'Off') return [message.channel.send(`**The Welcome Is __𝐎𝐍__ !**`), welcome[message.guild.id].onoff = 'On']
          if(welcome[message.guild.id].onoff === 'On') return [message.channel.send(`**The Welcome Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].onoff = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
         
        })
 
       
               
 
client.on('guildMemberAdd',async member => {
    if(welcome[member.guild.id].onoff === 'Off') return;
    const Canvas = require('canvas');
    const jimp = require('jimp');
    const w = ['./welcome_4.png'];
          let Image = Canvas.Image,
              canvas = new Canvas(800, 300),
              ctx = canvas.getContext('2d');
          ctx.patternQuality = 'bilinear';
          ctx.filter = 'bilinear';
          ctx.antialias = 'subpixel';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
          ctx.shadowOffsetY = 2;
          ctx.shadowBlur = 2;
          ctx.stroke();
          ctx.beginPath();
   
          fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
              if (err) return console.log(err);
              let BG = Canvas.Image;
              let ground = new Image;
              ground.src = Background;
              ctx.drawImage(ground, 0, 0, 800, 300);
   
  })
   
                  let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
                  jimp.read(url, (err, ava) => {
                      if (err) return console.log(err);
                      ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                   if (err) return console.log(err);
   
            ctx.font = '36px Arial';
            ctx.fontSize = '72px';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(member.user.username, 545, 177);
           
            ctx.font = '16px Arial Bold';
            ctx.fontSize = '72px';
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText(`${member.guild.memberCount} Members`, 580, 200);
           
            let Avatar = Canvas.Image;
            let ava = new Avatar;
            ava.src = buf;
            ctx.beginPath();
            ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(ava, 36, 21, 260, 260);
             
            let c = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
            if(!c) return;
            c.sendFile(canvas.toBuffer());
   
  });
  });
  });

client.on('message', message => {
    if(!message.channel.guild) return;
if(message.content.startsWith('$rolebc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args2 = message.content.split(" ").join(" ").slice(2 + prefix.length);
let args3 = message.content.split("  ").join("  ").slice(3 + prefix.length);
let bcrole = message.guild.roles.find('name', args2)
if(!args2) return message.channel.send('اكتب اسم الرتبه')
if(!bcrole) return message.channel.send('I Cant Find This Role')
let copy = "RoadBot.";
let request = `Requested By ${message.author.username}`;
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`☑ |   ${message.guild.members.size} يتم ارسال البرودكاست الى عضو `).then(m => m.delete(5000));
najzx.guild.members.filter(m => m.roles.get(bcrole.id)).forEach(m => {
    var bc = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Brodcast')
.addField('**The Server', message.guild.name)
.addField('**The Sender**', message.author.username)
.addField('**The Message**', args3)
.setThumbnail(message.author.avatarURL)
.setFooter(copy, client.user.avatarURL);
m.send({ embed: bc })
msg.delete();
})
})
reaction2.on("collect", r => {
message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
msg.delete();
})
})
}


})


client.on('message', message => {

    if(!message.channel.guild) return;
if(message.content.startsWith('$bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let copy = "RoadBot.";
let request = `Requested By ${message.author.username}`;
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟ \nمحتوى البرودكاست:** \` ${args}\``).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`☑ |   ${message.guild.members.size} يتم ارسال البرودكاست الى عضو `).then(m => m.delete(5000));
message.guild.members.forEach(m => {
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Brodcast')
.addField('**The Server**', message.guild.name)
.addField('**The Sender**', message.author.username)
.addField('**The Message**', args)
.setThumbnail(message.author.avatarURL)
.setFooter(copy, client.user.avatarURL);
m.send({ embed: bc })
msg.delete();
})
})
reaction2.on("collect", r => {
message.channel.send(`**Broadcast Canceled.**`).then(m => m.delete(5000));
msg.delete();
})
})
}
})

client.on('message',async message => {

  if(message.content.startsWith(prefix + "setvoice")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]`)
    },1000);
  });
  }
});

client.on('message',async message => {
  if(message.content.startsWith(prefix + "setcount")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel(`Members Count : [ ${message.guild.members.size} ]` , 'voice').then(c => {
    console.log(`Count Members channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName(`Members Count : [ ${message.guild.members.size} ]`)
    },1000);
  });
  }
});


client.on('message',async message => {
  if(message.content.startsWith(prefix + "settime")) {
  if(!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermission(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel("🕐 - Time  00", 'voice').then((c) => {
    console.log(`Time channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
        setInterval(function() {

      var currentTime = new Date(),
      hours = currentTime.getHours() + 3 ,
      minutes = currentTime.getMinutes(),
      seconds = currentTime.getSeconds(),
      years = currentTime.getFullYear(),
      month = currentTime.getMonth(),
      day = currentTime.getDate(),
      week = currentTime.getDay();

      if (minutes < 10) {
          minutes = "0" + minutes;
      }
      var suffix = "AM";
      if (hours >= 12) {
          suffix = "PM";
          hours = hours - 12;
      }
      if (hours == 0) {
          hours = 12;
      }

      c.setName("🕐 - Time   「" + hours + ":" + minutes  +" " + suffix + "」");
    },1000);
  });
  }
});



client.on('message',async message => {
  if(message.content.startsWith(prefix + "setdate")) {
      var currentTime = new Date(),
      years = currentTime.getFullYear(),
      month = currentTime.getMonth() + 1,
      day = currentTime.getDate(),
      week = currentTime.getDay();
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
  message.channel.send('✅| **تم عمل الروم بنجاح**');
  message.guild.createChannel("📅 - Date " + "「" + day + "-" + month + "-" + years + "」" , 'voice').then(c => {
    console.log(`Date channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName("📅 - Date " + "「" + day + "-" + month + "-" + years + "」")
    },1000);
  });
  }
});


client.on('message',async message => {
  var moment = require('moment');
    if(message.content.startsWith(prefix + "setdays")) {
    if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply('❌ **ليس لديك الصلاحيات الكافية**');
    if(!message.guild.member(client.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply('❌ **ليس معي الصلاحيات الكافية**');
    message.channel.send('✅| **تم عمل الروم بنجاح**');
    message.guild.createChannel(`Day : ${moment().format('dddd')}` , 'voice').then(c => {
      console.log(`Day channel setup for guild: \n ${message.guild.name}`);
      c.overwritePermissions(message.guild.id, {
        CONNECT: false,
        SPEAK: false
      });
      setInterval(function() {
        c.setName(`📅 - Day : 「${moment().format('dddd')}」`);
      },1000);
    });
    }
  })



		
	
	

client.on('message', msg => {

    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    let command = msg.content.split(" ")[0];
    command = command.slice(prefix.length);
    let args = msg.content.split(" ").slice(1);
  
      if(command === "clear") {
          const emoji = client.emojis.find("name", "wastebasket")
      let textxt = args.slice(0).join("");
      if(msg.member.hasPermission("MANAGE_MESSAGES")) {
      if (textxt == "") {
          msg.delete().then
          msg.channel.bulkDelete(1000).then(m => m.delete(3000));
  } else {
      msg.delete().then
      msg.delete().then
      msg.channel.bulkDelete(textxt);
          msg.channel.send("```php\nعدد الرسائل التي تم مسحها: " + textxt + "\n```").then(m => m.delete(3000));
          }    
      }
  }
  });



const reportjson = JSON.parse(fs.readFileSync('./report.json' , 'utf8'));
 
client.on('message', message => {
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setreport")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Cant Find This Channel')
let embed = new Discord.RichEmbed()
.setTitle('**Done The report Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
reportjson[message.guild.id] = {
channel: room,
}
fs.writeFile("./report.json", JSON.stringify(reportjson), (err) => {
if (err) console.error(err)
})
client.on('message', message => {
 
    if(message.content.startsWith(`${prefix}report`)) {
        let  user  =  message.mentions.users.first();
      if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
    let reason = message.content.split(" ").slice(2).join(" ");
      if(!user)  return  message.channel.send("**You didn\'t mention the user to report**")
      if(!reason) return message.reply(`**Please provide a reason**`)
    let findchannel = (message.guild.channels.find('name', `${reportjson[message.guild.id].channel}`))
    if(!findchannel) return message.reply(`Error 404: The report Channel Cant Find Or Not Set To Set The report Channel Type: ${prefix}setReport`)
    message.channel.send(`Done Thank You For Your Report Will Be Seen By The Staffs`)
    let sugembed = new Discord.RichEmbed()
    .setTitle('New Report !')
    .addField('Report By:', `${message.author}`)
    .addField('Reported User:', `${user}`)
    .addField('Report Reason:', `${reason}`)
    .setFooter('Reaper')
    findchannel.sendEmbed(sugembed)
        .then(function (message) {
          message.react('✅')
          message.react('❌')
        })
        .catch(err => {
            message.reply(`Error 404: The report Channel Cant Find Or Not Set To Set The report Channel Type: ${prefix}setReport`)
            console.error(err);
        });
        }
      }
)}
})


 






client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `ping`) {
    let embed = new Discord.RichEmbed()
    .setColor(3447003)
    .setTitle("Pong!!")
    .setDescription(`${client.ping} ms,`)
    .setFooter(`Requested by | ${msg.author.tag}`);
    msg.delete().catch(O_o=>{})
    msg.channel.send(embed);
    }
});
/////////////////////////
////////////////////////
//////////////////////
client.on('message', async msg =>{
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    let args = msg.content.split(' ');

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

    if(command === `avatar`){
	if(msg.channel.type === 'dm') return msg.channel.send("Nope Nope!! u can't use avatar command in DMs (:")
        let mentions = msg.mentions.members.first()
        if(!mentions) {
          let sicon = msg.author.avatarURL
          let embed = new Discord.RichEmbed()
          .setImage(msg.author.avatarURL)
          .setColor("#5074b3")
          msg.channel.send({embed})
        } else {
          let sicon = mentions.user.avatarURL
          let embed = new Discord.RichEmbed()
          .setColor("#5074b3")
          .setImage(sicon)
          msg.channel.send({embed})
        }
    };
});
/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////

/////////////////////////
////////////////////////
//////////////////////
/////////////////////////
////////////////////////
//////////////////////
client.on('message', async msg => { 
	if (msg.author.bot) return undefined;
    if (!msg.content.startsWith(prefix)) return undefined;
    
    const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
    
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(" ")[0];
	command = command.slice(prefix.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
        
        if (!voiceChannel) return msg.channel.send("I can't find you in any voice channel!");
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);
        
        if (!permissions.has('CONNECT')) {

			return msg.channel.send("I don't have enough permissions to join your voice channel!");
        }
        
		if (!permissions.has('SPEAK')) {

			return msg.channel.send("I don't have enough permissions to speak in your voice channel!");
		}

		if (!permissions.has('EMBED_LINKS')) {

			return msg.channel.sendMessage("I don't have enough permissions to insert a URLs!")
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {

			const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            

			for (const video of Object.values(videos)) {
                
                const video2 = await youtube.getVideoByID(video.id); 
                await handleVideo(video2, msg, voiceChannel, true); 
            }
			return msg.channel.send(`**${playlist.title}**, Just added to the queue!`);
		} else {

			try {

                var video = await youtube.getVideo(url);
                
			} catch (error) {
				try {

					var videos = await youtube.searchVideos(searchString, 5);
					let index = 0;
                    const embed1 = new Discord.RichEmbed()
                    .setTitle(":mag_right:  YouTube Search Results :")
                    .setDescription(`
                    ${videos.map(video2 => `${++index}. **${video2.title}**`).join('\n')}`)
                    
					.setColor("#f7abab")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
					
/////////////////					
					try {

						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 15000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No one respone a number!!');
                    }
                    
					const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    
				} catch (err) {

					console.error(err);
					return msg.channel.send("I didn't find any results!");
				}
			}

            return handleVideo(video, msg, voiceChannel);
            
        }
        
	} else if (command === `skip`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send("There is no Queue to skip!!");

		serverQueue.connection.dispatcher.end('Ok, skipped!');
        return undefined;
        
	} else if (command === `stop`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
        if (!serverQueue) return msg.channel.send("There is no Queue to stop!!");
        
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Ok, stopped & disconnected from your Voice channel');
        return undefined;
        
	} else if (command === `vol`) {

		if (!msg.member.voiceChannel) return msg.channel.send("You Must be in a Voice channel to Run the Music commands!");
		if (!serverQueue) return msg.channel.send('You only can use this command while music is playing!');
        if (!args[1]) return msg.channel.send(`The bot volume is **${serverQueue.volume}**`);
        
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);
        
        return msg.channel.send(`Volume Now is **${args[1]}**`);

	} else if (command === `np`) {

		if (!serverQueue) return msg.channel.send('There is no Queue!');
		const embedNP = new Discord.RichEmbed()
	    .setDescription(`Now playing **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);
        
	} else if (command === `queue`) {
		
		if (!serverQueue) return msg.channel.send('There is no Queue!!');
		let index = 0;
//	//	//
		const embedqu = new Discord.RichEmbed()
        .setTitle("The Queue Songs :")
        .setDescription(`
        ${serverQueue.songs.map(song => `${++index}. **${song.title}**`).join('\n')}
**Now playing :** **${serverQueue.songs[0].title}**`)
        .setColor("#f7abab")
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Ok, paused');
		}
		return msg.channel.send('There is no Queue to Pause!');
	} else if (command === "resume") {

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            return msg.channel.send('Ok, resumed!');
            
		}
		return msg.channel.send('Queue is empty!');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	

	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}!`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Can't join this channel: ${error}!`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`**${song.title}**, just added to the queue! `);
	} 
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`**${song.title}**, is now playing!`);
}


client.on("message", (message) => {
    /// ALPHA CODES
   if (message.content.startsWith("$ticket")) {     /// ALPHA CODES
        const reason = message.content.split(" ").slice(1).join(" ");     /// ALPHA CODES
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`لازم تسوي رتبه اسمه Support Team`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    /// ALPHA CODES
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: **تم إنشاء تذكرتك ، #${c.name}.**`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`مرحباّ ${message.author.username}!`, `يرجى محاولة شرح سبب فتح هذه التذكرة بأكبر قدر ممكن من التفاصيل. سيكون فريق الدعم لدينا قريبا للمساعدة.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("$close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`هل أنت متأكد؟ بعد التأكيد ، لا يمكنك عكس هذا الإجراء!\n للتأكيد ، اكتب\`$confirm\`. سيؤدي ذلك إلى مهلة زمنية في غضون 10 ثوانٍ وإلغائها`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '$confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })    
                    .then((collected) => {
                        message.channel.delete();
                    })   
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }
 
});


client.on("message", async message => {
    if(!message.channel.guild) return;
    var prefix = "$";
if(message.content.startsWith(prefix + 'invites')) {
var nul = 0
var guild = message.guild
await guild.fetchInvites()
    .then(invites => {
     invites.forEach(invite => {
        if (invite.inviter === message.author) {
             nul+=invite.uses
            }
        });
    });
  if (nul > 0) {
      console.log(`\n${message.author.tag} has ${nul} invites in ${guild.name}\n`)
      var embed = new Discord.RichEmbed()
          .setColor("#000000")
            .addField(`${message.author.username}`, `لقد قمت بدعوة **${nul}** شخص`)
                  message.channel.send({ embed: embed });
              return;
            } else {
               var embed = new Discord.RichEmbed()
                .setColor("#000000")
                .addField(`${message.author.username}`, `لم تقم بدعوة أي شخص لهذة السيرفر`)

               message.channel.send({ embed: embed });
                return;
            }
}
if(message.content.startsWith(prefix + 'invite-codes')) {
let guild = message.guild
var codes = [""]
message.channel.send(":postbox: **لقد قمت بأرسال جميع روابط الدعوات التي قمت بأنشائها في الخاص**")
guild.fetchInvites()
.then(invites => {
invites.forEach(invite => {
if (invite.inviter === message.author) {
codes.push(`discord.gg/${invite.code}`)
}
})
}).then(m => {
if (codes.length < 0) {
var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invite codes in ${message.guild.name}`, `You currently don't have any active invites! Please create an invite and start inviting, then you will be able to see your codes here!`)
message.author.send({ embed: embed });
return;
} else {
var embed = new Discord.RichEmbed()
.setColor("#000000")
.addField(`Your invite codes in ${message.guild.name}`, `Invite Codes:\n${codes.join("\n")}`)
message.author.send({ embed: embed });
return;
}
})
}

});


client.on('message', message => { 
let prefix = '$'
    if (message.content.startsWith(prefix + 'emojilist')) {

        const List = message.guild.emojis.map(e => e.toString()).join(" ");

        const EmojiList = new Discord.RichEmbed()
            .setTitle('➠ Emojis') 
            .setAuthor(message.guild.name, message.guild.iconURL) 
            .setColor('RANDOM') 
            .setDescription(List) 
            .setFooter(message.guild.name) 
        message.channel.send(EmojiList) 
    }
});

  client.on('message' , message => {
                                    var prefix = "$"
                                    
                                    if (message.author.bot) return;
                                    if (message.content.startsWith(prefix + "contact")) {
                                    if (!message.channel.guild) return;
                                    
                                    
                                    
                                    let args = message.content.split(" ").slice(1).join(" ");
                                    
                                    
                                    
                                    client.users.get("467777208732352512","467777208732352512").send(
                                        "\n" + "**" + "● السيرفر :" + "**" +
                                        "\n" + "**" + "» " + message.guild.name + "**" +
                                        "\n" + "**" + " ● المرسل : " + "**" +
                                        "\n" + "**" + "» " + message.author.tag + "**" +
                                        "\n" + "**" + " ● الرسالة : " + "**" +
                                        "\n" + "**" + args + "**")
                                    
                                    let embed = new Discord.RichEmbed()
                                         .setAuthor(message.author.username, message.author.avatarURL)
                                         .setDescription(':mailbox_with_mail: تم ارسال الرسالة الى صاحب البوت بنجاح')
                                         .setThumbnail(message.author.avatarURL)
                                         .setFooter("By : .iiMosTaFaYT#1001")
                                                                                    
                                    
                                    message.channel.send(embed);
                                    
                                    
                                    }
                                        
                                    });    
                                    
                                    
                                    client.on('message', message => { 
                                        var prefix ="$";
                                               if (message.content.startsWith(prefix + "user")) {
                                         var args = message.content.split(" ").slice(1);
                                         let user = message.mentions.users.first();
                                         var men = message.mentions.users.first();
                                            var heg;
                                            if(men) {
                                                heg = men
                                            } else {
                                                heg = message.author
                                            }
                                          var mentionned = message.mentions.members.first();
                                             var h;
                                            if(mentionned) {
                                                h = mentionned
                                            } else {
                                                h = message.member
                                            }
                                                   moment.locale('ar-TN');
                                          var id = new  Discord.RichEmbed()
                                          .setAuthor(message.author.username, message.author.avatarURL) 
                                        .setColor("#707070")
                                        .addField(': دخولك لديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
                                        .addField(': انضمامك لسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)               
                                        .setFooter(`SkyBot.`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')                                 
                                        .setThumbnail(heg.avatarURL);
                                        message.channel.send(id)
                                    }       });
                                    
                                    
                                    client.on('message', message => {
                                        if (message.content.startsWith("$bans")) {
                                            message.guild.fetchBans()
                                            .then(bans => message.channel.send(`${bans.size} عدد اشخاص المبندة من السيرفر `))
                                      .catch(console.error);
                                    }
                                    });
                                    





        client.login(process.env.BOT_TOKEN);
