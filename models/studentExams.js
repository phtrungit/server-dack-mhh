var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schema=new Schema({
    id:{type:String,require:true},
    examId:{type:String,require:true},
    studentId:{type:String,require:true},
    score:{type:Number, require:true},
    answerSheet:[{type:String,require:true}],
});
module.exports=mongoose.model('studentExams',schema);