var StudentExams = require ('../models/studentExams');
var mongoose=require('mongoose');
var mongoDB = 'mongodb://admin:nhom01@ds227674.mlab.com:27674/dbdackmhh';
mongoose.connect(mongoDB);

var studentExams =[
    new StudentExams ({
        id:'STE0001',
        examId:'EX0001',
        studentId:'ST0001',
        score:10,
        answerSheet:["A","B","C","D","A","A","A","A","A","A"],
    }),
    new StudentExams ({
        id:'STE0002',
        examId:'EX0001',
        studentId:'ST0002',
        score:10,
        answerSheet:["A","B","C","D","A","A","A","A","A","A"],
    }),
    new StudentExams ({
        id:'STE0003',
        examId:'EX0001',
        studentId:'ST0003',
        score:10,
        answerSheet:["A","B","C","D","A","A","A","A","A","A"],
    }),
    new StudentExams ({
        id:'STE0004',
        examId:'EX0001',
        studentId:'ST0004',
        score:10,
        answerSheet:["A","B","C","D","A","A","A","A","A","A"],
    }),
    new StudentExams ({
        id:'STE0005',
        examId:'EX0001',
        studentId:'ST0005',
        score:10,
        answerSheet:["A","B","C","D","A","A","A","A","A","A"],
    }),
];
var done=0;

for(var i=0;i<studentExams.length;i++)
{
    studentExams[i].save(function(err,result){
        done++;
        if(done==studentExams.length)
        {
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}