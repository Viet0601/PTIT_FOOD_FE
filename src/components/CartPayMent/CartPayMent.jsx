import React, { useContext, useEffect, useState } from 'react'
import './CartPayMent.scss'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router';
import { LINK } from '../../utils/constant';
import validator from "validator"
import {toast} from "react-toastify"
import { placeOrderService } from '../../service/apiService';
const CartPayMent = (props) => {
    const { cartItem, food_list,token } = useContext(StoreContext);
  const [total,setTotal]=useState(0)
  const navigate=useNavigate()
  const {typeButton,data}=props
  useEffect(()=>{
   
  },[cartItem])
  const isCheck=(data)=>{
    const index=['name','email','phone','province','city','village','address']
    for(let i=0;i<index.length;i++)
    {
      if(!data[index[i]])
      {
        toast.error("Vui lòng điền đủ thông tin!")
        return false;
      }

    }
    return true;
  }
  const getTotal=()=>{
    let sum=0
    // for(let i=0;i<food_list.length;i++)
    // {
    //   if(cartItem[food_list[i]._id]>0)
    //   {
    //     sum+= (+cartItem[food_list[i]._id]* +food_list[i].price)
    //   }
    // }
    setTotal(sum)
  }
  const handlePayment=async()=>{
      if(isCheck(data))
      {
        if(!validator.isEmail(data.email))
        {
          toast.error("Email không hợp lệ!")
          return;
        }
        let orderItems=[]
        food_list.map((item)=>{
          if(cartItem[item._id]>0)
          {
            let itemOrder=item 
            itemOrder['quantity']=cartItem[item._id]
            orderItems.push(itemOrder)
          }
        })
        let orderData={
          address:data,
          amount:total+25000 ,
          items:orderItems
        }
        
        const response=await placeOrderService(orderData,token)
        if(response && response.EC===0)
        {
          const url= response.DT 
          window.location.replace(url)
        }
      }
  }
  const handleMoveToPayment=()=>{
    navigate(LINK.PLACE_ORDER)
  }
  
  return (
    <div className="cart-payment-total-left">
              <h3>Tổng tiền giỏ hàng</h3>
              <p><span>Tổng đơn</span><span>{total}đ</span></p>
              <p><span>Phí vận chuyển</span><span>25000đ</span></p>
              <p><span className="total">Tổng</span><span className="total-price">{total+25000}đ</span></p>
              {typeButton==='GO_TO_PAYMENT'?<button onClick={()=>handleMoveToPayment()} className="cart-payment-total-continue">Tiếp tục</button>:
              <button onClick={()=>handlePayment()} className="cart-payment-total-continue">Tiếp tục</button>
              }
    </div>
  )
}

export default CartPayMent