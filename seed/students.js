var Student = require ('../models/students');
var mongoose=require('mongoose');
var mongoDB = 'mongodb://admin:nhom01@ds227674.mlab.com:27674/dbdackmhh';
mongoose.connect(mongoDB);

var students =[
    new Student ({
        id:'ST0001',
        displayName:'student1',
        mail:'email1@xmail.com',
        username:'taikhoan1',
        password:'matkhau1',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0002',
        displayName:'student2',
        mail:'email2@xmail.com',
        username:'taikhoan2',
        password:'matkhau2',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0003',
        displayName:'student3',
        mail:'email3@xmail.com',
        username:'taikhoan3',
        password:'matkhau3',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0004',
        displayName:'student4',
        mail:'email4@xmail.com',
        username:'taikhoan4',
        password:'matkhau4',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0005',
        displayName:'student5',
        mail:'email1@xmail.com',
        username:'taikhoan5',
        password:'matkhau5',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0006',
        displayName:'student6',
        mail:'email6@xmail.com',
        username:'taikhoan6',
        password:'matkhau6',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0007',
        displayName:'student7',
        mail:'email7@xmail.com',
        username:'taikhoan7',
        password:'matkhau7',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0008',
        displayName:'student8',
        mail:'email8@xmail.com',
        username:'taikhoan8',
        password:'matkhau8',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0009',
        displayName:'student9',
        mail:'email9@xmail.com',
        username:'taikhoan9',
        password:'matkhau9',
        point:0,
        phone:'0909090909',
    }),
    new Student ({
        id:'ST0010',
        displayName:'student10',
        mail:'email10@xmail.com',
        username:'taikhoan10',
        password:'matkhau10',
        point:0,
        phone:'0909090909',
    }),
];
var done=0;

for(var i=0;i<students.length;i++)
{
    students[i].save(function(err,result){
        done++;
        if(done==students.length)
        {
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}