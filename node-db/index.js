const express = require('express')
const app = express()
const zod = require('zod')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "lordtejashvi"

app.use(express.json())

const { UserModel , TodoModel} = require('./db')

app.post('/signup', async function (req,res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    await UserModel.create({ // this is db call which may be fail , so it's good to make it promise
        name : name , 
        email : email,
        password : password 
    })
    
    
    res.json({
        message : "You are Sign-uped"
    })
})

app.get('/users',async function(req,res){ // this the db call to show all the users on the frontend which are registered in the database
    const UsersData = await UserModel.find();
    res.json(UsersData)
    console.log(UsersData);
    
})
app.post('/login', async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email,
        password : password
    })
    
    
    if(user){
        const token = jwt.sign({
            id : user._id
    }, JWT_SECRET)


        res.json({
            token
        })
    }
    else{
        res.json({
            message : "Incorrect credentials"
        })
    }
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
