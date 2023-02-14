const express = require('express')
const { Server } = require('socket.io')

let log = []
// log = ['hola', 'que tal?']
// log = [{ id: user1, text: 'Hola'}, {}]

const app = express()
const serverHttp = app.listen(8080, () => console.log('Server Up'))

app.use(express.static(__dirname + '/public'))

const serverSocket = new Server(serverHttp)

serverSocket.on('connection', socket => {
    console.log(`Nuevo cliente ${socket.id} socket conectado...`);
    serverSocket.emit('history', log)
    socket.on('mensaje', data => {
        log.push({ userId: socket.id, texto: data })
        serverSocket.emit('history', log)
    })
})

