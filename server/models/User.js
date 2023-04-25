const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const moment = require('moment');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
   
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function (next) {
// idnex.js에서 const user = new User(req.body)를 선언했기 때문에 사용가능
   
    var user = this;


// 몽구스에서 지원하는 메소드 pre를 통해 비밀번호를 암호화한뒤
// 레지스터 라우터로 암호화된 비밀번호를 보낸다
//  pre = 몽구스 메소드로 어떤 처리를 하기 전에 가로채서 다른 일을 한 후 넥스트로 보낸다
//현재 프로젝트에서는 save 처리를 하기 전에 사용


//*****************비밀번호를 암호화 시킨다.******************

if (user.isModified('password')) { // 비밀번호를 수정할 시에
    console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) { // genSalt(saltRounds => 비밀번호를 만들때 saltRounds가 필요하다
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) { //hash = 암호화된 비번
            if (err) return next(err); // 실패면 next
            user.password = hash // 비밀번호 암호화를 성공했으면 user의 password에 대입
            next() // 비번 암호화 후 next
        })
    })
} else {
    next()
}
});




//*****************로그인***********************

userSchema.methods.comparePassword = function(plainPassword, cb){
    // plainPassword = 1234567 등의 순수 비번을 암호화 시켜서 db의 암호화된 비번과 비교해야한다

    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err) // 비밀번호 비교 후 같지 않으면 콜백 에러를 뿌림
        cb(null, isMatch) // 비밀번호가 같으면 에러는 없고 isMatch = true
    })

}

// 토큰 생성하기 
//generateToken -> 라우터 페이지에서 받음
userSchema.methods.generateToken = function(cb) {
    
    var user = this;

    //jsonwebtoken을 이용해서 token을 생성한다
    
    // user._id + secretToke = token 토큰은 이런 로직으로 생성됨

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //jwt.sign에서 받을 때 userid를 플레인 오브젝트로 받고 싶다고 요청을한다.
    //toHexString을 사용해서 플레인 오브젝트로

    user.token = token; // 유저스키마의 토큰에 생성된 토큰을 넣어준다
    user.save(function(err, user){ // 그리고 save 시킨다
        if(err) return cb(err)
        cb(null, user) // 토큰생성에 성공했다면 에러는 null, user 정보만 전달

    })

}


// 인증처리


userSchema.statics.findByToken = function(token, cb){
    
    var user = this;


    //토큰을 복호화 decode

    jwt.verify(token,'secretToken', function(err, decoded){

        //유저 아이디를 이용하여 유저를 찾은 후
        //클라이언트에서 가져온 token과 DB에 보관된 토큰일 일치하는지 확인


    user.findOne({ "_id": decoded, "token": token }, 
        function (err, user) {
            if (err) return cb(err);
            cb(null, user);
       })
    })
}


const User = mongoose.model('User', userSchema);

module.exports = { User }