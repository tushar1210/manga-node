import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/manga';
const router = Router();

const sources=[0]

router.get('/mangaList/:sourceId',async(request:Request,response:Response)=>{
    var sourceId = request.params.sourceId;
    if(sourceId===null){
        response.status(400).json({
            success:false,
            error:"Invalid/Insufficient Parameters"
        });
    }
    if(sourceId==='0'){
        await handler.mangaEdenList()
        .then((data)=>{
            response.json({
                success:true,
                data:data.data
            })
        })
        .catch((e)=>{
            response.status(502).json({
                success:false,
                message:"Unexpected Error",
                error:e
            })
        });
    }


});





export default router;