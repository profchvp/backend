import prismaClient from "../../prisma" //para manipular o BD
interface CategoryRequest{
    name: string;
}
class CreateCategoryService{
     //async execute(){
     //    return {ok:true}
     async execute({name}: CategoryRequest){
         if (name===''){
            throw new Error("nae Invalid")//nome não informado
         }
         const category = await prismaClient.category.create({
            data:{
                name:name,
            },
            select:{  //retorna para o chamador os seguintes dados
                id:true,
                name:true
            }
         })
         return category;
    }
}
export{CreateCategoryService};