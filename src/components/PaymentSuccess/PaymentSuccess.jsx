// PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import "./PaymentSuccess.scss";
import { useSearchParams } from "react-router";
import { updateOrderPaidSuccessService } from "../../service/apiService";

export default function PaymentSuccess() {
    const [orderId,setOrderId]=useState(undefined);
    const [query,seerchQuery]= useSearchParams();
    const updatePaidOrder=async(id)=>{
        await updateOrderPaidSuccessService(id);
    }
   useEffect(()=>{
    const orderId=query.get("orderId");
    if(orderId)
    {
        setOrderId(orderId);
        updatePaidOrder(orderId);
    }
   },[])
  return (
    <div className="payment_success_component">
      <div className="pay-success-payment_success_component">
        <div className="confetti-payment_success_component" aria-hidden="true">
          {Array.from({ length: 50 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="card-payment_success_component" role="status" aria-live="polite">
          <div className="icon-wrap-payment_success_component" aria-hidden="true">
            <svg className="icon-payment_success_component" viewBox="0 0 24 24" width="64" height="64">
              <circle cx="12" cy="12" r="10" className="ring-payment_success_component" />
              <path
                d="M7 12.5l3 3 7-7"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="tick-payment_success_component"
              />
            </svg>
          </div>

          <h1 className="payment_success_component_h1">Thanh toán thành công! 🎉</h1>
          {orderId ? (
            <p className="sub-payment_success_component">
              Mã đơn hàng của bạn: <strong>#DHPTIT{orderId}</strong>
            </p>
          ) : (
            <p className="sub-payment_success_component">Cảm ơn bạn đã mua hàng tại PTIT Food.</p>
          )}

          <div className="actions-payment_success_component">
            <a className="btn-home-payment_success_component" href="/" aria-label="Quay về trang chủ">
              Quay về trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
    
  );
}
