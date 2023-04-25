import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Subscribe(props) {


  // const userTo = props.userTo
  // const userFrom = props.userFrom

  const [SubscribeNumber, setSubscribeNumber] = useState(0)
  const [Subscribed, setSubscribed] = useState(false)


    useEffect(() => {

      let variable = {
        userTo : props.userTo
      }
    
        axios.post('/api/subscribe/subscribeNumber',variable)
          .then(response => {
            if(response.data.success){
              setSubscribeNumber(response.data.subscribeNumber)
            }else{
              alert('구독자 수 정보를 받아오지 못했습니다')
            }
          })


          let subscribedVariable = {
            userTo : props.userTo,
            userFrom: localStorage.getItem('userId')
      }
          

          axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
              if(response.data.success){
                setSubscribed(response.data.subscribed)
              }else{
                alert('정보를 받아오지 못했습니다')
              }
            })

    }, [props.userTo])
    
    const onSubscribe = ( ) => {

      let subscribeVariable = {
              userTo : props.userTo,
              userFrom : props.userFrom
      }

      if(Subscribed) {
          //when we are already subscribed 
          axios.post('/api/subscribe/unSubscribe', subscribeVariable )
              .then(response => {
                  if(response.data.success){ 
                      setSubscribeNumber(SubscribeNumber - 1)
                      setSubscribed(!Subscribed)
                  } else {
                      alert('구독 취소에 실패했습니다')
                  }
              })

      } else {
          // when we are not subscribed yet
          
          axios.post('/api/subscribe/subscribe', subscribeVariable )
              .then(response => {
                  if(response.data.success) {
                      setSubscribeNumber(SubscribeNumber + 1)
                      setSubscribed(!Subscribed)
                  } else {
                      alert('구독하는데 실패했습니다')
                  }
              })
      }

  }


  return (
    <div>
      <button 
        onClick={onSubscribe}
        style={{
            backgroundColor: `${Subscribed ? 'red' : '#ccc'}`,
            borderRadius: '4px', color: 'white',
            padding: '5px 5px', fontWeight: '500', fontSize: '14px',
            listStyle:'none', float:'right'
        }}>
            {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe