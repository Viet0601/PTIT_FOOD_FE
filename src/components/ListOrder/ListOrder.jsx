// import React, { useContext, useEffect, useState } from "react";
// import "./ListOrder.scss";
// import { StoreContext } from "../../context/StoreContext";
// import { getListOrderService } from "../../service/apiService";

// import { assets } from "../../assets/assets/frontend_assets/assets";
// import { Badge, Space } from 'antd';
// const ListOrder = () => {
//   const [orders, setorders] = useState([]);
//   const { token } = useContext(StoreContext);

//   useEffect(() => {
//     if (token) {
//       getListOrder(token);
//     }
//   }, [token]);
//   const getListOrder = async (token) => {
//     const response = await getListOrderService(token);
//     if (response && response.EC === 0) {
//       setorders(response.DT);
//     }
//   };
//   console.log(orders);
//   return (
//     <div className="list-order container">
//       <h3 className="mb-3">Danh sách đơn hàng</h3>
//       <div className="list-order-cover">
//         {orders.map((order, indexOrder) => {
//           return <div key={indexOrder} className="list-order-item">
//               <img className="image-order" src={assets.parcel_icon} alt=""/>
//               <p className="list-foods">{order.items.map((item,index)=>{
//                 if(index===order.items.length-1)
//                 { 
//                   return item.name + " x "+item.quantity
//                 }
//                 else 
//                 {
//                   return item.name + " x "+item.quantity+","
//                 }
//               })}</p>
//               <p className="total-order">{order.amount}đ</p>
//               <p className="quantity-order">Số lượng: {order.items.length}</p>
//               {order.status==="Đang xử lý"? <p className="status-order"><Badge status="error" text={order.status} /></p>:<p className="status-order"><Badge status="success" text={order.status} /></p>}
//               <button className="track-btn-order">Theo dõi đơn hàng</button>
//           </div>;
//         })}
//       </div>
//     </div>
//   );
// };

// export default ListOrder;
// OrdersPage.jsx
import React, { useContext, useEffect, useState } from "react";
import "./ListOrder.scss";
import { StoreContext } from "../../context/StoreContext";
import moment from "moment"
import DeleteFoodModal from "../Modal/DeleteFoodModal";
import ReviewOrderModal from "../Modal/ReviewOrderModal";
import { Badge, Pagination, Table } from "antd";
export default function ListOrder() {
    const [open, setOpen] = useState(false);
    const [orderFeedback,setOrderFeedback]=useState(null)
    const [orderId,setOrderId]=useState(null)

    
    const handleChangePage=(e)=>{
      setPageOrder(e);
     
    }
    const handleOpen=(order)=>{
      setOpen(true)
      setOrderId(order?.id)
      const list= order?.listOrderItems;
      let orderItems=[]
     if(list && list.length>0)
     {
       for(let i=0;i<list.length;i++)
      {
        let object={
          image:list[i].images[0],
          id:list[i].foodId,
          name:list[i].name
        }
        orderItems.push(object)
      }
     }
     setOrderFeedback(orderItems)
    }
  
    async function handleSubmit(payload) {
      // payload = [{ id, rating, comment }, ...]
      // simulate network
      await new Promise(r => setTimeout(r, 900));
      // show toast or update UI
    }
  const {orderPagenate,cancelOrder,getMyOrder,setPageOrder,refetchOrderPagenate}=useContext(StoreContext);
  const [orderDelete,setOrderDelete]=useState(undefined);
  const [isShowDelete,setIsShowDelete]=useState(false);
  const [expanded, setExpanded] = useState(null);
  
  useEffect(() => {
    if (orderPagenate?.currentPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [orderPagenate?.currentPage]);
  const toggleModal=(item)=>{
    if(isShowDelete)
    {
      setIsShowDelete(!isShowDelete)
      setOrderDelete(undefined)
      setOrderId(undefined)
      setOrderDelete(undefined)
    }
    else
    {
      setIsShowDelete(!isShowDelete)
      setOrderDelete(item)
    }
  }
  const handleDeleteOrder=()=>{
    const id= orderDelete?.id;
    if(id)
    {
      cancelOrder(id);
      setIsShowDelete(false)
    }
  }
  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };
  return (
    <>
     <div className="orders-page">
      <div className="container">
        <h2 style={{fontSize:"25px"}}>Đơn hàng của bạn</h2>

        {orderPagenate && orderPagenate.list && orderPagenate.list.length>0 ? orderPagenate.list.map((item) => (
          <div className="order-card" key={item.id}>
            <div className="summary" onClick={() => toggleExpand(item.id)}>
              <div>
                <strong>DHPTIT{item?.id}</strong>
                <span className={`status ${item?.statusOrder?.description.replace(/\s/g, '')}`}>{item?.statusOrder?.description}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <div className="d-flex flex-column gap-2 justify-content-center">
                <small>{moment(item?.createdAt).calendar()}</small>
                 <Badge status={item?.paid ? "success" : "error"} text={item?.paid ? "Đã thanh toán":"Chưa thanh toán"} />
                  </div>
                <strong>{item?.total.toLocaleString()}₫</strong>
              </div>
            </div>

            {expanded === item.id && (
              <div className="details">
                <div className="items">
                  {item && item.listOrderItems && item.listOrderItems.length>0 && item.listOrderItems.map((it,index) => (
                    <div className="item" key={index}>
                      <span>{it?.name} ×{it?.quantity}</span>
                      <span>{(it?.total).toLocaleString()}₫</span>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <button className="track" onClick={()=>refetchOrderPagenate()}>Theo dõi đơn hàng</button>
                
                  {item?.statusOrder?.description==="Đã giao hàng" ? <button disabled={item?.feedback} onClick={()=>handleOpen(item)} style={{cursor:item?.feedback ? "no-drop":"pointer"}} className="feedback">{item?.feedback ===true ? "Đã gửi đánh giá/feedback":"Đánh giá/Feedback"}</button>
                :    <button onClick={()=>toggleModal(item)} className="cancel">Hủy đơn hàng</button>
                }
                </div>
              </div>
            )}
          </div>
        )):<Table style={{width:"100%",height:"100%"}} columns={[]} dataSource={[]} />}
      </div>
    </div>
   { orderPagenate && orderPagenate.list && orderPagenate.list.length>0 && <Pagination  onChange={(page) => handleChangePage(page)} className="mt-4" align="center" current={orderPagenate && orderPagenate.currentPage} total={orderPagenate && orderPagenate.totalPage  * 10} />}
    {isShowDelete && <DeleteFoodModal isOpen={isShowDelete} foodName={orderDelete?.id} type={"ORDER"} onClose={toggleModal} onConfirm={handleDeleteOrder} />}
         <ReviewOrderModal orderId={orderId} isOpen={open} onClose={() => setOpen(false)} items={orderFeedback} onSubmit={handleSubmit} />
    </>
   
  );
}

/* OrdersPage.scss */

