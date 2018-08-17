const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
const bcryptNode = require("bcrypt-nodejs")


const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        index: {unique: true}
    },
    email:{
        type: String,
        required: true,
        index: {unique: true}
    },
    password:{
        type: String,
        required: true
    }
 
})

userSchema.pre('save', function(next){
    const user=this;
    if(!user.isModified('password')){
        return next()
    }
    bcryptNode.genSalt (10, function (err,salt) {
        if(err)return next(err)

        bcryptNode.hash(user.password, salt, null, function (err,hash) {
            if(err) return next(err);
            user.password=hash;
            next();
        })
    })
    
});
userSchema.methods.validatePassword = function(candidatePassword){
    return new Promise ((resolve, reject)=>{
        bcrypt.compare(candidatePassword, this.password, (err,isMatch)=>{
            if (err) return reject(err);
            resolve(isMatch)
        })
    })
}

const User = mongoose.model("User", userSchema)
module.exports = User;
