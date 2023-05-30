import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import ClientModel from "../modelsNOSQL/userNOSQL";



class AccountController extends AbstractController {
  protected validateBody(type: any) {
    throw new Error("Method not implemented.");
  }

  //Singleton, para que una clase sólo pueda tener una instancia.
  //Atributo de clase
  private static instance: AccountController;
  //Método de clase
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountController("cuenta");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.post("/deposito", this.authMiddleware.verifyToken, this.deposito.bind(this));
    this.router.post("/retiro", this.authMiddleware.verifyToken, this.retiro.bind(this));
    this.router.get("/saldo", this.authMiddleware.verifyToken, this.getSaldo.bind(this));
  }
  private async getSaldo(req: Request, res: Response) {

    try {
      const { cognito_id } = req.body;
      const user: any = await ClientModel.get(cognito_id);
      if(user){
        const saldo = user.get('saldo')
        return res.status(200).send({saldo});
      }
      else{
        res.status(404).send({message:"Usuario no existente ", cognito_id})
      }
    } catch (error: any) {
      return res.status(500).send({ code: error.code, message: error.message });
    }

    
  }

  private async deposito(req: Request, res: Response) {
    try {
      const { cognito_id, deposito } = req.body;

      const user: any = await ClientModel.get(cognito_id);
      if(user){
        const saldo = user.get('saldo')

        // Realizar el depósito y actualizar el saldo
        const saldoActualizado = saldo + deposito;

        await ClientModel.update({ awsCognitoId: cognito_id, saldo: saldoActualizado });
    
        res.status(200).send({message: "Saldo Actualizado ", saldoActualizado });
      }else{
        res.status(404).send({message:"Usuario no existente ", cognito_id})
      }
    } catch (error: any) {
      console.error('Error al realizar el depósito:', error);
      res.status(500).send('Error al realizar el depósito').end();
    }
  }

  private async retiro(req: Request, res: Response) {
    try {
      const { cognito_id, retiro } = req.body;

      const user: any = await ClientModel.get(cognito_id);
      if(user){
        const saldo = user.get('saldo')
        if (saldo > retiro ){
          const saldoActualizado = saldo - retiro;

          await ClientModel.update({ awsCognitoId: cognito_id, saldo: saldoActualizado });
    
          res.status(200).send({message: "Saldo Actualizado despues del retiro: ", saldoActualizado });
        }
        else{
          res.status(404).send({message:"No cuentas con el saldo suficiente ", saldo})
        }
      }else{
        res.status(404).send({message:"Usuario no existente ", cognito_id})
      }
    } catch (error: any) {
      console.error('Error al realizar el depósito:', error);
      res.status(500).send('Error al realizar el depósito').end();
    }
  }
}

export default AccountController;