import React from 'react'
import { Carousel} from 'antd';
// 메인페이지 이미지 슬라이더
function ImageSlider(props) {
  return (
    <div>
        <Carousel autoplay>
            {props.images.map((image, index) => (
                <div key={index}>
                    <img style={{ width:'100%', maxHeight:'150px' }}
                    src={`${image}`} alt="" />
                </div>
            ))}
        </Carousel>
    </div>
  )
}

export default ImageSlider