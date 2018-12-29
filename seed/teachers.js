var Teacher = require ('../models/teachers');
var mongoose=require('mongoose');
var mongoDB = 'mongodb://admin:nhom01@ds227674.mlab.com:27674/dbdackmhh';
mongoose.connect(mongoDB);

var teachers =[
    new Teacher ({
        id:'TC0001',
        displayName:'Teacher1',
        mail:'email1@xmail.com',
        username:'taikhoan1',
        password:'matkhau1',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0002',
        displayName:'Teacher2',
        mail:'email2@xmail.com',
        username:'taikhoan2',
        password:'matkhau2',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0003',
        displayName:'Teacher3',
        mail:'email3@xmail.com',
        username:'taikhoan3',
        password:'matkhau3',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0004',
        displayName:'Teacher4',
        mail:'email4@xmail.com',
        username:'taikhoan4',
        password:'matkhau4',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0005',
        displayName:'Teacher5',
        mail:'email1@xmail.com',
        username:'taikhoan5',
        password:'matkhau5',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0006',
        displayName:'Teacher6',
        mail:'email6@xmail.com',
        username:'taikhoan6',
        password:'matkhau6',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0007',
        displayName:'Teacher7',
        mail:'email7@xmail.com',
        username:'taikhoan7',
        password:'matkhau7',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0008',
        displayName:'Teacher8',
        mail:'email8@xmail.com',
        username:'taikhoan8',
        password:'matkhau8',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0009',
        displayName:'Teacher9',
        mail:'email9@xmail.com',
        username:'taikhoan9',
        password:'matkhau9',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
    new Teacher ({
        id:'TC0010',
        displayName:'Teacher10',
        mail:'email10@xmail.com',
        username:'taikhoan10',
        password:'matkhau10',
        point:0,
        certificate:'Thạc sĩ',
        phone:'0909090909',
    }),
];
var done=0;

for(var i=0;i<teachers.length;i++)
{
    teachers[i].save(function(err,result){
        done++;
        if(done==teachers.length)
        {
            exit();
        }
    });
}
function exit()
{
    mongoose.disconnect();
}