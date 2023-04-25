import React, {useState} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import SingleComment from './SingleComment';
// import ReplyComment from './ReplyComment';
import './Comment.css';



function Comment(props){

   // 리덕스 안의 state에서 user 정보 가져옴
    const user = useSelector(state => state.user); 

    // props로 videoId 가져온다
    const { videoId } = useParams();

    const [CommentValue, setCommentValue] = useState("")
    
    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    //코멘트 전송 

    const onSubmit = (e) => {
        e.preventDefault();


        const variableComment = {
            content: CommentValue,
            writer: user.userData._id, // 리덕스 안의 state에서 user 정보 가져옴
            postId: videoId
        }


        axios.post('/api/comment/saveComment',variableComment ) 
            .then(response => {
                if(response.data.success){
                    // setcommentValue(response.data.result);
                    setCommentValue("")
                    props.refreshFunction(response.data.result)
                }else{
                    alert('코멘트를 저장하지 못했습니다')
                }
            })

    }


  return (
    <div>
        <h3 style={{borderBottom:'3px solid #ddd', padding:'30px 0 10px 0'}}>💬 Replies </h3>    
          

           {/* Comment Lists */}
           {props.commentLists && props.commentLists.map((comment, index) => (
              (!comment.responseTo && 
                <div key={index}>  
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                    {/* <ReplyComment refreshFunction={props.refreshFunction}  parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} /> */}
                </div> 
                )
     
           ))}
                 
           
               

           {/* Root Comment Form */}

            <form style={{ display:'flex', marginTop:'10px'}} onSubmit={onSubmit} >

                <textarea
                    style={{ width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={CommentValue}
                    placeholder="로그인한 회원만 작성 가능합니다"
                > 
               
                </textarea>
                <Button
                    style={{ width:'20%', height:'52px'}}
                    onClick={onSubmit}
                >
                    코멘트입력
                </Button>
            </form>
           

    </div>
  )
}

export default Comment