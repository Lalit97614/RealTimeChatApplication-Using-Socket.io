import mongoose from "mongoose";
 const  userSchema = mongoose.Schema({
    fullname:{
        required:true,
        type:String,
        trim:true,
        minlength:3,
        maxlength:30
    },
    email:{
        required:true,
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
         required:true,
         trim:true,
         minlength:6,
    },
    profilePic:{
        type:String,
        default:"",
    }
},
{
    timestamps:true
}
)
const User = mongoose.model("User",userSchema);
export default User;
