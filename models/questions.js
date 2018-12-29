
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schema=new Schema({
    id:{type:String,require:true},
    examId:{type:String,require:true},
    text:{type:String, require:true},
    optionA:{type:String, require:true},
    optionB:{type:String, require:true},
    optionC:{type:String, require:true},
    optionD:{type:String, require:true},
    correctOption:{type:String, require:true},
    point:{type:String, require:true},
});
module.exports=mongoose.model('Questions',schema);
