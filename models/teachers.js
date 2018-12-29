
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var schema=new Schema({
    id:{type:String,require:true},
    displayName:{type:String, require:true},
    mail:{type:String, require:true},
    username:{type:String, require:true},
    password:{type:String, require:true},
    point:{type:Number, require:true},
    certificate:{type:String},
    phone:{type: String},
});
module.exports=mongoose.model('Teachers',schema);
