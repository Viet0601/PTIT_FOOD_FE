
import Form from 'react-bootstrap/Form';
import './Login.scss'
import { useContext, useState } from 'react';
import {toast} from "react-toastify"
import { LoginService } from '../../service/apiService';
import { StoreContext } from '../../context/StoreContext';
import { isLoginSucces } from '../../redux/userSlice';
import { Link, useNavigate } from 'react-router';
import { LINK } from '../../utils/constant';
const Login = (props) => {
    const {setTypeModal}=props
    const {isShow,setIsShow}=props
    const [isClickCheckBox,setisClickCheckBox]=useState(false)
    const [dataLogin,setdataLogin]=useState({
      email:'',password:''
    })
    const navigate=useNavigate()
    const {setLoading,dispatch,getProfile,getUserCart,refetchOrderPagenate,getAllUserAddress,setisShowModalLogin}= useContext(StoreContext);
    const handleChangeInput=(e)=>{
      const name= e.target.name 
      const value= e.target.value;
      setdataLogin({...dataLogin,[name]:value})
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
       setLoading(true);
      const response=await LoginService(dataLogin) ;
      if( response && response.ec===200)
      {
        setIsShow(!isShow)
        setdataLogin({email:'',password:''})
        setisClickCheckBox(false)
        toast.success(response.em)
        dispatch(isLoginSucces(response?.dt?.accessToken));
        if(response.dt)
        {
          localStorage.setItem("access_token",response?.dt?.accessToken);
        }
        getProfile()
        getUserCart()
        getAllUserAddress();
        refetchOrderPagenate()
        
        
      }
      if( response && response.ec===400)
      {
        toast.error(response.em)
      }
       setLoading(false);

    }
  return (
    <>
        <h4>Đăng nhập</h4>
      <Form className="login-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
        
          <Form.Control onChange={(e)=>handleChangeInput(e)} name='email' value={dataLogin.email} type="email" placeholder='Email' />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          
          <Form.Control onChange={(e)=>handleChangeInput(e)} name='password' value={dataLogin.password} type="password" placeholder='Mật khẩu' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={()=>setisClickCheckBox(!isClickCheckBox)} style={{fontSize:'11px'}} type="checkbox" label="Để tiếp tục, tôi đồng ý những quy định và chính sách bảo mật " />
        </Form.Group>
        <button disabled={!isClickCheckBox} onClick={(e)=>handleSubmit(e)} type='submit'  className={isClickCheckBox && dataLogin.email && dataLogin.password?'':'btn-login-inactive' } >Đăng nhập</button>
        <p onClick={()=>{navigate(LINK.RESET_PASSWORD); setisShowModalLogin(false)}} style={{color:"#3483FF",cursor:"pointer"}} className='mt-2'>Quên mật khẩu</p>
        <p >Chưa có tài khoản?<a onClick={()=>setTypeModal("SIGNUP")} className="signup-now">Đăng kí ngay</a></p>
      </Form>
    </>
  );
};

export default Login;
