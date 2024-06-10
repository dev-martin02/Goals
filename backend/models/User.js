const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

//Run the function before save it in the database!!
userSchema.pre('save', async function (next){
  // what does the genSalt do?
  const salt = await bcrypt.genSalt()
  // hash(currentPassword, lengthPassword?)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//Create static method
userSchema.statics.login = async function(email,pass){
  const user = await this.findOne({ email });
  if(user){
    const comparePassword = await bcrypt.compare(pass, user.password)    
    if(comparePassword){
      return user
    }
    throw Error('Incorrect Password') 
 }
  throw Error('Incorrect Email')
  
}

const User = model("User", userSchema);
module.exports = User;


/* 
Mongoose provide us some hooks which allows us to play with the data for example we got the two
 - pre(next) -> Middleware which is going ot allow us to play with the data before we send it
 - post(doc, next) -> middleware which allow us to play with data after we save it 

 
 - What is the validator package? 
 */
