let express=require('express');
let router=express.Router();
let app = express();
let {insertCarData,deleteCarData,editCarData}=require('../methods/form')

router.post('/car/data',(req,res)=>{
    insertCarData(req,res);
});


router.get('/:carName',(req,res)=>{
    deleteCarData(req,res);
});

router.post('/edit/:carName',(req,res,next)=>{
    editCarData(req,res);
});
 


 module.exports=router;
  