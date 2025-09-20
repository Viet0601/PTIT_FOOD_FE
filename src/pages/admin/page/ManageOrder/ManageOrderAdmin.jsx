import React, { useState, useEffect, useContext } from "react";
import "./ManageOrderAdmin.scss";
import { getAllOrderAdminService, getAllStatusOrderAdminService, updateStatusOrderService } from "../../../../service/apiService";
import { StoreContext } from "../../../../context/StoreContext";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../../../queryKey/queryKey";
import EmptyBox from "../../../../components/Emty/EmptyBox";



const ManageOrderAdmin = () => {
  const {limit,setLoading}= useContext(StoreContext)
  // const [orders, setOrders] = useState([]);
  const [statusOptions, setstatusOptions] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [page,setPage]=useState(1);
  const [total,setTotal]=useState(1);
  const [query,setQuery]=useState("")
  const {data:orders,isPending,isError,error,refetch:refetchOrderAdmin}= useQuery({
    queryKey:queryKey.fetchAllOrderAdmin(page),
    queryFn:async()=>{
       setLoading(true);
       const response= await getAllOrderAdminService(page,limit);
    if(response && response.ec===200)
    {
       setLoading(false);
      setTotal(response.dt.totalPage);
      return response.dt.listOrders;
    }
     setLoading(true);
    return []
    }
  })
  const getStatusOrder=async()=>{
     setLoading(true);
    const response=await getAllStatusOrderAdminService();
    if(response && response.ec===200)
    {
      setstatusOptions(response.dt);
    }
    setLoading(false);
  }
  useEffect(() => {
   if(!statusOptions) getStatusOrder()
  
  }, [page]);

  const handleStatusChange = async(orderId, newStatus) => {
    if(!orderId || !newStatus)
    {
      return ;
    }
    const data={
    statusOrderId:Number(newStatus),
    orderId:Number(orderId)
    }
     setLoading(true);
    const response=await updateStatusOrderService(data)
    if(response && response.ec===200)
    {
      toast.success(response.em)
      refetchOrderAdmin();
    }
    else 
    {
      toast.error(response.em)
    }
     setLoading(false);
  };
  const handleChangePage=(e)=>{
    setPage(e)
    window.scrollTo({top:0,behavior:"smooth"});
  }
 console.log(orders)
  return (
    <div className="admin-orders">
      <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="title">Quản lý Đơn Hàng</h2>
      <button onClick={()=>refetch()} className="btn-detail">Làm mới</button>

      </div>
     <div  className="admin-orders-search">
     <input
          className=""
          placeholder="Tìm theo mã, sđt khách hàng..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
     </div>
      <div className="orders-table">
        <div className="table-header">
          <div>Mã ĐH</div>
          <div>SĐT Khách hàng</div>
          <div>Tổng tiền</div>
          <div>Trạng thái</div>
          <div>Chi tiết</div>
        </div>

        { orders && orders.length>0 && orders.map((order) => (
          <div key={order.id} className="table-row">
            <div className="cell">#DHPTIT{order.id}</div>
            <div className="cell">{order?.address?.phone}</div>
            <div className="cell">{order.total.toLocaleString()} đ</div>
            <div className="cell">
              <select
                value={order?.statusOrder?.id}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="status-select"
              >
                {statusOptions &&  statusOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="cell">
              <button
                className="btn-detail"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                {expandedOrder === order.id ? "Ẩn" : "Xem"}
              </button>
            </div>

            {expandedOrder === order.id && (
              <div className="order-details">
                <h4>Chi tiết món ăn</h4>
                <div className="details-header">
                  <div>Tên món</div>
                  <div>Số lượng</div>
                  <div>Giá</div>
                </div>
                {order && order.listOrderItems && order.listOrderItems.length>0 && order.listOrderItems.map((item,index) => (
                  <div key={index} className="details-row">
                    <div>{item.name}</div>
                    <div>{item.quantity}</div>
                    <div>{item.total.toLocaleString()} đ</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {orders && orders.length>0 >0?  <Pagination onChange={(e)=>handleChangePage(e)} className="mt-4" align="center" current={page} total={total  * 10} />
      :<EmptyBox/> 
    }
    </div>
  );
};

export default ManageOrderAdmin;
