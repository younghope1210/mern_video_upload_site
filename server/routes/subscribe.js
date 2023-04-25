const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber");


//=================================
//             Subscribe
//=================================


router.post("/subscribeNumber", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo })
    .exec((err, subscribe) => { // userTo를 구독하는 모든 케이스정보가 들어감
        if(err) return res.status(400).send(err)
//subscribeNumber: subscribe.length = 구독한 구독자 수
        res.status(200).json({ success: true, subscribeNumber: subscribe.length  })
    })

});

// 구독버튼 처리

router.post("/subscribed", (req, res) => {

    Subscriber.find({ "userTo": req.body.userTo , "userFrom": req.body.userFrom })
    .exec((err, subscribe) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(subscribe.length !== 0) { // 구독자 수가 0이 아니라면
            result = true
        }

        res.status(200).json({ success: true, subscribed: result  })
    })

});


// 구독 신청
router.post("/subscribe", (req, res) => {

    const subscribe = new Subscriber(req.body);

    subscribe.save((err, doc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

// 구독 취소
router.post("/unSubscribe", (req, res) => {

    console.log(req.body)

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc)=>{
            if(err) return res.status(400).json({ success: false, err});
            res.status(200).json({ success: true, doc })
        })
});





module.exports = router;