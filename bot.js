const Discord = require('discord.js'); 

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

const request = require('request');

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
『$bans / عدد الاشخاص المتبندين』
『$user / معلومات عنك』
『$emojilist / يعرض لم الايموجي الي في السيرفر』
『$ticket / فتح تكت』
『$fm / عرض لك عدد كل حالات الاشخاص وعدد البوتات وعدد الاشخاص』
『$id /  معلومات عنك』
『$allbots /  لعرض جميع البوتات الي بالسيرفر』
『$savatar / صورة السيرفر』
『$avatar / صورتك او صورة الي تمنشنة』
『$inv / لدعوة البوت الى سيرفرك』
『$support / سيرفر الدعم』
『$invites / عدد الانفايت حقك』
『$help-music ~ برسلك اوامر الميوزك』
『$contact / ارسال اقتراح او لمراسلة صاحب البوت』**

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

 __**Administrative Commands**__
**『$move @user / لسحب الشخص الى روومك』
『$bc / رسالة جماعية الى كل اعضاء السيرفر』
『$createcolors / يصنع الوان』
『$deletecolors / يمسح الوان』
『$clear / مسح الشات』
『$close / قفل تكت』
『$mute @user <reason> / اعطاء العضو ميوت لازم رتبة <Muted>』
『$unmute @user / لفك الميوت عن الشخص 』
『$kick @user <reason> / طرد الشخص من السيرفر』
『$ban @user <reason> / حضر الشخص من السيرفر』
『$mutechannel / تقفيل الشات』
『$unmutechannel / فتح الشات』
『$settime / يسوي روم يكتب فيها الوقت』
『$setdays / يسوي روم فيها الايام』
『$setcount / يسوي روم فيها عدد الاشخاص الي في السيرفر』
『$ct <name> / انشاء شات』
『$cv <name> / انشاء رووم فويس』
『$autorole set <Role Name> ~ يعطي رتب تلقائية』
『$autorole toggle ~ تشغيل اعطاء الرتب التلقائية』
『$info ~ معلومات الرتب التلقائية』
『$setvoice ~ يسوي روم يكتب فيها عدد الأشخاص الموجودين في الروات الصوتية』
『$setwelcome ~ امر يخليك تختار روم الولكم』
『$togglewelcome ~ تشغيل او اطفاء الولكم』**

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
  
  
  /*
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
*/

var servers = [];

var queue = [];

var guilds = [];

var queueNames = [];

var isPlaying = false;

var dispatcher = null;

var voiceChannel = null;

var skipReq = 0;

var skippers = [];

var now_playing = [];

/*
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
\\\\\\\\\\\\\\\\\\\\\\\\V/////////////////////////
*/

client.on('ready', () => {});

var download = function(uri, filename, callback) {

    request.head(uri, function(err, res, body) {

        console.log('content-type:', res.headers['content-type']);

        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);

    });

};

client.on('message', function(message) {

    const member = message.member;

    const mess = message.content.toLowerCase();

    const args = message.content.split(' ').slice(1).join(' ');

    if (mess.startsWith(prefix + 'play')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        // if user is not insert the URL or song title

        if (args.length == 0) {

            let play_info = new Discord.RichEmbed()

                .setAuthor(client.user.username, client.user.avatarURL)

                .setFooter('طلب بواسطة: ' + message.author.tag)

                .setDescription('**قم بإدراج رابط او اسم الأغنيه**')

            message.channel.sendEmbed(play_info)

            return;

        }

        if (queue.length > 0 || isPlaying) {

            getID(args, function(id) {

                add_to_queue(id);

                fetchVideoInfo(id, function(err, videoInfo) {

                    if (err) throw new Error(err);

                    let play_info = new Discord.RichEmbed()

                        .setAuthor(client.user.username, client.user.avatarURL)

                        .addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
                          ${videoInfo.title}
                          **`)

                        .setColor("#a637f9")

                        .setFooter('|| ' + message.author.tag)

                        .setThumbnail(videoInfo.thumbnailUrl)

                    message.channel.sendEmbed(play_info);

                    queueNames.push(videoInfo.title);

                    now_playing.push(videoInfo.title);

                });

            });

        }

        else {

            isPlaying = true;

            getID(args, function(id) {

                queue.push('placeholder');

                playMusic(id, message);

                fetchVideoInfo(id, function(err, videoInfo) {

                    if (err) throw new Error(err);

                    let play_info = new Discord.RichEmbed()

                        .setAuthor(client.user.username, client.user.avatarURL)

                        .addField('__**تم التشغيل ✅**__', `**${videoInfo.title}
                              **`)

                        .setColor("RANDOM")

                        .addField(`بواسطه`, message.author.username)

                        .setThumbnail(videoInfo.thumbnailUrl)

                    // .setDescription('?')

                    message.channel.sendEmbed(play_info)

                    message.channel.send(`
                            **${videoInfo.title}** تم تشغيل `)

                    // client.user.setGame(videoInfo.title,'https://www.twitch.tv/Abdulmohsen');

                });

            });

        }

    }

    else if (mess.startsWith(prefix + 'skip')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        message.channel.send('`✔`').then(() => {

            skip_song(message);

            var server = server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

        });

    }

    else if (message.content.startsWith(prefix + 'vol')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        // console.log(args)

        if (args > 100) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')

        if (args < 1) return message.channel.send('1 - 100 || **__لا أكثر ولا أقل__**')

        dispatcher.setVolume(1 * args / 50);

        message.channel.sendMessage(`**__ ${dispatcher.volume*50}% مستوى الصوت __**`);

    }

    else if (mess.startsWith(prefix + 'pause')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        message.channel.send('`✔`').then(() => {

            dispatcher.pause();

        });

    }

    else if (mess.startsWith(prefix + 'leave')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

            message.channel.send('`✔`').then(() => {

            dispatcher.resume();

        });

    }

    else if (mess.startsWith(prefix + 'stop')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        message.channel.send('`✔`');

        var server = server = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

    }

    else if (mess.startsWith(prefix + 'join')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        message.member.voiceChannel.join().then(message.channel.send(':ok:'));

    }

    else if (mess.startsWith(prefix + 'play')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        if (isPlaying == false) return message.channel.send(':anger: || **__تم التوقيف__**');

        let playing_now_info = new Discord.RichEmbed()

            .setAuthor(client.user.username, client.user.avatarURL)

            .addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
                  ${videoInfo.title}
                  **`)

            .setColor("RANDOM")

            .setFooter('طلب بواسطة: ' + message.author.tag)

            .setThumbnail(videoInfo.thumbnailUrl)

        //.setDescription('?')

        message.channel.sendEmbed(playing_now_info);

    }

});

function skip_song(message) {

    if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

    dispatcher.end();

}

function playMusic(id, message) {

    voiceChannel = message.member.voiceChannel;

    voiceChannel.join().then(function(connectoin) {

        let stream = ytdl('https://www.youtube.com/watch?v=' + id, {

            filter: 'audioonly'

        });

        skipReq = 0;

        skippers = [];

        dispatcher = connectoin.playStream(stream);

        dispatcher.on('end', function() {

            skipReq = 0;

            skippers = [];

            queue.shift();

            queueNames.shift();

            if (queue.length === 0) {

                queue = [];

                queueNames = [];

                isPlaying = false;

            }

            else {

                setTimeout(function() {

                    playMusic(queue[0], message);

                }, 500);

            }

        });

    });

}

function getID(str, cb) {

    if (isYoutube(str)) {

        cb(getYoutubeID(str));

    }

    else {

        search_video(str, function(id) {

            cb(id);

        });

    }

}

function add_to_queue(strID) {

    if (isYoutube(strID)) {

        queue.push(getYoutubeID(strID));

    }

    else {

        queue.push(strID);

    }

}

function search_video(query, cb) {

    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {

        var json = JSON.parse(body);

        cb(json.items[0].id.videoId);

    });

}

function isYoutube(str) {

    return str.toLowerCase().indexOf('youtube.com') > -1;

}

 client.on('message', message => {

     if (message.content === prefix +"help-music") {

    const embed = new Discord.RichEmbed()

     .setColor("RANDOM")

     .addField(`**__أوامر البوت__**`,`
.    **${prefix}join**
     عشان يدخل البوت الروم
     **${prefix}play**
     امر تشغيل الأغنية , !شغل الرابط او اسم الأعنية
     **${prefix}skip**
     تغير الأغنية
     **${prefix}stop**
     ايقاف الأغنية
     **${prefix}pause**
     مواصلة الأغنية
     **${prefix}vol**
     مستوى الصوت 1-100
     **${prefix}leave**
     ping = ${Date.now() - message.createdTimestamp}ms
     By - LexMasTeR  `)

      message.channel.send({embed});

     }

    });
  
  
  
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


const log = JSON.parse(fs.readFileSync('./log.json' , 'utf8'));
//Perfect log Code
client.on('message', message => {
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setlog")) {
if (message.author.bot) return;
        if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Please Type The Log Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
log[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./log.json", JSON.stringify(log), (err) => {
if (err) console.error(err)
})
    }})
         
client.on('message', message => {
 
    if(message.content.startsWith(prefix + "logtoggle")) {
if (message.author.bot) return;
        if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
          if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __𝐎𝐍__ !**`), log[message.guild.id].onoff = 'On']
          if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`), log[message.guild.id].onoff = 'Off']
          fs.writeFile("./log.json", JSON.stringify(log), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
         
        })
 
 
client.on('messageDelete', message => {
 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
    var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
    .setTitle('**[MESSAGE DELETE]**')
    .setColor('RED')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
 
    logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
    var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('BLUE')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});
 
 
client.on('roleCreate', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleCreate);
    })
});
client.on('roleDelete', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**[ROLE DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete);
    })
});
client.on('roleUpdate', (oldRole, newRole) => {
 
    if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
            }
    if(log[oldRole.guild.id].onoff === 'Off') return;
    var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
    if(!logChannel) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**[ROLE NAME UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName);
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            if(oldRole.hexColor === '#000000') {
                var oldColor = '`Default`';
            }else {
                var oldColor = oldRole.hexColor;
            }
            if(newRole.hexColor === '#000000') {
                var newColor = '`Default`';
            }else {
                var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateColor = new Discord.RichEmbed()
            .setTitle('**[ROLE COLOR UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateColor);
        }
    })
});
 
 
client.on('channelCreate', channel => {
 
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelCreate = new Discord.RichEmbed()
        .setTitle('**[CHANNEL CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
});
client.on('channelDelete', channel => {
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**[CHANNEL DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete);
    })
});
client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
            if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
    var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newName);
        }
        if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
            let newTopic = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
});
 
 
client.on('guildBanAdd', (guild, user) => {
 
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
    var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setTitle('**[BANNED]**')
        .setThumbnail(userAvatar)
        .setColor('DARK_RED')
        .setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(banInfo);
    })
});
client.on('guildBanRemove', (guild, user) => {
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
    var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let unBanInfo = new Discord.RichEmbed()
        .setTitle('**[UNBANNED]**')
        .setThumbnail(userAvatar)
        .setColor('GREEN')
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(unBanInfo);
    })
});
client.on('guildUpdate', (oldGuild, newGuild) => {
 
    if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
                if(!log[oldGuild.guild.id]) log[oldGuild.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldGuild.guild.id].onoff === 'Off') return;
    var logChannel = oldGuild.channels.find(c => c.name === `${log[oldGuild.guild.id].channel}`);
    if(!logChannel) return;
 
    oldGuild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldGuild.name !== newGuild.name) {
            let guildName = new Discord.RichEmbed()
            .setTitle('**[CHANGE GUILD NAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(newGuild.name, oldGuild.iconURL)
 
            logChannel.send(guildName)
        }
        if(oldGuild.region !== newGuild.region) {
            if(log[newGuild.regon.guild.id].onoff === 'Off') return;
            let guildRegion = new Discord.RichEmbed()
            .setTitle('**[CHANGE GUILD REGION]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL)
 
            logChannel.send(guildRegion);
        }
        if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
            if(oldGuild.verificationLevel === 0) {
                var oldVerLvl = 'Very Easy';
            }else
            if(oldGuild.verificationLevel === 1) {
                var oldVerLvl = 'Easy';
            }else
            if(oldGuild.verificationLevel === 2) {
                var oldVerLvl = 'Medium';
            }else
            if(oldGuild.verificationLevel === 3) {
                var oldVerLvl = 'Hard';
            }else
            if(oldGuild.verificationLevel === 4) {
                var oldVerLvl = 'Very Hard';
            }
 
            if(newGuild.verificationLevel === 0) {
                var newVerLvl = 'Very Easy';
            }else
            if(newGuild.verificationLevel === 1) {
                var newVerLvl = 'Easy';
            }else
            if(newGuild.verificationLevel === 2) {
                var newVerLvl = 'Medium';
            }else
            if(newGuild.verificationLevel === 3) {
                var newVerLvl = 'Hard';
            }else
            if(newGuild.verificationLevel === 4) {
                var newVerLvl = 'Very Hard';
            }
            if(log[newGuild.region.guild.id].onoff === 'Off') return;
            let verLog = new Discord.RichEmbed()
            .setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL)
 
            logChannel.send(verLog);
        }
    })
});
client.on('guildMemberUpdate', (oldMember, newMember) => {
    if(!oldMember.guild) return;
                if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
    var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '`اسمه الاصلي`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '`اسمه الاصلي`';
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**[UPDATE MEMBER NICKNAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldMember.nickname}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
                            if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**[ADDED ROLE TO MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('GREEN')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
                            if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**[REMOVED ROLE FROM MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RED')
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
                    if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
        .setTitle('**[UPDATE GUILD OWNER]**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('GREEN')
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
});
 
 
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
    if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
                    if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
    var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
    if(!logChannel) return;
 
    voiceOld.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
            let serverMutev = new Discord.RichEmbed()
            .setTitle('**[VOICE MUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }
        if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverUnmutev = new Discord.RichEmbed()
            .setTitle('**[VOICE UNMUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }
        if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverDeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE DEAF]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }
        if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverUndeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE UNDEAF]**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv);
        }
    })
   
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
                        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[CHANGED VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
});

client.on('message', message => {
     var prefix = "$"
if (message.content.startsWith(prefix + "uptime")) {
    let uptime = client.uptime;
 
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let notCompleted = true;
 
    while (notCompleted) {
 
        if (uptime >= 8.64e+7) {
 
            days++;
            uptime -= 8.64e+7;
 
        } else if (uptime >= 3.6e+6) {
 
            hours++;
            uptime -= 3.6e+6;
 
        } else if (uptime >= 60000) {
 
            minutes++;
            uptime -= 60000;
 
        } else if (uptime >= 1000) {
            seconds++;
            uptime -= 1000;
 
        }
 
        if (uptime < 1000)  notCompleted = false;
 
    }
 
    message.channel.send("`" + `${days} days, ${hours} hrs, ${minutes} min , ${seconds} sec` + "`");
 
 
}
});


        client.login(process.env.BOT_TOKEN);
