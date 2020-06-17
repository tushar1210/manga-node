import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/user';
const router = Router();

router.post('/login',async(request:Request, response:Response)=>{
    var user = request.query.userId;
    var pass = request.query.pass;

    // console.log(typeof(user),pass);

    if((user === null || pass ===null)||(user===undefined || pass === undefined)||(user==='' || pass==='')){
        response.status(400).json({
            success: false,
            error:'Bad Request',
            message : 'invalid Parameters'
        });
        return ;
    }else{
        user = String(request.query.userId);
        pass = String(request.query.pass);
        await handler.login(user,pass).then((data)=>{
            if (data!==null){
                response.json({
                    success:true,
                    user:data
                });
            }else{
                response.status(210).json({
                    success:false,
                    message:"Invalid User"
                });
            }
            
        }).catch((e)=>{
            response.status(501).json({
                success:false,
                message:"Server Error",
                error:e
            });
        });
        var a=0;
    }

});

router.post('/register',async(request:Request, response:Response)=>{
    var user = request.query.userId;
    var pass = request.query.pass;
    if((user === null || pass ===null)||(user===undefined || pass === undefined)||(user==='' || pass==='')){
        response.status(400).json({
            success: false,
            error:'Bad Request',
            message : 'invalid Parameters'
        });
        return;
    }
    user = String(request.query.userId);
    pass = String(request.query.pass);
    await handler.register(user,pass).then((data)=>{
        console.log(data);
        response.json({
            success:true,
            user:data
        });
    })
    .catch((e)=>{
        console.log(e);
        response.status(210).json({
            success:false,
            message:"User Exists"
        });
    })


});
export default router;