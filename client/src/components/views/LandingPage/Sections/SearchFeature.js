import React,{useState} from 'react';
import { Input } from 'antd';
const { Search } = Input;

function SearchFeature(props) {


    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (e) => {

        setSearchTerm(e.currentTarget.value);
        //   refreshFunction={updateSearchTerm}
          props.refreshFunction(e.currentTarget.value)
    }


  return (
    <div>

        <Search
            placeholder="찾으시는 영상제목을 입력하세요."
            onChange={searchHandler}
            value={SearchTerm}
            style={{
            width:'300px',
            display:'flex',
            justifyContent:'flex-end',
            marginLeft: 'auto',
            marginBottom:'15px'
            }}
        />

    </div>
  )
}

export default SearchFeature