import http from "http"
import { Server, Socket } from "socket.io";
import type { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "./ServerEvents";
import Sala from "./Sala";
import { estadoHab } from "../Game/types/estadoHab";
import { estadoSala } from "../Game/types/estadoSala";

export default class Multiplayer{

    private static SALAS = new Map<string, Sala>();
    
    public static io:Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;

    public static setIO(server:http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){
        this.io = new Server(server, {
            cors: {origin:'*', methods:['GET', 'POST']}
        })
    }

    private static gerarID():string{
        let id = Math.floor(Math.random() * 9999);
        
        let codigo = id.toString();
    
        while(codigo.length < 4){
            codigo = "0" + codigo;
        }
    
        return codigo;
    }

    public static startGameEvents(socket:Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>){

        socket.on("comprarPilha", (salaID, playerNumber)=>{
            let sala = this.SALAS.get(salaID)!;
            
            console.log("Comporar da pilha")

            sala.game.comprarPilha(playerNumber);

            Multiplayer.updateGame(salaID)
        })

        socket.on("comprarDescarte", (salaID, playerNumber)=>{
            let sala = this.SALAS.get(salaID)!;
            
            console.log("Comporar do descare")
            
            sala.game.comprarDescarte(playerNumber);

            Multiplayer.updateGame(salaID)
        })

        socket.on("trocarCarta", (salaID, playerNumber, indexCarta)=>{
            let sala = this.SALAS.get(salaID)!;
            
            console.log("Trocar carta")
            
            sala.game.trocarCarta(playerNumber, indexCarta);

            Multiplayer.updateGame(salaID)
        })

        socket.on("cortar", (salaID, playerNumber, indexCarta)=>{
            let sala = this.SALAS.get(salaID)!;
            
            console.log("Corte")
            
            sala.game.cortar(playerNumber, indexCarta);

            Multiplayer.updateGame(salaID)

            setTimeout(() => {
                sala.game.computarCorte()
                Multiplayer.updateGame(salaID)
                console.log("computou corte")
            }, 1500);
        })

        socket.on("descartar", (salaID, playerNumber)=>{
            let sala = this.SALAS.get(salaID)!;

            console.log("descarte")
            sala.game.descartar(playerNumber);

            Multiplayer.updateGame(salaID)

        })

        socket.on("negarHabilidade", obj =>{
            
            console.log(obj)

            let sala = this.SALAS.get(obj.salaID)!
            
            sala.game.setEstadoHabilidade(estadoHab.inativa)
            sala.game.passarVez()
            Multiplayer.updateGame(obj.salaID)

            sala.game.setHabilidade(-1, obj.playerID)
        })

        socket.on("aceitarHabilidade", obj =>{
            let sala = this.SALAS.get(obj.salaID)!
            sala.game.setEstadoHabilidade(estadoHab.emUso)

            Multiplayer.updateGame(obj.salaID)
        })

        socket.on("enviarHabilidade", (obj, hab) =>{
            let sala = this.SALAS.get(obj.salaID)!

            sala.game.setEstadoHabilidade(estadoHab.aplicar)
            sala.game.aplicarHabilidade(hab)
            Multiplayer.updateGame(obj.salaID)
        })

        socket.on("stop", obj =>{
            let sala = this.SALAS.get(obj.salaID)!

            let objStop = sala.game.pedidoStop(obj.playerID)

            if(!objStop){
                Multiplayer.updateGame(obj.salaID)
                return;
            }
            this.io.to(obj.salaID).emit("encerrarGame", objStop)
        })

        
        socket.on("usouHabilidade", (obj) =>{
            let sala = this.SALAS.get(obj.salaID)!

            sala.game.setEstadoHabilidade(estadoHab.inativa)
            sala.game.passarVez()
            Multiplayer.updateGame(obj.salaID)
            
            sala.game.setHabilidade(-1, obj.playerID)
        })

    }
    public static startPageEvents(socket:Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>){
        
        socket.on("criarSala", (hostName)=>{
            let salaID:string = this.gerarID()
    
            this.SALAS.set(salaID, new Sala(hostName))
    
            console.log(hostName, salaID)
            socket.emit('salaID', salaID)
            
        })
    
        socket.on("entrarSala", (salaID:string, playerName:string)=>{

            if(!this.SALAS.has(salaID))
                return;

            let sala:Sala = this.SALAS.get(salaID)!

            socket.join(salaID)

            sala.playerNames.set(sala.playerNames.size, playerName) 

            const regrasArray = Array.from(sala.game.regras.entries());
            const arrayPlayers = Array.from(sala.playerNames.entries());

            this.io.to(salaID).emit("entrarSala", 
                sala.host,
                regrasArray, 
                arrayPlayers,
                sala.gameRunnig)
        })
    
        socket.on("configSala", (salaID:string, regras:[string, number][])=>{
            this.SALAS.get(salaID)?.setConfig(regras)
        })
    
        socket.on("gameStart", (salaID)=>{
            
            let sala:Sala = this.SALAS.get(salaID)!
            sala.startGame()

            console.log(sala.playerNames)
            console.log(salaID, "começou")
            
            let arrayPlayers = Array.from(sala.playerNames.entries())

            this.io.to(salaID).emit("gameStart", arrayPlayers, estadoSala.game)
            
            Multiplayer.updateGame(salaID)
        })
    }

    public static updateGame(salaID:string){

        let sala:Sala = this.SALAS.get(salaID)!;

        this.io.to(salaID).emit("updateGame", sala.game.players,
            sala.game.descarte, 
            sala.game.getCartasCorte(),
            sala.game.pilha.length,
            sala.game.vez,
            sala.game.habilidade
            )
    }
}