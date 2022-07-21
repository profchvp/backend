import { Request, Response } from "express";
import {CreateCategoryService} from '../../services/categoty/CreateCategoryService';
//
class CreateCategoryController{
 async handle(req:Request, res:Response){
    const {name}=req.body;
     const createCategoryService = new CreateCategoryService();
     const category = await createCategoryService.execute({
        name
     });

     //return category;//desta forma "trava a resposta"
     return res.json(category); //retorna o que receber do servico
 }
}
export{CreateCategoryController}