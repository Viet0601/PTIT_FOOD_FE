import React, { useContext, useEffect, useState } from "react";
import TableBootStrap from "react-bootstrap/Table";
import { StoreContext } from "../../context/StoreContext";
import { MdDeleteOutline } from "react-icons/md";
import { Table } from "antd";
import "./Cart.scss";
import { BACKEND_IMAGE, LINK } from "../../utils/constant";
import { useNavigate } from "react-router";
import CartPayMent from "../../components/CartPayMent/CartPayMent";
import DeleteFoodModal from "../../components/Modal/DeleteFoodModal";
import { deleteCartItemService } from "../../service/apiService";
import { toast } from "react-toastify";
const Cart = () => {
  const food_list=[]
  const { cart, removeToCart,getUserCart,setLoading } = useContext(StoreContext);
  const [total,setTotal]=useState(0)
  const [isShowDelete,setIsShowDelete]=useState(false);
  const [foodDelete,setFoodDelete]=useState(undefined);
  const navigate=useNavigate()
  const handleTriggerPopUp=(food)=>{
    if(isShowDelete)
    {
      setFoodDelete(undefined)
    }
    else 
    {
      setFoodDelete(food)
    }
    setIsShowDelete(!isShowDelete)
  }
  const handleComfirm=async()=>{
    const id= foodDelete?.id;
    if(id)
    {
       setLoading(true);
      const response= await deleteCartItemService(id);
      if(response && response.ec===200)
      {
        toast.success(response.em);
        getUserCart()
        setIsShowDelete(false)
        setFoodDelete(undefined)
      }
       setLoading(false);
    }
  }
  
  return (
    <>
     <div className="container table-list-cart">
      <TableBootStrap striped bordered hover>
        <thead>
          <tr>
            <th>Món</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền </th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.listCartItems && cart.listCartItems.length>0  && cart.listCartItems.map((item, index) => {
           
              return (
               
                <tr key={index}>
                  <td> <img className="image-food-item-cart" src={item?.food?.images[0]} alt=""/></td>
                  <td>{item?.food?.name}</td>
                  <td>{item?.food?.price}đ</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.totalPrice}đ</td>
                  <td><MdDeleteOutline onClick={()=>{
                    handleTriggerPopUp(item)
                  }} className="delete-food-cart"/></td>
                </tr>
               
              
            ); 
            
           
          })}
        
       

         
        </tbody>
      </TableBootStrap>
       {cart  && cart.length ===0 && <Table style={{width:"100%"}} columns={[]} dataSource={[]} />}
       {cart && cart.listCartItems   && cart.listCartItems.length ===0 && <Table style={{width:"100%"}} columns={[]} dataSource={[]} />}
      <div className="payment_box_component">
        {cart && cart.listCartItems && cart.listCartItems.length>0?
       <div className="order-summary">
      <h2 className="title">Chi tiết đơn hàng</h2>
      <div className="items-list">
        {cart && cart.listCartItems && cart.listCartItems.map((item, index) => (
          <div className="item" key={index}>
            <div className="info">
              <span className="name">{item?.food?.name}</span>
              <span className="quantity">x{item.quantity}</span>
            </div>
            <span className="price_item">
              {(item?.food?.price * item.quantity).toLocaleString()}đ
            </span>
          </div>
        ))}
      </div>

      <div className="fee">
        <span>Phí vận chuyển</span>
        <span>Miễn phí</span>
      </div>

      <div className="total">
        <span>Tổng cộng</span>
        <span className="amount">{cart?.total}đ</span>
      </div>
      <button className="checkout-btn" onClick={()=>navigate(LINK.PLACE_ORDER)}>
        Thanh toán
      </button>
    </div>
      :<></>}
      </div>
    </div>
    <DeleteFoodModal onConfirm={handleComfirm} isOpen={isShowDelete} foodName={foodDelete?.food?.name} onClose={handleTriggerPopUp}/>
    </>
   
  );
};

export default Cart;
