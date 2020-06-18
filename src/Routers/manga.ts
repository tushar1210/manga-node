import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/manga';
import * as Fs from 'fs'  ;


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



router.get('/image/:sourceId/:dir/:imageId',async(request:Request,response:Response)=>{
    const sourceId=request.params.sourceId;
    const dir = request.params.dir;
    const imageId=request.params.imageId;
    
    if(sourceId === '0'){
       
        await handler.mangaEdenGetImage(dir,imageId)
        .then(()=>{
             response.download('./build/temp/thumbnail/image.jpg','image.jpg',()=>{
                Fs.unlinkSync('./build/temp/thumbnail/image.jpg')
             })
        })
        .catch(()=>{
            response.status(500).json({
                success:false,
                message:"Unable to fetch Image",
            });
        });
        


    }


});

export default router;