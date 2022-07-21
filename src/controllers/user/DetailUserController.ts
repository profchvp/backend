import {Request, Response} from 'express';
import {DetailUserService} from '../../services/user/DetailUserService';
//

class DetailUserController{
    async handle(req:Request,res:Response){

        const user_id = req.user_id;
        //console.log("User_id recuperado...:"+user_id)
        
        const detailUserService = new DetailUserService();

        const user = await detailUserService.execute(user_id); //chama serviço para ser executado

        return res.json(user); //retorna o que receber do servico
    }
}
export {DetailUserController}

