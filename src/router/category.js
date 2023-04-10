import express from 'express';
import { get,getAll,updata,remove,create } from '../controller/category';
import { checkPermission } from '../middlewares/checkPermission';

const router = express.Router();

router.get('/category',getAll);
router.get('/category/:id',get);
router.post('/category',checkPermission,create);
router.put('/category/:id',checkPermission,updata);
router.delete('/category/:id',checkPermission,remove);

export default router;
