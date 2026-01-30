import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
   email:{
    type:String,
    required:true,
    unique:true,
    
 },
 password:{
    type:String,
    required:true,
    minlength:6,
    
},
},
{timestamps:true

})
userSchema.pre('save',async function(){
    if(!this.isNew||this.id)
        return;
    try{
       const lastUser = await User
        .findOne({id:{$exists:true}})
        .sort({id:-1})
        .select('id')
        .lean();
        const lastId = lastUser?lastUser.id:'';
        let newIdUser = 1;
        if(lastUser &&  lastUser.id){
            const numericPart = parseInt(lastId.replace('U',''))
            if(!isNaN(numericPart)){
                newIdUser = numericPart + 1;
            }
            
        }
        const newId = 'U' + newIdUser.toString().padStart(3,'0');
        this.id = newId;


    }catch(err){
        console.log('Error has occurred', err);
        
}
})

userSchema.pre('save',async function(){
    if(!this.isModified('password')){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);


})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User',userSchema);
export default User;