var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fileUpload = require('express-fileupload'); 
var productRouter = require('./routes/product-route')
var userRouter = require('./routes/user-route');
var transactionRouter = require('./routes/user-route');
require("dotenv").config();
var app = express();
app.use(express.json());


const corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",};
app.use(cors(corsOptions));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('../online_shop/public'));
app.use(express.static('../online_shop/src/images/productsImage'));




const randomNumber = (n)=>{
let randomImageName = '';  
const characters = '0123456789';  
const charactersLength = characters.length;  
for (let i = 0; i < n; i++) {  
    randomImageName += characters.charAt(Math.floor(Math.random() * charactersLength));  
}  
return randomImageName;
}
app.use(fileUpload()); 
 
app.post('/upload', (req, res) => { 
    if (!req.files || !req.files.file) { 
        return res.status(400).send('فایلی انتخاب نشده است.'); 
    } 
 
    const file = req.files.file; 
    const arr = file.name.split('.');
    const fileName = randomNumber(32) + '.' + arr[1];
    const uploadPath = path.join(__dirname, '../online_shop/src/images/productsImage', fileName); 
 
    file.mv(uploadPath, (err) => { 
        if (err) { 
            return res.status(500).send('خطا در ذخیره فایل.'); 
        } 
 
        res.send(JSON.stringify(fileName)); 
    }); 
}); 
 









// go to routes 

app.use('/api/product/', productRouter);
app.use('/api/user/', userRouter);
app.use('/api/transaction/', transactionRouter);










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(process.env.PORT,(req,res)=>{
  console.log("listenning to port " + process.env.PORT);
})

module.exports = app;
