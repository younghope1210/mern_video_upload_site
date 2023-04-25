import React, { useState} from 'react'
import { Form, Input} from 'antd';
import { TfiPlus } from "react-icons/tfi";
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const { TextArea } = Input;

const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CategoryOptions = [
    { value: 0, label: "Film" },
    { value: 0, label: "Sensibility" }
    // { value: 0, label: "Music" },
    // { value: 0, label: "Pets & Animals" },
    // { value: 0, label: "Sports" },
]

function VideoUploadPage(props) {

     // 페이지 넘김
     const navigate = useNavigate();

     const user = useSelector(state => state.user);

     const [title, setTitle] = useState("")
     const [Description, setDescription] = useState("")
     const [Private, setPrivate] = useState(0)
     const [Category, setCategory] = useState("Film & Animation")
     const [FilePath, setFilePath] = useState("")
     const [Thumbnail, setThumbnail] = useState("")
 
 
     const onTitleChange = (e) => {
         setTitle(e.currentTarget.value)
     }
 
     const onDecsriptionChange = (e) => {
         console.log(e.currentTarget.value)
 
         setDescription(e.currentTarget.value)
     }
 
     const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
     }
 
     const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
     }
 
     const onSubmit = (event) => {
 
         event.preventDefault();
 
         if (user.userData && !user.userData.isAuth) {
             return alert('Please Log in First')
         }
 
         if (title === "" || Description === "" ||
             Category === "" || FilePath === "" ) {
             return alert('Please first fill all the fields')
         }
 
         const variables = {
             writer: user.userData._id,
             title: title,
             description: Description,
             private: Private,
             filePath: FilePath,
             category: Category,
             thumbnail: Thumbnail
         }
 
         axios.post('/api/video/uploadVideo', variables)
             .then(response => {
                 if (response.data.success) {
                     alert('video Uploaded Successfully')
                     navigate('/') //메인페이지로 이동
                 } else {
                     alert('Failed to upload video')
                 }
             })
 
     }
 
     const onDrop = (files) => {
 
         let formData = new FormData();
         const config = {
             header: { 'content-type': 'multipart/form-data' }
         }
         console.log(files)
         formData.append("file", files[0]) //첫번째 이미지
 
         axios.post('/api/video/uploadfiles', formData, config)
             .then(response => {
                 if (response.data.success) {
                    alert('동영상 가져오기에 성공하였습니다')
                        let variable = {
                            filePath: response.data.filePath 
                        }
                     setFilePath(response.data.filePath)
 
                     //업로드한 동영상에서 썸네일 추출해오기
 
                    axios.post('/api/video/thumbnail', variable)
                   .then(response => {
                    if (response.data.success) {
                        setThumbnail(response.data.thumbsFilePath);
                        alert('썸네일 가져오기에 성공하였습니다');
                        } else {
                        alert('썸네일 가져오기에 실패하였습니다');
                        }
                       
                    })
    
 
                 } else {
                     alert('failed to save the video in server')
                 }
             })
 
     }
 
 // 썸네일 지우기

 const onDelete = (thumbnail) => {
    const CurrentIndex =Thumbnail.indexOf(thumbnail); // indexof로 이미지 선택가능

     // 불러들인 이미지 배열 복사한 후
    Thumbnail.splice(CurrentIndex, 1) // splice로 선택한 이미지 한장씩 삭제

    setThumbnail(Thumbnail); // useState로 액션 일으킨 값 넘겨주고

}


  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
         <h2 style={{marginBottom:'30px'}}>
           Video Upload 
            </h2>
        </div>

    <Form onSubmit={onSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false} 
                maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <TfiPlus style={{ color:'#333',fontSize: '3rem' }}  />

                    </div>
                )}
            </Dropzone>

            {Thumbnail !== "" &&
                <div onClick={() => onDelete()} >
                    <img src={`${Thumbnail}`} width="300" height="240" alt="Thumbnail" />
                </div>
            }
        </div>

        <br /><br />
        <label>Title</label>
        <Input
            onChange={onTitleChange}
            value={title}
        />
        <br /><br />
        <label>Description</label>
        <TextArea
            onChange={onDecsriptionChange}
            value={Description}
        />
        <br /><br />

        <select onChange={onPrivateChange}>
            {PrivateOptions.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
            ))}
        </select>
        <br /><br />

        <select onChange={onCategoryChange}>
            {CategoryOptions.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
            ))}
        </select>
        <br /><br />

        <button
            onClick={onSubmit}
            style={{ backgroundColor:'#333', border:'0', color:'white',lineHeight:'30px', lineheight:'30px', padding:'5px 30px'}}
        >
            Submit
        </button>


   

    </Form>
</div>
)
}

export default VideoUploadPage