import React,{ useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from 'antd';
import { useParams } from 'react-router-dom'; 
import axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe'; 
import Comment from './Sections/Comment';

function VideoDetailPage(props){

    // <Route exact path="/product/:productId" element={<AuthDetailProductPage />} />
    // const productId = props.match.params.productId <-- 라우트 업데이트된 후로 못쓴다
    // useParams를 사용할 때라도 props는 선언해줘야한다
    // 그렇지 않으면 data를 못 읽어들인다

    const { videoId } = useParams();

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {

        const videoVariable = {
            videoId: videoId
        }

   // 몽고디비에 저장된 비디오 콘텐츠 가져오기, 서버에 요청


        axios.post('/api/video/getVideoDetail', videoVariable)
        .then(response => {
            if (response.data.success) {
                console.log(response.data.videoDetail)
                setVideoDetail(response.data.videoDetail)
            } else {
                alert('Failed to get video Info')
            }
        })




        axios.post('/api/comment/getComments', videoVariable)
            .then(response => {
                if(response.data.success){
                    setComments(response.data.comments)
                }else{
                    alert('코멘트 정보 가져오기에 실패했습니다')
                }
            })




    },[videoId])


    // comment.js에서 보내는 값 받기

    const refreshFunction = (newComment) => {


        setComments(Comments.concat(newComment))

    }



if(VideoDetail.writer) {
  return (
    <div style={{overflowX:'hidden', margin: '0 auto' }}>
        <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
            <div className="postPage" style={{ width: '100%', padding: '3rem 4em', overflowX:'hidden' }}>
                <video style={{ width: '100%' }} src={`${VideoDetail.filePath}`} controls></video>

                <List.Item
                    style={{listStyle:'none'}}
                    actions={[<Subscribe userTo={VideoDetail.writer._id}/>]} userFrom={localStorage.getItem('userId')}
                >
                    <List.Item.Meta
                      
                        avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image} />}
                        title={<a href="https://ant.design" style={{display:'inlin-block', fontSize:'20px'}}>{VideoDetail.title}</a>}
                        description={VideoDetail.description}
                    />
                  
                </List.Item>

               <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId} />

            </div>
        </Col>
        {/* 사이드 비디오 출력  */}
        <Col lg={6} xs={24}>

            <SideVideo />

        </Col>
    </Row>
    </div>
    
  )  
} else {
    return(
        <div style={{marginLeft:'2rem'}}> ...loading </div>
    )

}

  
}

export default VideoDetailPage