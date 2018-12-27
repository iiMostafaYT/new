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

const prefix = '.'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	client.user.setGame(`.help | .inv`,'https://www.twitch.tv/v5bz');
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
    return channel.send(`:rose:  **ولكم نورت السيرفر** :rose: 
  :crown: **اسم العضو**  ${member} :crown:  
  **انت العضو رقم** ${member.guild.memberCount} `) 
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

                        .setColor("#36393e")

                        .setFooter('|| ' + message.author.tag)

                        .setImage(videoInfo.thumbnailUrl)

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

                        .setColor("#36393e")

                        .addField(`بواسطه`, message.author.username)

                        .setImage(videoInfo.thumbnailUrl)

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

        message.channel.send('✔ **تم تغطيه الاغنيه**').then(() => {

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

        message.channel.send('✔ **تم وقوف الاغنيه**').then(() => {

            dispatcher.pause();

        });

    }

    else if (mess.startsWith(prefix + 'leave')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

            message.channel.send('✔ **تم ترك الغرفه**').then(() => {

            dispatcher.resume();

        });

    }

    else if (mess.startsWith(prefix + 'stop')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        message.channel.send('✔ **تم ترك الغرفه**');

        var server = server = servers[message.guild.id];

        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();

    }

    else if (mess.startsWith(prefix + 'join')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        message.member.voiceChannel.join().then(message.channel.send(':ok: **تم دخول الغرفه**'));

    }

    else if (mess.startsWith(prefix + 'play')) {

        if (!message.member.voiceChannel) return message.channel.send(':no_entry: || **__يجب ان تكون في روم صوتي__**');

        if (isPlaying == false) return message.channel.send(':anger: || **__تم التوقيف__**');

        let playing_now_info = new Discord.RichEmbed()

            .setAuthor(client.user.username, client.user.avatarURL)

            .addField('تمت إضافةالاغنيه بقائمة الإنتظار', `**
                  ${videoInfo.title}
                  **`)

            .setColor("#36393e")

            .setFooter('طلب بواسطة: ' + message.author.tag)

            .setImage(videoInfo.thumbnailUrl)

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
  
  
  
  client.on('message', message => {
var prefix = "." // البريفكس
if(message.content.startsWith(prefix +"server")){ // الامر
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply(`**هذه الخاصية للادارة فقط** ❎ `)
if(!message.channel.guild) return message.reply(' ');
const millis = new Date().getTime() - message.guild.createdAt.getTime();
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
const days = millis / 1000 / 60 / 60 / 24;
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**🆔 Server ID:**", message.guild.id,true)
.addField("**📅 Created On**", message.guild.createdAt.toLocaleString(),true)
.addField("**👑 Owned by**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
.addField("**👥 Members**",`[${message.guild.memberCount}]`,true)
.addField('**💬 Channels **',`**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' text | Voice  '+ `**${message.guild.channels.filter(m => m.type === 'voice').size}** `,true)
.addField("**🌍 Others **" , message.guild.region,true)
.addField("**🔐 Roles **",`**[${message.guild.roles.size}]** Role `,true)
.setColor('#000000')
message.channel.sendEmbed(embed)

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
      if(msg.content === '.' + "id") {
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
    
    client.on('message', message => {
    
if(message.content.split(' ')[0] == '.profile') {
if(!message.channel.guild) return;

let args = message.content.split(' ').slice(1).join(' ');

       let defineduser = '';
       if (!args[1]) { 
           defineduser = message.author;
       } else { // Run this if they did define someone...
           let firstMentioned = message.mentions.users.first();
           defineduser = firstMentioned;
       }

       const w = ['./id5.png','./id6.png'];
       var Canvas = require('canvas')
var jimp = require('jimp')

        const millis = new Date().getTime() - defineduser.createdAt.getTime();
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy');
const stats2 = ['online', 'Low', 'Medium', 'Insane'];
const days = millis / 1000 / 60 / 60 / 24;
         dateFormat(now, 'dddd, mmmm dS, yyyy');
             let time = `${dateFormat(defineduser.createdAt)}`
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
       let Image = Canvas.Image,
           canvas = new Canvas(300, 300),
           ctx = canvas.getContext('2d');
       ctx.patternQuality = 'bilinear';
       ctx.filter = 'bilinear';
       ctx.antialias = 'subpixel';
 
       fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
           if (err) return console.log(err);
           let BG = Canvas.Image;
           let ground = new Image;
           ground.src = Background;
           ctx.drawImage(ground, 0, 0, 300, 300);

})
  var mentionned = message.mentions.users.first();

   var client;
     if(mentionned){
         var client = mentionned;
     } else {
         var client = message.author;
         
     }

var men = message.mentions.users.first();
           var heg;
           if(men) {
               heg = men
           } else {
               heg = message.author
           }
               let url = defineduser.displayAvatarURL.endsWith(".webp") ? defineduser.displayAvatarURL.slice(20, 20) + ".png" : defineduser.displayAvatarURL;
               jimp.read(url, (err, ava) => {
                   if (err) return console.log(err);
                   ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                       if (err) return console.log(err);

                       let Avatar = Canvas.Image;
                       let ava = new Avatar;
                       ava.src = buf;
                       ctx.drawImage(ava, 112 , 40, 75, 75);
                       
                       
                       
                       
                       var status;
   if (defineduser.presence.status === 'online') {
       status = 'ONLINE';
ctx.fillStyle = `#2ce032`;
ctx.beginPath();
ctx.arc(179, 107, 10, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();
 
   } else if (defineduser.presence.status === 'dnd') {
       status = 'DND';
       ctx.fillStyle = `#ff0000`;
ctx.beginPath();
ctx.arc(179, 107, 8, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();
   } else if (defineduser.presence.status === 'idle') {
       status = 'IDLE';
       ctx.fillStyle = `#f4d32e`;
ctx.beginPath();
ctx.arc(179, 107, 10, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();
   } else if (defineduser.presence.status === 'offline') {
       status = 'INVISIABLE';
       ctx.fillStyle = `#898988`;
ctx.beginPath();
ctx.arc(179, 107, 10, 0, Math.PI*2, true); 
ctx.closePath();
ctx.fill();
   }
                       
                       
                                             var time2;
     if(mentionned){
         var time2 = `${dateFormat(message.mentions.users.first.joinedAt)}`;
     } else {
         var time2 = `${dateFormat(message.member.joinedAt)}`;
         
     }  
                          
   
                       ctx.font = 'Bold 15px Arial ';
                       ctx.fontSize = '15px';
                       ctx.fillStyle = "#ffffff";
                       ctx.textAlign = "center";
                       ctx.fillText(status, 70 , 108 );
                       
                        ctx.font = 'Bold 13px Arial';
                       ctx.fontSize = '13px';
                       ctx.fillStyle = "#ffffff";
                       ctx.textAlign = "center";
                       ctx.fillText(`${message.author.presence.game === null ? "No Status" : message.author.presence.game.name}`, 150.00   , 180  );

                      
                       ctx.font = 'Bold 20px Arial ';
                       ctx.fontSize = '15px';
                       ctx.fillStyle = "#ffffff";
                       ctx.textAlign = "center";
                       ctx.fillText(`${defineduser.username}`, 150.50 , 140);


                       ctx.font = 'Bold 15px Arial';
                       ctx.fontSize = '15px';
                       ctx.fillStyle = "#ffffff";
                       ctx.textAlign = "center";
                       ctx.fillText(`#${defineduser.discriminator}`, 227  , 108);

                       var time2;
     if(mentionned){
         var time2 = `${dateFormat(message.mentions.users.first.joinedAt)}`;
     } else {
         var time2 = `${dateFormat(message.member.joinedAt)}`;
         
     }

                       ctx.font = 'Bold 13px Arial ';
                       ctx.fontSize = '13px';
                       ctx.fillStyle = "#ffffff";
                       ctx.textAlign = "center";
                       ctx.fillText(`${moment(defineduser.createdTimestamp).fromNow()}`, 179 , 226 );
                       
                       
    
          
                       ctx.font = 'Bold 13px Arial ';
                       ctx.fontSize = '13px';
                       ctx.fillStyle = "#ffffff";
                       ctx.textAlign = "center";
                       ctx.fillText(`${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')}`, 179 , 253);
                       
message.channel.sendFile(canvas.toBuffer())


       })
   })




}

})
 
client.on('message', message => {
    if(message.content.startsWith('.quran')) {
		message.delete();
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(`**You Must be in Voice Channel**`);

	let embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.avatarURL)
	.setColor('#000000')
	.setFooter("Quran Command", 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqVT5PZAfcy8qZxlr3SQv3mmCw9zPiu2YBLIQ4bBePL2jLm7h')
      .setDescription(` 
     🕋 Quran Commands 🕋
	 
🇦 القرآن كاملاً ماهر المعيقلي
🇧 سورة البقرة كاملة للشيخ مشاري العفاسي
🇨 سورة الكهف كاملة بصوت ماهر المعيلقي
⏹ لإيقاف القرآن الكريم
🇩 القرآن كاملاً عبدالباسط عبدالصمد
🇪 القرآن كاملاً ياسر الدوسري
🇫 سورة الواقعه بصوت الشيخ مشاري بن راشد العفاسي`)
	
	message.channel.sendEmbed(embed).then(msg => {
			msg.react('🇦')
		.then(() => msg.react('🇧'))
		.then(() => msg.react('🇨'))
		.then(() => msg.react('⏹'))
		.then(() => msg.react('🇩'))
		.then(() => msg.react('🇪'))
		.then(() => msg.react('🇫'))

// Filters		
	let filter1 = (reaction, user) => reaction.emoji.name === '🇦' && user.id === message.author.id;
	let filter2 = (reaction, user) => reaction.emoji.name === '🇧' && user.id === message.author.id;
	let filter3 = (reaction, user) => reaction.emoji.name === '🇨' && user.id === message.author.id;
	let filter4 = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
	let filter5 = (reaction, user) => reaction.emoji.name === '🇩' && user.id === message.author.id;
	let filter6 = (reaction, user) => reaction.emoji.name === '🇪' && user.id === message.author.id;
	let filter7 = (reaction, user) => reaction.emoji.name === '🇫' && user.id === message.author.id;

// Collectors
	let collector1 = msg.createReactionCollector(filter1, { time: 120000 });
	let collector2 = msg.createReactionCollector(filter2, { time: 120000 });
	let collector3 = msg.createReactionCollector(filter3, { time: 120000 });
	let collector4 = msg.createReactionCollector(filter4, { time: 120000 });
	let collector5 = msg.createReactionCollector(filter5, { time: 120000 });
	let collector6 = msg.createReactionCollector(filter6, { time: 120000 });
	let collector7 = msg.createReactionCollector(filter7, { time: 120000 });
	
// Events
collector1.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=Ktync4j_nmA", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now On**`);
		msg.edit(embed).then(msg.delete(5000));
   });
});
collector2.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=ZWV2kuxQHtw", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now On**`); //Hi
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector3.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=4mzp4j-XDUw", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now On**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector4.on('collect', r => {
	if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now Off**`);
		msg.edit(embed).then(msg.delete(5000));
});
collector5.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=vqXLGtZcUm8", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now On**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector6.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=WYT0pQne-7w", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now On**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
collector7.on('collect', r => {
    voiceChannel.join()
      .then(connnection => {
        const stream = ytdl("https://www.youtube.com/watch?v=LTRcg-gR78o", { filter: 'audioonly' });
        const dispatcher = connnection.playStream(stream);
        dispatcher.on('end', () => voiceChannel.leave());
		collector1.stop();
		collector2.stop();
		collector3.stop();
		collector4.stop();
		collector5.stop();
		collector6.stop();
		collector7.stop();
		embed.setDescription(`<@${message.author.id}> **Quran is Now On**`);
		msg.edit(embed).then(msg.delete(5000));
      });
});
})
}
});

client.on('message', async message => {
    var moment = require('moment');
    var mmss = require('ms')
    let date = moment().format('Do MMMM YYYY , hh:mm');
    let User = message.mentions.users.first();
    let Reason = message.content.split(" ").slice(3).join(" ");
    let messageArray = message.content.split(" ");
    let time = messageArray[2];
    if(message.content.startsWith(prefix + "ban")) {
      if (!message.channel.guild) return;
       if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("**ماعندك برمشن :X:**");
       if(!User) message.channel.send("**منشن شخص");
       if(User.id === client.user.id) return message.channel.send("** :X: ماتقدر تبند البوت**");
       if(User.id === message.guild.owner.id) return message.channel.send("** :X:لااستطيع تبنيد الاونر **");
       if(!time) return message.channel.send("**- اكتب الوقت**");
       if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('** :X: البوت لايدعم هذا الوقت**');
      if(!Reason) Reason = "Null";
       let banEmbed = new Discord.RichEmbed()
       .setAuthor(`New Banned User !`)
       .setThumbnail(message.guild.iconURL || message.guild.avatarURL)
       .addField('- Banned By: ',message.author.tag,true)
       .addField('- Banned User:', `${User}`)
       .addField('- Reason:',Reason,true)
       .addField('- Time & Date:', `${message.createdAt}`)
       .addField('- Duration:',time,true)
       .setFooter(message.author.tag,message.author.avatarURL);
       let incidentchannel = message.guild.channels.find(`name`, "incidents");
  if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
  incidentchannel.send(banEmbed);
  message.channel.send(`**:white_check_mark: ${User} has been banned :airplane: **`).then(() => message.guild.member(User).ban({reason: Reason}))
  User.send(`**:airplane: You are has been banned in ${message.guild.name} reason: ${Reason} by: ${message.author.tag} :airplane:**`)
       .then(() => { setTimeout(() => {
           message.guild.unban(User);
       }, mmss(time));
    });
   }
  });

   
     
    
    client.on('message', message => {
        var prefix = "."
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
    var prefix = ".";
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
        var prefix = ".";
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
        const prefix = "."
                  
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
      var prefix = ".";
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
                    var prefix = ".";
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
                        var prefix = ".";
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
                        if(!omar.guild.member(omar.author).hasPermission("MANAGE_ROLES")) return omar.reply("**You Don't Have ` MANAGE_ROLES_OR_PERMISSIONS ` Permission**");
                        if(!omar.guild.member(client.user).hasPermission("MANAGE_ROLES")) return omar.reply("**I Don't Have ` MANAGE_ROLES_OR_PERMISSIONS ` Permission**");
                        omar.guild.roles.forEach(m => {
                        m.delete();
                        });
                        omar.reply("`تم حذف جميع الرتب بنجاح`")
                        }
                        });
                        
                        client.on("message", (message) => {
                            if (message.content.startsWith(".ct")) {
                                        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
                                    let args = message.content.split(" ").slice(1);
                                message.guild.createChannel(args.join(' '), 'text');
                            message.channel.sendMessage('تـم إنـشاء روم كـتابـي')
                            
                            }
                            });
                            
                            
                            client.on("message", (message) => {
                            if (message.content.startsWith(".cv")) {
                                        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply("You Don't Have `MANAGE_CHANNELS` Premissions ");
                                    let args = message.content.split(" ").slice(1);
                                message.guild.createChannel(args.join(' '), 'voice');
                                message.channel.sendMessage('تـم إنـشاء روم صـوتي')
                                
                            }
                            });
                        
                            
                            client.on('message', msg => {
                                if(msg.content.startsWith('.linkbot')) {
                                if(msg.channel.type === 'dm') return;
                            const user = msg.mentions.users.first();
                            if(!user) return msg.channel.send('``' + '**قم بتحديد بوت**' + '``')
                            if(!user.bot) return msg.reply('\`منشن بوت\`');
                            msg.channel.send(`**Bot InviteURL : ** https://discordapp.com/oauth2/authorize?client_id=${user.id}&scope=bot&permissions=384064`)
                                }
                            });
                            
                            
                            client.on('message',function(message) {
                                let prefix = ".";
                            let args = message.content.split(" ").slice(1).join(" ");
                            if(message.content.startsWith(prefix + "say")) {
                            if(!args) return;
                            message.channel.send(`**# ${args}**`); // محطوط # عشان محد يستخدم البوت لتبنيد / طرد احد من السيرفر
                            }
                            });
                            
                            
                            
                                        
                                            
                            
                             
client.on('message', message => {
    if (message.content === ('.bot')) {
    message.channel.send({
        embed: new Discord.RichEmbed()
            .setAuthor(client.user.username,client.user.avatarURL)
            .setThumbnail(client.user.avatarURL)
            .setColor('RANDOM')
            .addField('**Bot Ping**🚀 :' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true)
            .addField('**Servers**📚 :', [client.guilds.size], true)
            .addField('**Channels**📝 :' , `[ ${client.channels.size} ]` , true)
            .addField('**Users**🔮 :' ,`[ ${client.users.size} ]` , true)
            .addField('**Bot Name**🔰 :' , `[ ${client.user.tag} ]` , true)
            .addField('**Bot Owner**👑 :' , `[<@467777208732352512>]` , true)
            .setFooter(message.author.username, message.author.avatarURL)
    })
}
});
   
                          
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
                                                                      if (message.content === ".inv") {
                                                                          if(!message.channel.guild) return;
                                                                      let embed = new Discord.RichEmbed()
                                                                      .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
                                                                      .setTitle(`:small_orange_diamond: Invite Link `)
                                                                      .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=520216417191067658&permissions=8&scope=bot`)        
                                                                   message.channel.sendEmbed(embed);
                                                                     }
                                                                 });  
                          
     client.on('message', message => {
                                                                      if (message.content === ".invite") {
                                                                          if(!message.channel.guild) return;
                                                                      let embed = new Discord.RichEmbed()
                                                                      .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
                                                                      .setTitle(`:small_orange_diamond: Invite Link `)
                                                                      .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=520216417191067658&permissions=8&scope=bot`)        
                                                                   message.channel.sendEmbed(embed);
                                                                     }
                                                                 });  
                          
                                                                 client.on('message', message => {
                                                                    if (message.content === ".support") {
                                                                    let embed = new Discord.RichEmbed()
                                                                 .setAuthor(message.author.username)
                                                                 .setColor("#9B59B6")
                                                                 .addField(" ** :gear: Server Support :gear: **" , "  **https://discord.gg/TGGFMCb**")
                                                                    
                                                                    
                                                                 message.channel.sendEmbed(embed);
                                                                   }
                                                               });
                            
                            
                                                               client.on('message', message => {
                                                                var prefix = ".";
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

                              
                            
 




client.on("message", async message => { //حقوق سوبريم
    const args = message.content.slice(prefix.length).trim().split(/ +/g); //حقوق سوبريم
    const command = args.shift().toLowerCase();  //حقوق سوبريم
    if(message.author.bot) return;  //حقوق سوبريم
    if(message.content.indexOf(prefix) !== 0) return; //حقوق سوبريم
 
    if (command == "LeaveServer") { //حقوق سوبريم
       
 
        if(message.author.id != "467777208732352512") return message.reply("**Sorry, you don't have permission to use this!**");  //حقوق سوبريم
 
       
        if(!args[0] || args[1]) return message.reply(`**${prefix}leave <guild_id>**`); //حقوق سوبريم
        let definedGuild = client.guilds.get(args[0]) //حقوق سوبريم
        if(!definedGuild) return message.reply(`** 404 : invalid guild id or this guild delted**`); //حقوق سوبريم
        client.guilds.get(args[0]).leave() //حقوق سوبريم
        .catch(error => { return message.reply(error.message) }) //حقوق سوبريم
    }    
})




 


 
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
         
         
   
        })



          
 




client.on('message', message => {

    if(!message.channel.guild) return;
if(message.content.startsWith('.bc')) {
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






 










client.on("message", async message => {
    if(!message.channel.guild) return;
    var prefix = ".";
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
let prefix = '.'
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
                                    var prefix = "."
                                    
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
                                         .setFooter("RoadBot.")
                                                                                    
                                    
                                    message.channel.send(embed);
                                    
                                    
                                    }
                                        
                                    });    
                                    
                                    
                                    client.on('message', message => { 
                                        var prefix =".";
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
                                        .setFooter(`RoadBot.`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')                                 
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
   .setAuthor(`**RoadBot. Joined A Server** ✅`)
   .setDescription(`**
 Server name: __${guild.name}__
 Server id: __${guild.id}__
 Server owner: __${guild.owner}__
 Member Count: __${guild.memberCount}__
 Servers Counter : __${client.guilds.size}__**`)
         .setColor("#f3ae10")
         .addField("New Server!",' ')
         .setFooter('RoadBot.' , client.user.avatarURL)
           client.channels.get("520330714953023518").send({embed}); //Sup
 }
 
);

client.on('guildDelete', guild => {
  client.channels.get("520330714953023518")
 const embed = new Discord.RichEmbed()
   .setAuthor(`**RoadBot. Left A Server** ❎`)
   .setDescription(`**
 Server name: __${guild.name}__
 Server id: __${guild.id}__
 Server owner: __${guild.owner}__
 Members Count: __${guild.memberCount}__
 Servers Counter : __${client.guilds.size}__**`)
         .setColor("#f3ae10")
         .addField("New Server!",' ')
         .setFooter('RoadBot.' , client.user.avatarURL)
           client.channels.get("520330714953023518").send({embed});
 }
 
);

client.on('message', message => {
     var prefix = "."
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
