const con = require('./config/db')
let form = require('./routes/form')
let index = require('./routes/index')
const express = require("express");
const app = express();
const PORT = 4000;
const path = require("path");
const router = express.Router();
const multer=require('multer');
const cloudinary=require('cloudinary');
const session = require('express-session');
const flash=require('connect-flash');



// to set the view engine
// app.set("view engine", "hbs");
// app.set('views',path.join(__dirname,'views'));
// app.use(express.static(path.join(__dirname,'public')));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

let filestorage=multer.diskStorage({
  filename:(req,file,cb)=>{

      cb(null,new Date().toISOString()+'-'+file.originalname);
}});
const upload=multer({storage:filestorage});
cloudinary.config({
cloud_name:'dkhk4gyey',
api_key:'459656749761335',
api_secret:'AS_y6ZzH7FAjeoIxF1IjtMFKzQg'
});
app.use(express.json());
app.set("view engine", "hbs");
app.set('views',path.join(__dirname,'views'));
app.use('/images',express.static('images'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.update_msg = req.flash('update_msg');
  res.locals.delete_msg = req.flash('delete_msg');
  next();
});

app.use(multer({storage:filestorage}).single('images'));
app.use('/',index)
app.use('/', router);
app.use('/',form);

app.listen(PORT, () => {
  console.log(`The server is started on ${PORT}`);
});





