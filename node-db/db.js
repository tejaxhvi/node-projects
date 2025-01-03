const mongo = require('mongoose')


     mongo.connect('mongodb+srv://<admin>:<db-password>@cluster0.6sd2h.mongodb.net/todo-database')
       

const Schema = mongo.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    name : String,
    email : String,
    password : String
})

const Todos = new Schema({
    userId : ObjectId,
    title : String,
    done : Boolean
})

const UserModel = mongo.model('users',User);
const TodoModel = mongo.model('todos',Todos);

module.exports = {
    UserModel : UserModel,
    TodoModel : TodoModel
}