//Todo para el sign in de los usuarios
import { NextFunction, Request, Response } from "express";
import { checkSchema } from "express-validator";
import AbstractController from "./AbstractController";
import UserModel from "../modelsNOSQL/userNOSQL";

class AuthenticationController extends AbstractController {
    protected validateBody(type: any) {
        throw new Error("Method not implemented.");
    }
    //Singleton, para que una clase sólo pueda tener una instancia.
    //Atributo de clase
    private static instance:AuthenticationController;
    //Método de clase
    public static getInstance():AbstractController{
        if(this.instance){
            return this.instance;
        }
        this.instance = new AuthenticationController('cliente');
        return this.instance;
    }

    protected initRoutes(): void {
        this.router.post('/signup', this.signup.bind(this));
        this.router.post('/verify', this.verify.bind(this)); //18 de Mayo
        this.router.post('/signin', this.signin.bind(this));
        this.router.get('/test',this.authMiddleware.verifyToken,this.test.bind(this)); //Llega la petición a test para verificar primero el token. Si es correcto llega al end point.
    }

    private async test(req:Request, res:Response) {
        res.status(200).send("Esto es una prueba");
    }

    private async test2(req:Request, res:Response) {
        res.status(200).send("Esto es una prueba de validacion de token y rol");
    }
    
    private async signin(req:Request, res:Response){
        const {email, password} = req.body;

        try{
            const login = await this.cognitoService.signInUser(email, password);

            res.status(200).send({...login.AuthenticationResult});

        }catch (error:any){
            res.status(500).send({code:error.code,message:error.message}).end()
        }
    }

    private async verify(req:Request,res:Response){  //18 de Mayo
        const{email, code} =req.body;
        try{
            await this.cognitoService.verifyUser(email, code);
            //

            return res.status(200).send("listo se verifico").end();
        }catch (error:any){
            res.status(500).send({code:error.code,message:error.message}).end()
        }
    }
    
    private async signup(req:Request,res:Response){
        const {email,password,name,last_name,no_cuenta,saldo} = req.body;
        try{
            //create a new user in Cognito
            const user = await this.cognitoService.signUpUser(email,password,[
                {
                    Name: 'email',
                    Value: email
                }
            ])
            //Guardar el usuario en DB NoSQL (DynamoDB)
            await UserModel.create(
                {
                    awsCognitoId:user.UserSub,
                    name,
                    email,
                    last_name,
                    no_cuenta,
                    saldo

                },
                {overwrite:false}
            )
            console.log('Usuario guardado en BDNoSQL')
            return res.status(200).send("listo se guardo en BD").end();

        }catch(error:any){
            res.status(500).send({code: error.code,message:error.message}).end()

        }

    }

}

export default AuthenticationController;