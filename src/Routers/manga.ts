import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/manga';
import * as Fs from 'fs'  ;


const router = Router();

const sources={
    0:"mangaEden",
    1:"kissmanga.in"
}

router.get('/list/:sourceId',async(request:Request,response:Response)=>{
    var sourceId = request.params.sourceId;
    
    if(sourceId===null){
        response.status(400).json({
            success:false,
            error:"Invalid/Insufficient Parameters"
        });
    }
    //returns all manga list
    if(sourceId==='0'){
        const raw = Fs.readFileSync('./build/temp/eden-list.json');
        var data = JSON.parse(raw.toString());
        response.json({
            success:true,
            data:data
        });
    }
});
router.get('/list/:sourceId/search/:query',async(request:Request,response:Response)=>{
    var sourceId = request.params.sourceId;
    var query = request.params.query;
    if(sourceId===null || query===null){
        response.status(400).json({
            success:false,
            error:"Invalid/Insufficient Parameters"
        });
    }
    if(sourceId==='0'){
        const raw = Fs.readFileSync('./build/temp/eden-list.json');
        const data = JSON.parse(raw.toString());
        var res = data.filter((d:any)=>{
            return d.a.indexOf(query)>-1;
        });
        response.json({
            success:true,
            data:res
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