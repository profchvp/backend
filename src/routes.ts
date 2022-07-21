import { Router  } from "express";
import multer from "multer";
//
import { CreateUserController} from './controllers/user/CreateUserController';
import {AuthUserController}    from './controllers/user/AuthUserController';
import {DetailUserController} from './controllers/user/DetailUserController';

import{isAuthenticated} from './middlewares/isAuthenticated';
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import {ListCategoryController} from "./controllers/category/ListCategoryController";

import {CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController"; 

import { CreateOderController }  from "./controllers/order/CreateOderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { AddItemController }     from "./controllers/order/AddItemConroller";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import uploadConfig from './config/multer' ;

const router=Router();
const upload=multer(uploadConfig.upload("./tmp"));
/**
router.get('/teste',(req:Request,res:Response)=>{
    return res.json({nome:"Sujeito pizza"})
   /**Vamos instalar a lib: yarn add express-async-errors *
   throw new Error("erro ao fazer requisição");
   

})
*/
//--Rotas USER---
router.post('/users',new CreateUserController().handle)
router.post('/session',new AuthUserController().handle)
//...............o Middleware isAuthenticated será chamado antes de executar DetailController
router.get('/me',isAuthenticated,new DetailUserController().handle)
//...............
//--Rotas CATEGORY---
router.post('/category',isAuthenticated,new CreateCategoryController().handle)
router.get('/listcategory',isAuthenticated,new ListCategoryController().handle)
//...............
//--Rotas PRODUCT---
router.post('/product',isAuthenticated,upload.single('file'),new CreateProductController().handle)
router.get('/category/product',isAuthenticated,new ListByCategoryController().handle)
//...............
//--Rotas ORDER---
router.post('/order',isAuthenticated,new CreateOderController().handle)
router.delete('/order',isAuthenticated,new RemoveOrderController().handle)
router.post('/order/add',isAuthenticated,new AddItemController().handle)
router.delete('/order/remove',isAuthenticated,new RemoveItemController().handle)
router.put('/order/send',isAuthenticated,new SendOrderController().handle)
router.get('/order/list',isAuthenticated,new ListOrderController().handle)
router.get('/order/detail',isAuthenticated,new DetailOrderController().handle)
router.put('/order/finish',isAuthenticated,new FinishOrderController().handle)

//-----------------------
export {router};