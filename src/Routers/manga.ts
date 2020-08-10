import {Request,Response,Router} from 'express';
import * as handler from '../Handlers/manga';
import * as Fs from 'fs'  ;
import {mangaList,searchResult} from '../Interfaces/manga';
import * as mangaEdenScrapper from '../Scrapper/mangaeden';
import * as kissMangaScrapper from '../Scrapper/kissmanga';
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
        
        // var res:mangaList={

        //     id:data.i,
        //     title:data.t,
        //     category:data.c,
        //     link:'getmangaURL'+data.i,
        //     thumbnail:'cdnURL'+data.im,
        //     lastChapterDate:data.ld
            
        // }
        
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
        await mangaEdenScrapper.search(query).then((data:searchResult[])=>{
            response.json({
                success:true,
                data:data
            });
        })
        .catch((err)=>{
            response.status(404).json({
                success:false,
                data:[]
            });
        });
    }

    if(sourceId==='1'){
        await kissMangaScrapper.search(query)
        .then((data:searchResult[])=>{
            response.json({
                success:true,
                data:data
            });
        })
        .catch((err)=>{
            response.status(404).json({
                success:false,
                data:[]
            });
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
router.get('/chapter/list/:sourceId/:mangaId',async(request:Request,response:Response)=>{
    const mangaId = request.params.mangaId;
    const sourceId = request.params.sourceId;
    if(sourceId==='0'){
        await handler.mangaEdenChapterList(mangaId)
        .then((data)=>{
            response.json({
                success:true,
                data:data.data.chapters
            });
            
        })
        .catch((e)=>{
            response.status(404).json({
                success:false,
                error:'NOT Found',
                message:'check mangaId'
            })
        });
    }
    
});
router.get('/chapter/image/:sourceId/:chapterId',async(request:Request,response:Response)=>{
    const chapterId = request.params.chapterId;
    const sourceId = request.params.sourceId;
    if(sourceId==='0'){
        await handler.getChapter(chapterId)
        .then((data)=>{
            response.json({
                success:true,
                data:data.data.images
            });
        })
        .catch((e)=>{
            response.status(404).json({
                success:false,
                error:'NOT Found',
                message:'check chapterId'
            });
        });
    }
});

//get all resources
router.get('/sources',async(request:Request,response:Response)=>{
    response.json(sources);
});


export default router;

