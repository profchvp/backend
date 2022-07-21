import { NextFunction, Request,Response } from "express";
import {verify} from 'jsonwebtoken';

//vamos tipar Payload
interface PayLoad{
    sub:string;
}
export function isAuthenticated(
    req:Request,
    res:Response,
    next:NextFunction
)
{
//console.log("Chamou Middleware - isAuthenticated");
//....receber o token
const authToken=req.headers.authorization;
if (!authToken)          //não mandou Token
{
    return res.status(401).end();
}
//console.log("Token recebido: "+authToken);
//...vamos agora obter os Token (Recebemos BEARER+Token)...entao vamos "descontruir"authToken
//...[,xxx]=onde "," desprezo o primeiro item (Bearer) e xxx=Token recebido
const [,token]=authToken.split(" ");  //existe " " entre Bearer e o Token
//...console.log("Token recebido sem Bearer: "+token);

//...vamos verificar o Token (validar comt try...catch)
try{
   //...validar o Token
   const {sub}=verify(
       token,
       process.env.JWT_SECRET
   ) as PayLoad;
   //console.log("sub recuperado(PayLoad): "+sub);//devolve o ID do USUARIO (Ver banco de dados)
   //
   //.......recuperar o id do token e colocar dentro de uma variavel user_id dentro do req.
   req.user_id = sub;

}catch(err){
   return res.status(401).end(); //Token não autorizado
}
return next(); //Sem isto, fica em Looping
}