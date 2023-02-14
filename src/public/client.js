const socket = io()

let chatBox = document.getElementById('chatBox')

chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        socket.emit('mensaje', chatBox.value)
        chatBox.value = ""
    }
})

socket.on('history', data => {
    let history = document.getElementById('history')
    let mensajes = ""
    data.forEach(obj => {
        mensajes += `[${obj.userId}]: ${obj.texto}<br />`
    })
    history.innerHTML = mensajes
})