const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        unique:true,
    },
    email:
    {
        type: String,
        required: [true, 'Email is required'],
        unique:true,
    },
    password:
    {
        type: String,
        required: [true, 'Password is required'],
        minlength:[8,'Password must be at least 8 characters']

    },
    tokens:{
      token:{
        type:String,
   
      }
    }

}, { timestamps: true });

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );


UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
      console.log("didnt match")
    }
    console.log(this.password,this.confirmPassword);
    next();
  });
  
UserSchema.pre('save', function(next) {
  console.log(' pre save')
  bcrypt.hash(this.password, 10)
    .then(hash => {
      console.log('in hash')
      this.password = hash;
      next();
    });
});
//tokens to verify user
UserSchema.methods.generateToken=async function(){
  try{
    let generatedToken=jwt.sign({_id:this._id}, process.env.JWT_SECRET);
    this.tokens=this.tokens.concat({token:generatedToken})
    await this.save();
    return generatedToken
  } catch(error) {
    console.log(error)
  }
}
module.exports = mongoose.model('User', UserSchema);

