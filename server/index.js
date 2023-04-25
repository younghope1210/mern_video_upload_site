const express = require('express');
const app = express();
const config = require('./config/key');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const path = require("path");
const cors = require('cors');



// ===================================connect our db==================================


const mongoose = require("mongoose");

mongoose.set('strictQuery', false); // 몽구스 연결시 에러날 때 넣어줌

mongoose.connect(config.mongoURI)
.then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


// =========================================================================================


app.use(cors())

// x-www-form-urlencoded같은 파일을 분석
app.use(bodyParser.urlencoded({ extended: true }));

// json 타입을 분석해서 가져온다
app.use(bodyParser.json());

// 쿠키파서에 데이터 저장

app.use(cookieParser());


// ===================================라우트 페이지로 넘김==================================

app.use('/api/video', require('./routes/video'));
app.use('/api/user', require('./routes/user'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));



// // 이미지 업로드시 필요!
// app.use('/uploads', express.static('uploads')); 





// ===================================빌드하고 배포하면 빌드 경로로 연결=================================

// express에서 라우팅 설정은 해당하는 엔드포인트가 나타나면 그 요청이 적용되고 나머지가 무시되기 때문에 하단에 선언!

if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "../client/build"))); // 빌드된 정적파일 경로

    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

 }


const port = process.env.PORT || 5000



//서버연결

app.get('/', (req, res) => res.send('반가워!'))
app.listen(port, () =>  console.log(`Example app listening on port ${port}`))

// test

// app.get('/api/hello', (req,res) => {
    
//     res.send("안녕")
// })