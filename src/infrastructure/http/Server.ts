import express from 'express';
import http from "http"
import { config } from '@/config';
import { errorHandlerMiddleware } from '@/infrastructure/http/middlewares/errorHandler.middleware';
import { Multiplayer } from '@/infrastructure/websocket/Multiplayer';
import { WsServer } from '@/infrastructure/websocket/WsServer';

export class Server {

    private _app;
    private _server;

    constructor() {

        this._app = express();

        this._server = http.createServer(this._app);
    
        this.config();
        
    }

    private config() {

        this._app.use(express.json());

        this._app.use("/", (req, res) => {res.send("teste")})

        this._app.use(errorHandlerMiddleware);
        
    }

    private initDatabase() {

        // TODO: colocar um banco nessa bomba

    }

    private initSocketIO() {

        WsServer.setIO(this._server)
        
        WsServer.init()

    }

    public listen() {

        this.initDatabase();

        this.initSocketIO();

        this._server.listen(config.PORT, () => console.log(`Server dando na porta ${config.PORT}`))
    
    }

    public get app() {
        return this._app;
    }
    
}