import {Request,Response} from 'express';
import {CreateProductService} from '../../services/product/CreateProductService'; 

class CreateProductController{
    async handle(req: Request, res: Response){
        const {name, price, description,   category_id}=req.body;
        const createProductService = new CreateProductService();
        /**
         * procedimento para upload de foto
         */
         if (!req.file){
            throw new Error("Error upload File")
         }else{
           //..............const{originalname, filename}=req.file;
           //.............console.log(filename);
           const{originalname, filename:banner}=req.file;
           const product = await createProductService.execute({
                              //,banner:'',Não gera erro!!!
             name,price,description,banner, category_id              
         });
           return res.json(product);

         }
  
    }
}
export {CreateProductController}