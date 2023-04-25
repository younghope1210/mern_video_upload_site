import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {auth} from '../_actions/user_actions';
import { useNavigate } from 'react-router-dom';


// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, option, adminRoute = null) {


    function AuthenticationCheck(props){

        const navigate = useNavigate();
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
        
            dispatch(auth()).then(response => {

                //로그인하지 않은 상태

                if(!response.payload.isAuth){
                    if(option){
                        navigate("/login");
                    }
                }else {

                      // 로그인한 상태

                //1.admin이 아닌 유저

                if(adminRoute && !response.payload.isAdmin){
                    navigate("/");
            //2. 로그인한 유저가 출입할 수 없는 페이지(회원가입, 로그인 페이지등)

                } else {
                    if(option === false) {
                        navigate("/");
                    }
                }

                }

            })

        }, [dispatch, navigate])
        

        return (
            <SpecificComponent {...props} user={user} />
        )

    }


    return AuthenticationCheck

}