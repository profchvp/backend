import {Request,response,Response} from 'express';
import {CreateUserService} from '../../services/user/CreateUserService'

class CreateUserController{
   async handle(req:Request, res:Response){
    // console.log(req.body);
    //...note: estamos de "desconstruir a estrutura json"
    const {name, email, password}=req.body;

    const createUserService = new CreateUserService();

    //.....epera o execute()...ai sim vai para linha de  baixo
    const user = await createUserService.excute({
        name, 
        email,
        password
    }); 

    //return res.json({ok:true})
    return res.json(user);
   }
}
export {CreateUserController}