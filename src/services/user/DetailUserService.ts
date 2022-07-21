import prismaClient from '../../prisma';

class DetailUserService{
   async execute(user_id: string){
    //return {"ok":"rota OK"}
    //....vamos ao BD buscar os dados do usuário, pelo id (user_id)
    const user =await prismaClient.user.findFirst({
         where:{
            id: user_id
         },//devolve aqui somente o que interessa 
         select:{
            id:true,
            name:true,
            email:true             
         }
    })
    return user;
   }
}
export {DetailUserService}