var Exams = require ('../models/exams');
var mongoose=require('mongoose');
var mongoDB = 'mongodb://admin:nhom01@ds227674.mlab.com:27674/dbdackmhh';
mongoose.connect(mongoDB);

var exams =[
    new Exams ({
        id:'EX0001',
        title:'Bài thi toán cao cấp 01',
        creator:'TC0001',
        subject:'Toán',
    }),
];
var done=0;

for(var i=0;i<exams.length;i++)
{
    exams[i].save(function(err,result){
        done++;
        if(done==exams.length)
        {
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}