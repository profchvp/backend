import prismaClient from "../../prisma";
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
/**
 * solicitar para que a interface (app) envie email e senha
 */
interface AuthRequest{
    email: string;
    password: string;
}
//
class AuthUserService{
   async execute({email,password}:AuthRequest){  //buscando valores digitados em tela
        //console.log("..."+email);
        //return{ok:true}
    //verificar se o email existe no BD
    const user = await prismaClient.user.findFirst({
        where:{
            email:email
        }
    })    
    if(!user){
        //console.log("Usuario Não OK 1..."+email);
        throw new Error("User/password incorrect")
    }
    /**
     * OK encontrou User; Agora verificar a senha
     * o metodo "compare" compara valor normal com valor criptografado (telaxBD)
     *  */    
     const passwordMatch = await compare(password,user.password)
     if (!passwordMatch){
        //console.log("Usuario Não OK 2..."+email);
        throw new Error("User/password incorrect2")
     }
     //console.log("Usuario OK..."+email);
     //return{ok:true}
     /**
      * gerar o TOKEN
      */
     const token =  sign(
          {
           name:user.name,
           email:user.email
          },
          process.env.JWT_SECRET,
          {
            subject:user.id,
            expiresIn:'30d'
          }
        )
        return {
            id:user.id,
            name:user.name,
            email:user.email,
            token:token
        }
   }
}
export {AuthUserService}