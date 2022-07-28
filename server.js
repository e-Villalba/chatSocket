const { Server } = require("engine.io")
const express = require("express")
const {Server:HttpServer}= require("http")
const {Server:IOServer}= require("socket.io")

const app=express()
const httpServer=new HttpServer(app)
const io= new IOServer(httpServer)

httpServer.listen(8080,()=>{
    console.log("Server on Port 8080")
    
})

///https://stackoverflow.com/questions/6458083/get-the-clients-ip-address-in-socket-io identificar ip
const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];

 /*io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
});*/

app.use(express.static("public"));

io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
 });
