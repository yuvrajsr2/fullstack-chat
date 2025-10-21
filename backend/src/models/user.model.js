import mongoose from 'mongoose';

// Schema for user model
// showing the structure of the data for the user in the database
const userSchema = new mongoose.Schema({
    email:{
        type: String, 
        required:true, 
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },

    profilePic:{
        type:String,
        default:"",
    },
}
, {timestamps:true}

);

// Creating a model from the schema
const User = mongoose.model('User', userSchema);
export default User;