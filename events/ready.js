module.exports = {
    name: 'ready',
    once: true,

    async execute(client) {
        console.log(`Giriş Başarılı!`)
client.user.setActivity("Türkiyenin En İyi Ticket Botuyum!")
      
    }
}
