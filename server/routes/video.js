const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
// 이미지 저장 처리
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

require('dotenv').config()

// 클라우드너리 사용

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


      const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: "samples",
          format: 'mp4',
          resource_type: 'video'
        },
      });
        
      const upload = multer({ storage: storage }).single("file")





    // 비디오 서버에 전송


      router.post("/uploadfiles", (req, res) => {

        upload(req, res, err => {
            if (err) {
                return res.json({ success: false, err })
            }
            return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
        })
    
    });

// 썸네일
// 클라우디너리에서는 업로드한 동영상 파일 확장자(mp4)를 jpg로  기능을 지원해서 이미지 파일도 가져올 수 있다

    router.post("/thumbnail", (req, res) => {

        let thumbnail = req.body.filePath // 동영상 주소를 thumbnail 변수에 담아주기
        thumbsFilePath = thumbnail.replace('mp4', 'jpg'); // mp4 확장자를 jpg로 변경해서 filepath 주소를 변경한다
       
        upload(req, res, err => {
            if (err) {
                return res.json({ success: false, err })
            }
            return res.json({ success: true, thumbsFilePath: thumbsFilePath}) // 동영상 파일에서 이미지파일로 변경된 썸네일 주소 클라이언트에 보내주기
        })
       
     
    });




// 비디오 DB에 저장
    

router.post("/uploadVideo", (req, res) => {

        const video = new Video(req.body) // Vodeo 모델 스키마 넣어주기
    
        video.save((err, video) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({
                success: true 
            })
        })
    
    });


// DB에 저장한 비디오 모든 정보 가져오기 
// DB에 저장된 상품을 랜딩 페이지에 가져오기

router.post('/getVideos', (req,res) => {

    // Video collection에 들어있는 상품 가져오기
   // parseInt = string인 경우 number로 바꿔준다

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip= req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;

// 서치창에 검색한 값이 있다면?

    if(term) {

        Video.find() //Video models에서 찾음

        .find({ $text: { $search: term }}) // **서치창에 검색한 값이 있다면 find 실행**

        .populate("writer") // 등록한 사람의 모든 정보를 가져온다
        .skip(skip)
        .limit(limit)
        .exec((err, videoInfo) => { //.exec =  쿼리를 돌린다
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ 
                success: true, videoInfo,
                postSize: videoInfo.length 
            })
        })


// 서치창에 검색한 값이 없다면?

    } else{

        Video.find() //Video models에서 찾음
        .populate("writer") // 등록한 사람의 모든 정보를 가져온다
        .skip(skip)
        .limit(limit)
        .exec((err, videoInfo) => { //.exec =  쿼리를 돌린다
            if(err) return res.status(400).json({ success: false, err})
            return res.status(200).json({ 
                success: true, videoInfo,
                postSize: videoInfo.length 
            })
        })

    }

})

// 몽고디비에 저장된 각각의 비디오값을 ID를 사용해서 각각의 페이지로 전달


router.post("/getVideoDetail", (req, res) => {

    Video.findOne({ "_id" : req.body.videoId }) // 하나의 ID값이기 때문에 findOne을 사용
    .populate('writer')
    .exec((err, videoDetail) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, videoDetail})
    })
});


// 구독한 페이지에서 동영상 정보 가져오기

router.post("/getSubscriptionVideos", (req, res) => {

 // 자신의 아이디를 가지고 구독한 사람들을 찾는다

 Subscriber.find({ userFrom:req.body.userFrom })
    .exec((err, subscriberInfo ) => {
        if(err) return res.status(400).send(err);

            let subscribedUser = [];

        subscriberInfo.map((subscriber, i) => {
            subscribedUser.push(subscriber.userTo);
        })

 // 찾은 사람들의 비디오를 가지고 온다
 Video.find({ writer: { $in:subscribedUser } })
    .populate('writer')
    .exec((err, videos) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, videos})
    })

    })
});




module.exports = router;