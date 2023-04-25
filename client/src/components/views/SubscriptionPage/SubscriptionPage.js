import React, { useState, useEffect } from 'react'
import {Col, Row, Avatar }  from 'antd';
import Meta from 'antd/lib/card/Meta';
import axios from 'axios';

function SubscriptionPage() {

    const [Videos, setVideos] = useState([])

  

    useEffect(() => {

        const subscriptionvariables = { 
            userFrom : localStorage.getItem('userId') 
         }

        axios.post('/api/video/getSubscriptionVideos', subscriptionvariables)
            .then(response => {
                if (response.data.success) {
                    setVideos(response.data.videos)
                } else {
                    alert('Failed to get subscription videos')
                }
            })
    }, [])

   
    const renderCards = Videos.map((video, index) => {

        return <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
                <a href={`/video/${video._id}`} >
                <img style={{ width: '100%' }} alt="thumbnail" src={`${video.thumbnail}`} />
                </a>
            </div><br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
           
        </Col>

    })
  

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
        <h3 style={{marginBottom:'1rem'}}> Subscribed Videos </h3>
        
        <p style={{ width:'100%', borderBottom:'5px solid #eee'}}></p>

        <Row style={{marginTop:'1rem'}} gutter={16}>
            {renderCards}
        </Row>
    </div>
    )
}

export default SubscriptionPage