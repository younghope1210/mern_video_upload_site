import React,{ useState }from 'react';
import Dropzone from 'react-dropzone';
import { TfiPlus } from "react-icons/tfi";
import Axios from 'axios';

function FileUpload(props) {


    const [Images, setImages] = useState([]) // 이미지 배열로 받는다


const onDropHandler = (files) => {

    let formData = new FormData();

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.filePath])
                    props.refreshFunction([...Images, response.data.filePath])
                    // UploadProductPage가 부모 컴포넌트가 된다
                    // 그쪽으로 refreshFunction 이미지값 보낸다

                } else {
                    alert('파일을 저장하는데 실패했습니다')
                }
            })
}


const onDelete = (image) => {
    const CurrentIndex = Images.indexOf(image); // indexof로 이미지 선택가능

    let newImages = [...Images] // 불러들인 이미지 배열 복사한 후
    newImages.splice(CurrentIndex, 1) // splice로 선택한 이미지 한장씩 삭제

    setImages(newImages); // useState로 액션 일으킨 값 넘겨주고
    props.refreshFunction(newImages); // ploadProductPage 부모 컴포넌트에게 전달한다
}


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone
            onDrop={onDropHandler}
            // multiple={false}
            // maxSize={800000000}
        >
            {({ getRootProps, getInputProps }) => (
                <div style={{
                    width: '300px', height: '240px', border: '1px solid lightgray',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                    {...getRootProps()}
                >
                    {/* {console.log('getRootProps', { ...getRootProps() })}
                    {console.log('getInputProps', { ...getInputProps() })} */}
                    <input {...getInputProps()} />
                  
                    <TfiPlus style={{ color:'#333',fontSize: '3rem' }}  />

                </div>
            )}
        </Dropzone>
        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

        {Images.map((image, index) => (
            <div 
                key={index}
                onClick={() => onDelete(image)} 
            >
                <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`${image}`} alt='' />
            </div>
        ))}


            </div>
        
    </div>
  )
}

export default FileUpload