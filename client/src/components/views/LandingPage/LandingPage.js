import React, { useState, useEffect } from 'react'
import SearchFeature from './Sections/SearchFeature';
import {Col, Row}  from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';
import './LandingPage.css';


function LandingPage() {

  const [Videos, setVideos] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(8)
  const [PostSize, setPostSize] = useState()
  const [SearchTerm, setSearchTerm] = useState("")


  useEffect(() => {

    let body = {
    
      skip:Skip,
      limit:Limit,
      searchTerm: SearchTerm
    }
  
    getVideoProducts(body);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  

  const getVideoProducts = (body) => {
    axios.post('/api/video/getVideos', body)
        .then(response => {
            if(response.data.success) {
                if(body.loadMore) {
                  setVideos([...Videos, ...response.data.videoInfo])
                } else {
                  setVideos(response.data.videoInfo)
                }
                setPostSize(response.data.postSize)

            } else {
                alert("업로드한 비디오를 가져오는데에 실패했습니다.")
            }
        })


}

// 상품 더보기 버튼

const loadMoreHandler = () => {

  let skip = Skip + Limit;

  let body = {
    
    skip:skip, // skip = Skip + Limit; <-  useState Skip이 아닌 Skip + Limit를 더한 값을 보냄
    limit:Limit,
    loadMore: true,
    searchTerm: SearchTerm

  }


  getVideoProducts(body);
  setSkip(skip)

}





 // 비디오 출력

 const renderCards = Videos.map((video, index) => {


  return <Col lg={8} md={12} xs={24}>
      <div className='CardBnr'
      style={{ position: 'relative', border:'1px solid #ddd', borderRadius:'10px 0 10px 0', height:'auto'}}>
          <a href={`/video/${video._id}`} >
          <img style={{ width: '90%', height:'210px', marginTop:'20px', marginBottom:'10px', borderRadius:'0 10px 0 10px '}} alt="thumbnail" src={`${video.thumbnail}`} />
          
          </a>
      <br />
        <div style={{height:'50px', fontWeight:'bold'}}>

        <Meta
            // avatar={
            //     <Avatar src={video.writer.image} />
            // }
            title={video.title}
        />
        <span style={{ fontWeight:'normal', padding:'10px 0 10px 0', fontSize:'0.8em'}}>{video.writer.name} </span><br />
        {/* <span style={{ marginLeft: '3rem' }}> {video.views}</span> */}
        {/* - <span> {moment(video.createdAt).format("MMM Do YY")} </span> */}

        </div>
      </div>
      
  </Col>

})


// 검색기능 ========================================


const updateSearchTerm =(newSearchTerm) => {

  

  let body = {
    skip: 0,
    limit: Limit,
    searchTerm: newSearchTerm
  }
  setSkip(0)
  setSearchTerm(newSearchTerm) // SearchFeature.js 에서 받아옴
  getVideoProducts(body)
}

//==================================================

  return (
    <div style={{width:'100%', margin: '0 auto'}}>
      <div className='Hero'>
        <p></p>
      </div>

      <div style={{width:'80%', margin: '3rem auto'}}>
   
    {/* Search */}
    <div>
       <SearchFeature 
          refreshFunction={updateSearchTerm}
       />
    </div>


    {/* 추천 영상 배너 출력 */}



    <div className='ImgCon'> 
    
    <div>
      <img src="https://cdn.pixabay.com/photo/2017/11/12/08/56/background-2941800_640.jpg" style={{width:'100%'}} alt="" />
      <p>브이로그</p>
    </div>
    <div>
      <img src="https://cdn.pixabay.com/photo/2015/12/11/13/59/lights-1088141_960_720.jpg" style={{width:'100%'}} alt="" />
      <p>안정이 필요할 땐 meditation </p>
    </div>
    <div>
      <img src="https://cdn.pixabay.com/photo/2018/10/08/08/43/cat-3732264_960_720.jpg" style={{width:'100%'}} alt="" />
      <p>숙면을 위한 ASMR</p>
    </div>

        
 </div>
   
      <div style={{ textAlign:"center"}}>
        <h3 style={{ marginBottom:'50px'}}> 🎬 Recommendation </h3>


     
        {/* 비디오 리스트 출력  */}

        <Row gutter={[16, 16]}>
            {renderCards}
        </Row>
       

      </div>


{PostSize >= Limit &&
      <div style={{ display:'flex', justifyContent: 'center'}}>

        <button
          style={{ backgroundColor:'#ff4d4f', border:'0', color:'white',  padding:'20px', marginTop:'50px'}}
          onClick={loadMoreHandler}
        > 
             more Product Views
        </button>

      </div>
}

    </div>
  </div>
  )
}

export default LandingPage