const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu  } = require('discord.js')
const { kategori, yetkili } = require('../config.json');
const db = require("croxydb")
module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction, message, args) {
        if (!interaction.isSelectMenu()) return;
        
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Bileti silmek için seçin!')
					.addOptions([
						{
							label: '🗑️ Silinen bilet',
							description: 'Kanalı sil',
							value: 'delete',
						}
					])
                );
                
                let data3 = await db.get("destek"+ interaction.guild.id)
                let roleStaff = interaction.guild.roles.cache.get(data3.rolID)
  
        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
              
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: 'Sunucuda zaten açık bir biletiniz var.', ephemeral: true})
            if (interaction.values[0] == "menu3") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const i1 = new MessageEmbed()
                    .setTitle('Godzilla - Destek Sistemi')
                    .setDescription(`Kullanıcını Destek Talebini Menüdeki 3. Kısma Basarak Açtı!\n\nDestek Oluşturan: ${interaction.user}`)
                    .setColor("RED")
                    c.send({embeds: [i1], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
                
            } else if (interaction.values[0] == "menu2") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                 
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const i2 = new MessageEmbed()
                    .setTitle('Godzilla - Destek Sistemi')
                    .setDescription(`Kullanıcının Bu Destek Talebini Menüdeki 2. Kısıma Basarak Oluşturdu!\n\nDestek Oluşturan: ${interaction.user}`)
                    .setColor("RED")
                    c.send({embeds: [i2], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
            } else if (interaction.values[0] == "menu1") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                  
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const embed = new MessageEmbed()
                    .setTitle('Godzilla - Destek Sistemi')
                    .setDescription(`Kullanıcının Bu Destek Talebini Menüdeki 1. Kısıma Basarak Oluşturdu!\n\nDestek Oluşturan: ${interaction.user}`)
                    .setColor("RED")
                    c.send({embeds: [embed], content: `${roleStaff} | ${interaction.user}`, components: [row]})
                    interaction.reply({content: `Biletiniz başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
                
            
                
            
            }
        }
    }
}