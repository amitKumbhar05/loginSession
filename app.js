import express from 'express'
import {userData} from './mongo.js'
import cors from 'cors'
// import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const app = express();
const port = 4000;


app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST'],
    credentials:true
}));
app.use(session({
    key:'user',
    secret:'amit123',
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:60 * 60 * 24,
    }
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.post('/login',async(req,res)=>{
    const {username,password} = req.body
    try {
        const data = await userData.findOne({username:username})
        if(data)
        {   
            if(data.password==password)
            {
                req.session.user = data
                res.json(req.session.user)
            }
            else
            {
                res.send("wrong password")
            }
        }
        else
        {
            res.send("user does not exists")
        }
    } catch (error) {
        console.error(error);
    }
})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err)
        {
            console.error(err);
        }
        else{
            res.sendStatus(200);
        }
    })
})

app.get('/login',(req,res)=>{
    if(req.session.user)
    {
        res.send({logged:true,user:req.session.user})
    }
    else
    {
        res.send({logged:false})
    }
})


app.listen(port,()=>{
    console.log(`Connected on port : ${port}`);
})