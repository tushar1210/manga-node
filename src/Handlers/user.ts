import mongoose from "../index";
import { User } from "../Models/user"


export async function login(id:string,pass:string){
    
    return await User.findOne({id:id,pass:pass}).exec()
    
}

export async function register(id:string,pass:string){

    return new Promise((resolve,reject)=>{
        User.findOne({id:id,pass:pass},(err,user)=>{
            if(err){
                reject(err);
            }
            if(user){
                reject(user);
            }else{
                var u = new User({
                    id:id,
                    pass:pass
                });
                resolve(u.save())
            }
      })  
    })
      
    
}
