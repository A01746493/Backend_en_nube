import Server from "./providers/Server";
import express from "express";
import cors from 'cors';
import UserController from "./controllers/UserController";
import AuthenticationContoller from "./controllers/AuthenticationController";
import AccountController from "./controllers/AccountController";

const app = new Server({
    port:8080,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true}),
        cors()
    ],
    controllers:[
        UserController.getInstance(),
        AuthenticationContoller.getInstance(),
        AccountController.getInstance()
    ],
    env: 'development'
});

declare global{
    namespace Express{
        interface Request{
            user: string;
            token: string;
        }
    }
}

app.init();
