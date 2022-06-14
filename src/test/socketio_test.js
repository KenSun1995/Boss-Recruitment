// import client io
import io from 'socket.io-client'
// connect server, get socket obj
const socket = io('wss://localhost:4000', { transports: ['websocket'] })
// bind 'receiveMessage' monitor, to receive msg from server
socket.on('receiveMsg', function (data) {
    console.log('Browser received msg:', data)
})
// sent msg to server
socket.emit('sendMsg', { name: 'Tom', date: Date.now() })
console.log('Browser sent msg to server:', { name: 'Tom', date: Date.now() })