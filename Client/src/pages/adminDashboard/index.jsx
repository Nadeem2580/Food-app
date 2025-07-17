import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../Utils/Utility'

const AdminDashboard  = () => {

useEffect(()=>{
(async()=>{
  const payload = {}
  const response = await axios.post(`${BASE_URL}/create` , payload , {
    headers : {
      Authorization: `Bearer ${Cookies.get("token")}`
    }
  })
})
},[])




  return (
    <div>AdminDashboard </div>
  )
}

export default AdminDashboard 