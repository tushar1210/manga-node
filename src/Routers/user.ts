import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/user';
const router = Router();

router.post('/login',async (request:Request, response:Response)=>{
    const user = request.query.userId;
    const pass = request.query.pass;
    if(user !== null && pass!==null){
        await handler.login(String(user),String(pass));
        
    }

});

export default router;