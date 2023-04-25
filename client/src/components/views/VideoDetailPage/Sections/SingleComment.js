import React,{ useState } from 'react';
import { Button } from 'antd';
//import 'antd/dist/reset.css';
// const { TextArea } = Input;
import axios from 'axios';
import { useSelector } from 'react-redux';


function SingleComment(props) {


const user = useSelector(state => state.user); 

const [OpenReply, setOpenReply] = useState(false)
const [CommentValue, setCommentValue] = useState("")


const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value)
}


// const onClickReplyOpen = () => {
//     setOpenReply(!OpenReply)
// }
// 싱글 코멘트 토글기능
// const actions = [
//     <span 
//         style={{border:'1px solid #bbb', display:'inline-block',padding:'5px', marginTop:'1rem', borderRadius:'5px', cursor:'pointer'}}
//         onClick={onClickReplyOpen} key="comment-basic-reply-to"
//     >
//         답변
//     </span>
// ]

// 싱글 코멘트 저장
const onSubmit = (e) => {
    e.preventDefault();


    const variableComment = {
        content: CommentValue,
        writer: user.userData._id, // 리덕스 안의 state에서 user 정보 가져옴
        postId: props.postId,
        responseTo: props.comment._id  
    }


    axios.post('/api/comment/saveComment', variableComment ) 
        .then(response => {
            if(response.data.success){
                // setCommentValue(response.data.result)
              
                setOpenReply(false)
                props.refreshFunction(response.data.result)
            }else{
                alert('코멘트를 저장하지 못했습니다')
            }
        })

}




  return (
    
    <div>
        
       <div style={{ margin:'1rem 0 1rem 0'}}>
        
        <p style={{fontSize:'12px'}}>{props.comment.writer.name}</p>
        <p style={{fontSize:'1.5em'}}>{props.comment.content}</p>
        {/* {actions} */}
       </div>

    {OpenReply && 
        <form style={{ display:'flex', margin:'1rem 0 1rem 0'}} onSubmit={onSubmit}>

            <textarea
                style={{ width:'100%', borderRadius:'5px'}}
                onChange={onHandleChange}
                value={CommentValue}
                placeholder="답변을 작성하세요"
            > 

            </textarea>
            <Button 
                style={{ width:'20%', height:'52px'}}
                onClick={onSubmit}
            >
                코멘트입력
            </Button>
        </form>
    }
            

    </div>
  )
}

export default SingleComment