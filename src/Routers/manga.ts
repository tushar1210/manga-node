import {Request,Response,Router} from 'express';
import {scrapper as mangasee123Scrapper} from '../Scrapper/mangasee123';
const router = Router();

const sources={
    0:"https://mangasee123.com"
}

router.get('/:mangaId/hot-updates',async(request:Request, response:Response)=>{
    var mangaId = request.params.mangaId.toString();

    if(mangaId=='0'){
        var results= await mangasee123Scrapper.hotUpdates();

    }

});


export default router;

