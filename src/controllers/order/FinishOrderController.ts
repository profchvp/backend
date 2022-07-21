import {Request,Response} from 'express';
import {FinishOrderService} from '../../services/order/FinishOrderService';
class FinishOrderController{
    async handle(req:Request,res:Response){
        const {order_id}=req.body;
        const finishorderService = new FinishOrderService();
        const order = await finishorderService.excute({
            order_id
        })
        return res.json(order);
    }
}
export {FinishOrderController}