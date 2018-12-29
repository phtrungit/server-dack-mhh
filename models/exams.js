
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schema=new Schema({
    id:{type:String,require:true},
    title:{type:String, require:true},
    creator:{type:String, require:true},
    subject:{type:String, require:true},
    time:{type:String, require:true},
    number:{type:Number, require:true},
    object:{type:String, require:true},
});
module.exports=mongoose.model('Exams',schema);
