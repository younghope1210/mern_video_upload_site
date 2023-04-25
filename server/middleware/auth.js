const { User } = require('../models/User');


let auth = (req, res, next) => {


    //인증처리

    // 클라이언트단의 쿠키에서 토큰값을 가져온다

    let token = req.cookies.x_auth;


    // 가져온 토큰을 복호화한 후에 유저를 찾는다

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user)  return res.json({ isAuth: false, error: true })
    
    
        req.token = token;  // 토큰 정보를 가질수 있다
        req.user = user; // 유저 정보를 가질 수 있다

        next(); // 미들웨어를 통과한 페이지에서 다음 처리로 갈 수 있게 선언

    })



    // 유저가 있으면 인증처리

    // 찾는 유저가 없다면 인증처리 안 함


}

module.exports = { auth };