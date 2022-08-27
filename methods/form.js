const con = require("../config/db");
const cloudinary=require('cloudinary');
const flash = require('connect-flash');
insertCarData=(req, res) => {
    //let filename=new Date().toISOString()+'-'+req.file.originalname ;
    cloudinary.v2.uploader.upload(req.file.path).then((image)=>{
    let {carName,carPrice,carFuelType,seatingCapacityNo,colours}=req.body;
    let sql='insert into carlistdata set ?';
    let body={carName:carName,carPrice:carPrice,carImage:image.secure_url,carFuelType:carFuelType,seatingCapacityNo:seatingCapacityNo,colours:colours};
    con.query(sql,body,(err,result)=>{
     if(!err)
     {
        req.flash('success_msg','Car Data inserted')
         res.redirect('/form');
     }
     else
     {
         return res.status(400).json({
             msg:'error occured',
             error:err
            });
        
     }
    });
    });
 };

 deleteCarData=(req,res)=>{
    var carName = req.params.carName;
    console.log(carName);
    let sql=`DELETE FROM carlistdata WHERE carName=?`;
    let body = [carName]
    con.query(sql,body,(err,data)=>{
        if(err){
            throw err;
        }
        else{
            req.flash('delete_msg','Car Data deleted')
            res.redirect('/form');
        }
    });
};

editCarData= (req,res,next)=>{
    let {carName}=req.body;
    let {carPrice,carFuelType,seatingCapacityNo,colours,}=req.body;
    let sql='update carlistdata set carPrice=?, carFuelType=?, seatingCapacityNo=?, colours=? where carName=?';
    let body=[carPrice,carFuelType,seatingCapacityNo,colours,carName];
    con.query(sql,body,(err,result)=>{
        if(!err)
        {
            req.flash('update_msg','Car Data Updated')
            res.redirect('/form');
            
        }
        else
        {
            return res.status(400).json({
                msg:'error occured',
                error:err
            });
        }
    });
};



module.exports={insertCarData,deleteCarData,editCarData};

