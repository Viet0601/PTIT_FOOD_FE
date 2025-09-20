import React, { useContext, useState } from "react";
import "./ResetPassword.scss";
import { StoreContext } from "../../context/StoreContext";
import { resetPasswordService, sendOTPService } from "../../service/apiService";
import { toast } from "react-toastify";
import { LINK } from "../../utils/constant";
import { useNavigate } from "react-router";

const registeredEmails = ["user@example.com", "admin@test.com"];

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const {loading,setLoading}=useContext(StoreContext);
  const handleEmailSubmit =async (e) => {
    e.preventDefault();
    if(loading) return;
   setLoading(true)
   const response= await sendOTPService({email})
   if(response && response.ec===200)
   {
    setLoading(false)
    toast.success(response.em);
    
    setStep(2);
   }
   else 
   {
    setLoading(false)
    toast.error(response.message);
   }
  

  };

  const handleReset =async (e) => {
    e.preventDefault();
    if(loading) return ;
    if(!otp || !password)
    {
      toast.error("Vui lòng nhập đủ thông tin!")
      return;
    }
    setLoading(true)
    // console.log({email,otp,password});
    const response= await resetPasswordService({email,otp,password})
   if(response && response.ec===200)
   {
    toast.success(response.em);
    navigate(LINK.HOME)
    setStep(1)
    setEmail("")
    setOtp("")
    setPassword("")
   }
   else 
   {
    toast.error(response.message);
   }
  setLoading(false)

    
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Đặt lại mật khẩu</h2>

        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="reset-form">
            <input
              type="email"
              placeholder="Nhập email đăng ký"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Gửi OTP</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleReset} className="reset-form">
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu mới (≥ 6 ký tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Đặt lại mật khẩu</button>
          </form>
        )}
      </div>
    </div>
  );
}
