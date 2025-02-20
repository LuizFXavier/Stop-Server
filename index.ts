import express from "express"
import http from "http"
import Sala from "./connection/Sala"
import { Server } from "socket.io"
import { gerarID } from "./utils/gerarID"
import Multiplayer from "./connection/Multiplayer"

const app = express()

const PORTA = 9090

const server = http.createServer(app)

const SALAS = new Map<string, Sala>();

Multiplayer.setIO(server)

Multiplayer.io.on("connection", (socket)=>{
    Multiplayer.startPageEvents(socket)
    Multiplayer.startGameEvents(socket)
})

server.listen(PORTA, () =>{
    console.log(`Server dando na porta ${PORTA}`)
})