
import React, { useEffect, useState } from 'react'

const YoutubeLocation = () => {

    const [address,setAddress]= useState('');

     useEffect(()=>{
        navigator.geolocation.getCurrentPosition(data=>{
            const {latitude, longitude}= data.coords;
            console.log(latitude,longitude);
            
            const url=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                fetch(url).then(res=>res.json()).then(data=>setAddress(data.address))
        })
     },[]);
     console.log(address);
     

  return (
    <div>
      <h1>My Location </h1>
      <h4>{address.neighbourhood}, {address.state_district},  {address.state}, {address.postcode}, {address.country}</h4>
    </div>
  )
}

export default YoutubeLocation
