import prismaClient from "../../prisma";
//criar tipagem com os dados requeridos (interface Productrequest)
//
interface ProductRequest{
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService{
    //execute() recebe os valores de entrada "descontruidos"
    async execute({name, price, description, banner, category_id}: ProductRequest){
     //...........   return {"...":"incluiu..."}
     const product= await prismaClient.product.create({
        data:{
            name:name,
            price:price,
            description:description,
            banner:banner,
            category_id:category_id,
        }
     });
     return product;
    }
}
export{CreateProductService};