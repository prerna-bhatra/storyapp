const mongoose=require("mongoose")
const Schema = mongoose.Schema;


const Story=mongoose.model('Story',
{

    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        /*
     here you set the author ID from the Author colection,so you can reference it
        */
    },
    descr: {
        type:String,
       required:true
    },
    title: {
        type: String,
       required:true
    },
    coverpic: {
        type:String,
       required:true
    },
    likes:
    {
        type:Number,
        default:0
    },
     Dislikes:
    {
        type:Number,
        default:0
    },
     Views:
    {
        type:Number,
        default:0
    },
   
  date: {
    type: Date,
    default: Date.now
  }
   //we will make another model for comments 
})

/*
const task=new Task({
    desc:"Learn mongoose",
    comp:false
})
*/
module.exports=Story







