import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SideVideo() {


    const [sideVideos, setsideVideos] = useState([])

    useEffect(() => {
    
        axios.post('/api/video/getVideos')
            .then(response => {
                if(response.data.success){

                    setsideVideos(response.data.videoInfo)

                }else{
                    alert('비디오 리스트를 불러오지 못했습니다.')
                }
            })
 

    }, [])

    const sideVideoItem = sideVideos.map(( video, index ) => {

      return <div key={index} style={{ display:'flex', marginBottom:'1rem', padding:'0 2rem'}}>

        <div style={{width:'40%', marginBottom:'1rem', }}>
            <a href={`/video/${video._id}`}>
                <img style={{ width:'100%'}} src={`${video.thumbnail}`} alt="thumbnail" />
            </a>
        </div>
        <div style={{ width:'50%', marginLeft:'1rem'}}>
            <a href={`/video/${video._id}`}>
                <span style={{ fontSize:'1rem', color:'black'}}>{video.title}</span><br />
                <span>{video.writer.name}</span><br />
                <span>{video.views} views </span><br />
               
            </a>

        </div>

   </div>
    })

  return (
        <div style={{ marginTop:'3rem'}}>{sideVideoItem}</div>
     
  )
}

export default SideVideo