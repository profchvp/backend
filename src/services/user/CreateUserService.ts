//Sera utilizado BD., portanto, deveremos importar PRISMA
import prismaClient from '../../prisma';//import sem {} pq foi dado export da classe
//
import {hash} from 'bcryptjs'; //biblioteca de criptografia 

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
/*
    //async excute(){
    async excute({name,email,password}:UserRequest){
        console.log(name)
    //return {ok:true}
    return {name:name}
 }
 -----------------------------------------------
 */
 async excute({name,email,password}:UserRequest){
    //verificar se foi enviado email
    if (!email){
        throw new Error("Email incorrect")
    }
     //verificar se email já está cadastrado na plataforma
     
     const userAlreadyExists  = await prismaClient.user.findFirst({
        where:{ 
            email: email
        }
     })
     if (userAlreadyExists){
        throw new Error("User already exists")
    }
    //................................
     //verificar se foi enviado email
     if (!email){
        throw new Error("Email incorrect")
    }
    /**
     * fazer a criptografia da senha
     * 
     */
     const passwordHash = await hash(password,8);
    //agora vamos fazer o INSERT
    const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password:passwordHash
        },
        //aqui será informado o que queremos devolver (Ex.: não queremos devolver password)
        select:{
            id:true,
            name:true,
            email:true
        }
    })
    //return {name: name}
    return  user;
 }
}
export {CreateUserService};