var Questions = require ('../models/questions');
var mongoose=require('mongoose');
var mongoDB = 'mongodb://admin:nhom01@ds227674.mlab.com:27674/dbdackmhh';
mongoose.connect(mongoDB);

var questions =[
    new Questions ({
        id:'QT0001',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0002',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0003',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0004',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0005',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0006',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0007',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0008',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0009',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
    new Questions ({
        id:'QT0010',
        examId:'EX0001',
        text:'Gía trị của biểu thức x=...+y/abs(z)',
        point:0.5,
    }),
];
var done=0;

for(var i=0;i<questions.length;i++)
{
    questions[i].save(function(err,result){
        done++;
        if(done==questions.length)
        {
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}