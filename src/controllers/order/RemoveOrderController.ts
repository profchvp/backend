import {Request,Response} from 'express';
import { RemoveOrderService } from '../../services/order/RemoveOrderService';

class RemoveOrderController{
    async handle(req:Request,res:Response){
        //não enviar por body e sim por QueryParms
        const order_id = req.query.order_id as string;

        const removeOrder = new RemoveOrderService();
        //......falta do await...gera erro
        const order = await removeOrder.execute({
            order_id
        });
        return res.json(order);
    }
}
export{RemoveOrderController}