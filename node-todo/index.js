const express = require('express')
const app = express()
const z = require('zod')
const jwt = require('jsonwebtoken')


const users = []
app.use(express.json())
app.use(function (req, res) {
    if(localStorage.getItem('token') === token){

    }
})
app.post('/signup',function (req , res ) {

    // const user = document.getElementbyId('username_signup').value
    // const pass = document.getElementbyId('username_signup').value

    const user_signup = req.body.username;
    const pass_signup = req.body.password;

   
     const username = z.string().min(4)      
     const password = z.string().min(4)
    
    const usernameParse = username.safeParse(user_signup)
    const passwordParse = password.safeParse(pass_signup)
   console.log(usernameParse.success);
   console.log(passwordParse.success);
   
    

    res.json({
        message : "done"
    })

})

app.listen(3001)