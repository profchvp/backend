import { Request,Response } from 'express';
import {ListOrderService} from '../../services/order/ListOrderService';
//Não recebe parâmetro - é uma List
class ListOrderController{
    async handle(req:Request,res:Response){
        const listOrderService = new ListOrderService();
        const orders = await listOrderService.execute();
        return res.json(orders);
    }

}
export {ListOrderController}