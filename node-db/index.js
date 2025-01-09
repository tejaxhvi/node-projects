const bcrypt = require("bcrypt")
const express = require('express')
const app = express()
const z = require('zod')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "lordtejashvi"

app.use(express.json())

const { UserModel , TodoModel} = require('./db')

// app.use(express.static('frontend'))  //this will the static files on server but i don't want  , i want different static frontend on each diff routes of express 

app.post('/signup', async function (req,res) {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // This is zod provided validating schema 
   
    const UsersInfo = z.object({
        name : z.string().min(3, { message: "Must be 3 or more characters long" }).max(10),
        email : z.string().email({message: "This is incorrect Email"}).max(20,{message: "Email is too Long"} ) , 
        password : z.string().min(3,{message : "Password is too short"}).max(20 , {message: "Password is too long"})
    })

    const ParsedUsersInfo = UsersInfo.safeParse(req.body);
    if(!ParsedUsersInfo.success ){
        res.json({
            message : "Incorrect credentials",
            error : ParsedUsersInfo.error            // this response will give all info if any individual input field is incorrect
        })
        ParsedUsersInfo.error.errors.forEach((err) => {
            console.log(`Field: ${err.path[0]}, Message: ${err.message}`) 
             // This is best way to show where the problem in UsersInfo and show it on frontend
        })
    }
    else{
        try { // this try catch will save server to crash when user already exists
            const hashpassword =  await bcrypt.hash(password , 5)
            // console.log(hashpassword); // it should declare before database call either it throws error

            await UserModel.create({ // this is db call which may be fail , so it's good to make it promise
            email : email,
            name : name , 
            password : hashpassword 
            })
                // if this database call not in else function then this store the UsersInfo in db even if it's false

                //this response is imp else the frontend request keep going
            res.json({ 
                message : "You are signed up"
            })
            //console.log("user signed up");
              
        } catch (error) {
            res.json({
                message: "User already exists"
            })
        }
    }
})

app.post('/login', async function (req,res) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email : email
    })

    const HashedCompare = bcrypt.compare(password , user.password)
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
