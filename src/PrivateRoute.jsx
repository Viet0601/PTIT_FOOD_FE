import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const PrivateRoute = ({children}) => {
    const navigate=useNavigate()
    const role= useSelector(state=>state.user?.user?.role)
    if(role!=="ADMIN")
    {
        navigate(-1);
        return ;
        
    }
  return (
    <>
    {children}
    </>
  )
}

export default PrivateRoute