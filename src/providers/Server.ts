import express,{Request, Response} from 'express';
import AbstractController from '../controllers/AbstractController';



class Server{
    private app:express.Application;
    private port:number;
    private env:string;

    constructor(appInit:{port:number; env:string; middlewares:any[]; controllers:AbstractController[]}){
        this.app = express();
        this.port =appInit.port;
        this.env =appInit.env;
        this.loadMiddlewares(appInit.middlewares);
        this.loadControllers(appInit.controllers);
        
    }

    private loadControllers(controllers:AbstractController[]){
        controllers.forEach((controller:AbstractController)=>{
            this.app.use(`/${controller.prefix}`,controller.router);
        })
    }

    private loadMiddlewares(middlewares:any[]){
        middlewares.forEach((middleware:any)=>{
            this.app.use(middleware);
        })
    }


    public async init(){
        this.app.listen(this.port, ()=>{
            console.log(`Server::Running @'http://localhost:${this.port}'`);
        })
    }
}

export default Server;