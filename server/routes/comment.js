const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");

// const { auth } = require("../middleware/auth");


router.post("/saveComment", (req, res) => {

    const comment = new Comment(req.body);
    
    comment.save((err, comment) => {
        if(err) return res.json({ success: false, err })

        //.save를 사용할 땐 .populate('writer')을 바로 사용할 수 없다
        
        Comment.find({'_id': comment._id}) // Comment 모델에서 아이디를 바로 찾기
            .populate('writer')
            .exec((err, result) => {
                if(err) return res.json({ success: false, err})
                res.status(200).json({ success: true, result })
            })
        })
    })



    router.post("/getComments", (req, res) => {

        Comment.find({'postId': req.body.videoId }) 
        .populate('writer')
        .exec((err, comments) => {
            if(err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
    
    })






    module.exports = router;