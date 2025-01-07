const bcrypt = require("bcrypt")
const express = require('express')
const app = express()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "lordtejashvi"

app.use(express.json())

const { UserModel , TodoModel} = require('./db')

// app.use(express.static('frontend'))  //this will the static files on server but i don't want  , i want different static frontend on each diff routes of express 

app.post('/signup', async function (req,res) {
     
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashpassword =  await bcrypt.hash(password , 5)

    await UserModel.create({ // this is db call which may be fail , so it's good to make it promise
        name : name , 
        email : email,
        password : hashpassword 
    })
    console.log(hashpassword);
    
    
    res.json({
        message : "You are Signed up"
    })
})

app.post('/login', async function (req,res) {
    const email = req.body.email;

    const user = await UserModel.findOne({
        email : email,
    })

    const HashedCompare = bcrypt.compare(hashpassword , user.password)
    if(HashedCompare){
        const token = jwt.sign({
            id : user._id
        }, JWT_SECRET)
     }
    else{
        res.json({
            message : "Incorrect credentials"
        })
    }

})

app.get('/users',async function(req,res){ 


    res.sendFile(__dirname + "/frontend/users.html") // for now this works as routing bcz i can't understand routing in html maybe there isn't 
    
    const UsersData = await UserModel.find();

    res.json({UsersData})
})


app.get('/user',async function(req,res){  // backend part

    const UsersData = await UserModel.find();

    res.json({UsersData}) // for now this works as routing bcz i can't understand routing in html maybe there isn't 
})


app.post('/todo',function (req,res) {
    const token = req.body.token;
    
    const verify = jwt.verify(token, JWT_SECRET)

    if(verify){

        
    }
})

app.get('/todos',function (req,res) {
    
})


app.listen(3000)
