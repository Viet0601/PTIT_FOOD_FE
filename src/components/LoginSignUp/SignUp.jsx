import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './SignUp.scss'
import { RegisterService } from '../../service/apiService';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';
const SignUp = (props) => {
    const {setLoading}=useContext(StoreContext)
    const {setTypeModal}=props
        const [isClickCheckBox,setisClickCheckBox]=useState(false)
        const navigate=useNavigate()
        const [dataRegister,setdataRegister]=useState({
          email:'',password:'',name:''
        })
        const handleChangeInput=(e)=>{
          const name= e.target.name 
          const value= e.target.value;
          setdataRegister({...dataRegister,[name]:value})
        }
        const handleSubmit=async(e)=>{
          e.preventDefault();
           setLoading(true);
          const response=await RegisterService({email:dataRegister.email,password:dataRegister.password,fullName:dataRegister.name}) ;
          if( response && response.ec===201)
          {
            setTypeModal("LOGIN")
            setdataRegister({email:'',password:'',name:''})
            setisClickCheckBox(false)
            toast.success(response.em)
          }
          else if( response && response.error)
          {
            toast.error(response.message)
          }
           setLoading(false);
        }
  return (
    <>
      <h4>Đăng kí</h4>
      <Form className="register-form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control onChange={(e)=>handleChangeInput(e)} name='email' value={dataRegister.email} type="email" placeholder='Email' />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
         
          <Form.Control onChange={(e)=>handleChangeInput(e)} name='password' value={dataRegister.password} type="password" placeholder='Mật khẩu' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordComfirm">
         
          <Form.Control onChange={(e)=>handleChangeInput(e)} name='name' value={dataRegister.name} type="text" placeholder='Tên người dùng' />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            style={{ fontSize: "11px" }}
            type="checkbox"
            label="Để tiếp tục, tôi đồng ý những quy định và chính sách bảo mật "
            onChange={()=>setisClickCheckBox(!isClickCheckBox)}
            
          />
        </Form.Group>
        <button onClick={(e)=>handleSubmit(e)}  disabled={!isClickCheckBox} type='submit' className={isClickCheckBox?'':'btn-login-inactive'}>Đăng kí</button>
        <p>
          Đã có tài khoản?<a onClick={()=>setTypeModal("LOGIN")} className="signup-now">Đăng nhập ngay</a>
        </p>
      </Form>
    </>
  );
};

export default SignUp;
