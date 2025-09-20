import React from 'react'
import './LoginSignUp.scss'
import { Modal } from 'antd'
import Login from './Login';
import SignUp from './SignUp';

const LoginSignUp = (props) => {
    const {isShow,setIsShow,setTypeModal,typeModal}=props;
  return (
   <div className="form_cover">
     <Modal
        width={380}
        centered
       
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isShow}
       
        footer={null}
        onCancel={()=>setIsShow(!isShow)}
        
      >
        {typeModal==="LOGIN"?<Login isShow={isShow} setIsShow={setIsShow} setTypeModal={setTypeModal} />:<SignUp isShow={isShow} setIsShow={setIsShow} setTypeModal={setTypeModal}/>}
       
      </Modal>
   </div>
  )
}

export default LoginSignUp