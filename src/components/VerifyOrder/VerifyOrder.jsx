import React from "react";
import "./VerifyOrder.scss";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useEffect } from "react";
import { verifyOrderService } from "../../service/apiService";
import { toast } from "react-toastify";
import { LINK } from "../../utils/constant";
const VerifyOrder = () => {
  const [param, setParam] = useSearchParams();
  const success = param.get("success");
  const orderId = param.get("orderId");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(()=>{
      verifyOrder()
    },[3000])
  }, []);
  const verifyOrder = async () => {
    if (success && orderId) {
      const response = await verifyOrderService({success,orderId});
      if(response && response.EC===0)
      {
        toast.success(response.EM)
        navigate(LINK.HOME)
      }
      if(response && response.EC!==0)
      {
        toast.error(response.EM)
         navigate(LINK.HOME)
      }
    }
  };
  
  return (
    <div className="verify">
      <div className="verify-spinner"></div>
    </div>
  );
};

export default VerifyOrder;
