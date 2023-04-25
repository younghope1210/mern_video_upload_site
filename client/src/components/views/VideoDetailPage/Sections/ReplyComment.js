import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'


function ReplyComment(props) {


    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReply, setOpenReply] = useState(false)


    useEffect(() => {
      
        let commentNumber = 0;

        props.commentLists.map((comment) => {

            if(comment.responseTo === props.parentCommentId){
                commentNumber ++ 
            }

        })
        setChildCommentNumber(commentNumber)
      
    }, [props.commentLists, props.parentCommentId])
    



    const renderReplyComment = (parentCommentId) => {

         props.commentLists.map((comment, index) => (
            (comment.responseTo && parentCommentId &&
                <div   
                    key={index}        
                    style={{marginLeft:'40px', width:'80%'}}
                >
                <SingleComment refreshFunction={props.refreshFunction} comment={props.comment} postId={props.videoId} />
                <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} postId={props.videoId} parentCommentId={comment._id}  />
            </div>
              )
        
         ))

    }

    const onHandleChange = () => {

        setOpenReply(!OpenReply)

    }


  return (
    <div>

    {ChildCommentNumber > 0 && 

        <p 
        onClick={onHandleChange}
        style={{ fontSize:'14px', margin:'0', color:'gray'}}
        
        >
        View {ChildCommentNumber} more comment(s)
        </p>

    }

 {OpenReply &&

       <p style={{ height:'100px'}}>
        {renderReplyComment(props.parentCommentId)}
        </p>
  
 }



    </div>
  )
}

export default ReplyComment