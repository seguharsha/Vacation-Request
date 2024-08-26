const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes/itineraries");
const {requireAuth}=require('./middleware/AuthMiddleware');
const path=require('path');
const app = express();
const cookieParser=require('cookie-parser' )
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);
app.get('/homeAdmin',requireAuth,(req,res)=> { 
    res.sendFile(path.join(__dirname,'public','homeAdmin.html'))
        
});
app.get('/login',(req,res)=>{
        res.sendFile(path.join(__dirname,'public','login.html'))
});
app.get('/account',requireAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'public','account.html'))
});

app.get('/homeUser',requireAuth,(req,res)=>{
    res.sendFile(path.join(__dirname,'public','homeUser.html'))

});

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))

});

app.get('/protected', requireAuth, (req, res) => {
    const userId = req.user; 
    res.json(userId);
        console.log("from protected");
        console.log(userId);
});


const port=8080;
app.listen(port,()=>{
    console.log(`Server running in port ${port} visit http://localhost:${port}/`);
})
