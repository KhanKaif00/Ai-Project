import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: [6, 'Email must be at least 6 characters long'],
        maxLength:[50, 'Email must be at most 50 characters long']
    },
    password: {
        type: String,
        select: false,  // password will not be returned in the response
    },


})

userSchema.statics.hashPassword = async function(password){
        return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function(password){
    console.log(password, this.password)
    return await bcrypt.compare(password, this.password)
    
    


    //The keyword this refers to the specific user document (instance of User) on which this method is called.When you call user.isValidPassword(password), this.password refers to the password stored in the database for that particular user.
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({email: this.email},
         process.env.JWT_SECRET,
         { expiresIn: '24h' })
}


const User = mongoose.model('User', userSchema);

export default User;
