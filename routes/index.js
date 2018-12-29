const express = require('express');
const app = express();
const indexRouter = express.Router();
const Questions = require('../models/questions');
const Exams = require('../models/exams');
const Student = require('../models/students');
const StudentExams = require('../models/studentExams');
const Teacher = require('../models/teachers');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
}))

app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 100000
}))


// -------------------- Tạo đề thi----------------
indexRouter.route('/createExam').post(function (req,res,next) {
    console.log('reqbodyCreateExam',req.body);
                const d =Date.now();
                const exam = new Exams({
                    id: 'EX'+req.body.creator+d,
                    title: req.body.tenDeThi,
                    creator: req.body.creator,
                    subject: req.body.subject,
                    time: req.body.time,
                    number:parseInt(req.body.soCauHoi) ,
                    object: req.body.object,
                })
                exam.save((err, savedExam) => {
                    if (err) return res.json(err)
                    res.json({exam: savedExam})
                })


})

// -------------------- Tạo câu hỏi----------------
indexRouter.route('/createQuestion').post(function (req,res,next) {
    console.log('reqbodyQuestion',req.body);
    const d =Date.now();
    const question = new Questions({
        id: 'QT'+req.body.examId+d,
        examId: req.body.examId,
        text: req.body.text,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
        correctOption: req.body.correctOption,
        point:parseInt(req.body.point)
    })
    question.save((err, savedQuestion) => {
        if (err) return res.json(err)
        res.json({question: savedQuestion})
    })


})

// -------------------- Lấy nội dung bài test giáo viên đã tạo bằng id của giáo viên ----------------
indexRouter.route('/selectExam').get(async (req, res) => {
    var id = req.query.id;
    let numberOfQuestion=[]
    await Exams.find({creator: id} ,async (err, serverports) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let i=0;i<serverports.length;i++)
            {
                await Questions.find({ examId: serverports[i].id }, function (err, data) {
                    if (err) {
                        numberOfQuestion[i]=0
                    }
                    else {
                        numberOfQuestion[i]=data.length
                    }
                })
            }
            console.log(numberOfQuestion)
            res.json({
                exam:serverports,
                numberOfQuestion:numberOfQuestion
            });
        }
    })
})

// -------------------- Lấy nội dung bài test bằng id ----------------
indexRouter.route('/getTestExam').get(function (req, res) {
    var id = req.query.id;
    console.log(id);
    Questions.find({ examId: id }, function (err, serverports) {
        if (err) {
            console.log(err);
        }
        else {
            Exams.find({ id: id }, function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    var result = {
                        data: serverports,
                        title: data
                    }
                    res.json(result);
                }
            })
        }
    });
});


//---------------------Cập nhật đáp án bài thi-----------------
indexRouter.route('/updateResultTest').post(async function (req, res) {
    const listAnswer=req.body.listAnswer.sort(req.body.listAnswer.id).reverse();
    const answerSheet=[];
    const resultSheet=[];
    let score=10;

    for (let i=0;i<listAnswer.length;i++)
    {
        answerSheet[i]=listAnswer[i].value
    }
    await Questions.find({ examId: req.body.idExam }, function (err, serverports) {
        if (err) {
            console.log(err);
        }
        else {
            for (let i=0;i<serverports.length;i++)
            {
                console.log('answer-result',answerSheet[i],serverports[i].correctOption)
                if(answerSheet[i]!==serverports[i].correctOption)
                {
                    score=score-1;
                    console.log('score',score);
                }


            }
        }
    });
    console.log('answerSheet',answerSheet)
    console.log('finalScore',score)
    const d =Date.now();
    const studentExam = new StudentExams({
        id: 'STE'+req.body.studentId+d,
        examId: req.body.idExam,
        studentId: req.body.studentId,
        score: score,

    })
    for (let i=0;i<answerSheet.length;i++)
    {
        studentExam.answerSheet[i]=answerSheet[i]
    }
    studentExam.save((err, savedstudentExam) => {
        if (err) return res.json(err)
        console.log(savedstudentExam);
        res.json({studentExam:savedstudentExam})
    })

})

//-----------Lấy đề thi---------------
indexRouter.route('/selectAllExam').get(async (req, res) => {
    let listExam=[]
    await Exams.find(async (err, serverports) => {
        if (err) {
            console.log(err);
        }
        else {
            for (let i=0;i<serverports.length;i++)
            {
                await Questions.find({ examId: serverports[i].id }, function (err, data) {
                    if (err) {

                    }
                    else {
                        if(data.length>0)
                            listExam.push(serverports[i])
                    }
                })
            }
            console.log(listExam)
            res.json(listExam)
        }
    })
})
//-----------Bảng xếp hạnh học sinh---------------
indexRouter.route('/selectStudentCharts').get((req, res) => {
    Student.find((err, chart) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(chart);
            res.json(chart);
        }
    }).sort( { point: -1 } );
})
//-----------Bảng xếp hạnh giáo viên---------------
indexRouter.route('/selectTeacherCharts').get((req, res) => {
    Teacher.find((err, chart) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(chart);
            res.json(chart);
        }
    }).sort( { point: -1 } );
})
//-----------Lấy danh sách bài thi giáo viên đã tạo---------------
indexRouter.route('/selectTeacherTestList').get((req, res) => {
    console.log(req.query.id);
    StudentExams.find({ examId: req.query.id }, function (err, list) {
        if (err) {
            console.log(err);
        }
        else {
            Student.find(function(err, chart){
                if (err) {
                    console.log(err);
                }
                else {
                    var array = [];
                    for (listItem in list){
                        for( chartItem in chart){
                            if(list[listItem].studentId === chart[chartItem].id){
                                list[listItem] = {
                                    examId: list[listItem].examId,
                                    score: list[listItem].score,
                                    id: chart[chartItem].id,
                                    username: chart[chartItem].username,
                                    displayName: chart[chartItem].displayName,
                                    idStudentExam:list[listItem].id
                                }
                                break;
                            }
                        }
                    }
                    res.json(list);
                }
            });
        }
    });
})
//-----------Lấy lịch sử làm bài của học sinh---------------
indexRouter.route('/selectstudenthistoryexam').get((req, res) => {
    console.log(req.query.id);
    StudentExams.find({ studentId: req.query.id }, function (err, list) {
        if (err) {
            console.log(err);
        }
        else {
            Exams.find(function(err, chart){
                if (err) {
                    console.log(err);
                }
                else {
                    var array = [];
                    for (listItem in list){
                        for( chartItem in chart){
                            if(list[listItem].examId === chart[chartItem].id){
                                list[listItem] = {
                                    examId: list[listItem].examId,
                                    score: list[listItem].score,
                                    title: chart[chartItem].title,
                                    id:list[listItem].id
                                }
                                break;
                            }
                        }
                    }
                    res.json(list);
                }
            });
        }
    });
})
// -------------------- Lấy nội dung bài thi cùa học sinh và đáp án bằng id ----------------
indexRouter.route('/detail-ex').get(async function (req, res) {
    var id = req.query.id;
    let examId='';
    let answer=[];
    let score=0;
    let creator='';
    let student='';
    let studentId='';
    console.log('idStudentEx',id);

    await StudentExams.findOne({ id: id }, function (err, studentExam) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('studentExam',studentExam);
            examId=studentExam.examId
            answer=studentExam.answerSheet
            score=studentExam.score
            studentId=studentExam.studentId
            console.log('answ',answer)
            console.log('exID',studentExam.id);
        }
    });
    await Student.findOne({ id: studentId }, function (err, student_g) {
        if (err) {
            console.log(err);
        }
        else {
           student=student_g.displayName
        }
    });
    console.log('exID',examId);
    Questions.find({ examId: examId },async function (err, serverports) {
        if (err) {
            console.log(err);
        }
        else {
            Exams.find({ id: examId },async function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    await Teacher.findOne({ id: data[0].creator}, function (err, teacher_g) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            creator=teacher_g.displayName
                        }
                    });
                    var result = {
                        data: serverports,
                        title: data,
                        answer:answer,
                        score:score,
                        student:student,
                        teacher:creator
                    }
                    res.json(result);
                }
            })
        }
    });
});
indexRouter.route('/login').post(function (req, res,next) {
    console.log(req.body);
    let user=null;
    Student.findOne({ 'username': req.body.username }, (err, userStudentMatch) => {
        if (err) {return}
        if (!userStudentMatch) {
            Teacher.findOne({ 'username': req.body.username }, (err, userTeacherMatch) => {
                if (err) {
                    return
                }
                if (userTeacherMatch && req.body.password==userTeacherMatch.password) {
                    console.log('userTeacherMatch')
                    user=userTeacherMatch
                    return res.json({user:user});
                }
            })

        }
        else if(req.body.password===userStudentMatch.password) {
            console.log('userStudentMatch')
            user=userStudentMatch
            return res.json({user:user});
        }
    })

});
indexRouter.route('/signup').post(function (req,res,next) {
    console.log('reqbodySignUp',req.body);
    if(req.body.role==='student')
    {
        Student.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: ${username}`
                })
            }
            else {
                const student = new Student({
                    id: 'ST'+req.body.username,
                    displayName: req.body.name,
                    mail: req.body.mail,
                    username: req.body.username,
                    password: req.body.password,
                    point: 0,
                    phone: req.body.phone,
                })
                student.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json({user:savedUser})
                })
            }
        })
    }else
    {
        Teacher.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                console.log('User.js post error: ', err)
            } else if (user) {
                res.json({
                    error: `Sorry, already a user with the username: `
                })
            }
            else {
                const teacher = new Teacher({
                    id: 'ST'+req.body.username,
                    displayName: req.body.name,
                    mail: req.body.mail,
                    username: req.body.username,
                    password: req.body.password,
                    point: 0,
                    certificate:'Thạc sĩ',
                    phone: req.body.phone,
                })
                teacher.save((err, savedUser) => {
                    if (err) return res.json(err)
                    res.json({user:savedUser})
                })
            }
        })
    }
})
module.exports = indexRouter