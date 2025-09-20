// PaymentPage.jsx
import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.scss";
import { Select } from "antd";
import { StoreContext } from "../../context/StoreContext";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { MdOutlineMedicalInformation } from "react-icons/md";
import { LiaShippingFastSolid } from "react-icons/lia";

import AddressList from "../../components/ManageAddress/AddressList";
import { toast } from "react-toastify";
import { createNewOrderService, deleteUserAddressService } from "../../service/apiService";
import { useNavigate } from "react-router";
import { LINK } from "../../utils/constant";
import DeleteAddressModal from "../../components/Modal/DeleteAddressModal";
export default function PlaceOrder() {

    /// 
    const [isShowModalDelete,setIsShowModalDelete]=useState(false)
    const [deleteAddress,setDeleteAddress]=useState(null);
    
  const navigate=useNavigate()
  const {address,getUserCart,refetchOrderPagenate,cart,methodPayment,loading,setLoading,getAllUserAddress}=useContext(StoreContext)
  const [selectedAddress,setSelectedAddress]=useState(undefined)
  const [isUpdate,setIsUpdate]=useState(false);
  const [nameMethod,setNameMethod]=useState("Tiền mặt");
  const [form, setForm] = useState({
    phone: "",
    commune: "",
    city: "",
    province: "",
    detail: "",
  });
  const [method, setMethod] = useState(0);
  const handleBlockedInputClick = (e) => {
    if (selectedAddress) return;
    e.preventDefault();
    toast.warning("Hãy chọn địa chỉ");
  };
  const notifySelectAddress = (e) => {
    if (selectedAddress) return;
    e.preventDefault();
    toast.warning("Hãy chọn địa chỉ");
    if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
      e.currentTarget.blur();
    }
  };
  // const notifySelectAddress = (e) => {
  //   e.preventDefault();
  //   toast.warning("Hãy chọn địa chỉ");
  //   if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
  //     e.currentTarget.blur();
  //   }
  // };
  const toggleDeleteModal=(item)=>{
    if(isShowModalDelete)
    {
      setDeleteAddress(null)
      setIsShowModalDelete(false)
    }
    else 
    {
      setDeleteAddress(item);
      setIsShowModalDelete(true);
    }
  }
  const handleComfirmDelete=async()=>{
    const id= deleteAddress?.id;
    if(id)
    {
       setLoading(true);
      const response = await deleteUserAddressService(id);
      if(response && response.ec===200)
      {
        toast.success(response.em)
        getAllUserAddress()
      }
       setLoading(true);
    }
  }
  const onChange = (e,item) => {
    const data={
    phone: item && item?.address && item?.address?.phone  ? item.address.phone : '',
    commune: item && item?.address && item?.address?.village  ? item.address.village : '',
    city: item && item?.address && item?.address?.district  ? item.address.district : '',
    province: item && item?.address && item?.address?.province  ? item.address.province : '',
    detail: item && item?.address && item?.address?.detail  ? item.address.detail : '',
    }
    setSelectedAddress(e);
     setForm(data)
     setIsUpdate(true)
  };
  const onSearch = (value) => {
  };
  
  useEffect(()=>{
    if(methodPayment && methodPayment.length>0){
      setMethod(methodPayment[0].id)
    }
  },[methodPayment])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = () => {
    return Boolean(selectedAddress);
  };

  const handlePay = async () => {
    if (!isValid()) return;
    const data={
   addressId:selectedAddress,
   paymentId:method
    }
    if(!data.addressId || !data.paymentId )
    {
      toast.error("Dã xảy ra lỗi!")
      return;
    }
    setLoading(true)
    const response= await createNewOrderService(data);
    if(nameMethod==="Tiền mặt")
    {
      if(response && response.ec===201){
      toast.success(response?.em);
      refetchOrderPagenate()
      getUserCart()
      navigate(LINK.LIST_ORDERS);
    }
    else 
    {
      toast.error(response?.em)
    }
    setLoading(false)
    }
    else if(nameMethod==="Stripe")
    {
      if(response && response.ec===201)
      {
        window.location.href = response.dt.paymentUrl;
      }
      setLoading(false);
    }

  }

  const getDataAddress=()=>{
    let items=[]
    if(address && address.length>0)
    {
      for(let i =0 ;i<address.length;i++)
      {
        const item={
          value:address[i].id,
          label:address[i].detail,
          address:address[i]
        }
        items.push(item)
       
      }
    }
    return items;
  }
  return (
    <>
    <div className="payment_page_cover_all">
      <div className="payment-page">
        <div className="container">
          <div className="left">
          <Tabs
    defaultActiveKey="1"
    items={[{icon:<LiaShippingFastSolid/>,title:`Thông tin giao hàng`,children:<>
          <div className="h-100 w-100">
            <label className="field">
              <span>Số điện thoại</span>
              <input
                name="phone"
                readOnly
                aria-readonly={true}
                onClick={notifySelectAddress}
                onKeyDown={(e)=>e.preventDefault()}
                value={form.phone}
                placeholder="Ví dụ: 0901234567"
              />
            </label>

            <div className="row">
              <label className="field small">
                <span>Xã</span>
                <input
                readOnly
                  aria-readonly={true}
                  onClick={notifySelectAddress}
                  onKeyDown={(e)=>e.preventDefault()}
                  name="commune"
                   value={form.commune}
                  placeholder="Xã/Phường"
                />
              </label>

              <label className="field small">
                <span>Thành phố</span>
                <input
                  name="city"
                  readOnly
                  aria-readonly={true}
                  onClick={notifySelectAddress}
                  onKeyDown={(e)=>e.preventDefault()}
                   value={form.city}
                  placeholder="Quận/Huyện"
                />
              </label>
            </div>

            <label className="field">
              <span>Tỉnh/Thành</span>
              <input
                name="province"
                readOnly
                aria-readonly={true}
                onClick={notifySelectAddress}
                onKeyDown={(e)=>e.preventDefault()}
                 value={form.province}
                placeholder="Tỉnh/Thành phố"
              />
            </label>

            <label className="field">
              <span>Địa chỉ chi tiết</span>
              <textarea
                name="detail"
                readOnly
                aria-readonly={true}
                onClick={notifySelectAddress}
                onKeyDown={(e)=>e.preventDefault()}
                 value={form.detail}
                placeholder="Số nhà, đường, chung cư,..."
              />
            </label>
           <div className="row align-items-center  ">
            <div className="col-12">
                 <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 px-0">
               <Select style={{width:"100%",padding:"0px"}}
               getPopupContainer={(triggerNode) => triggerNode.parentNode}
              showSearch
              placeholder="Chọn địa chỉ giao hàng"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={getDataAddress()}
             
             
            />
            </div>
            
          
            </div>
           
           </div>
           </div>
        </>},{icon:<MdOutlineMedicalInformation />,title:`Địa chỉ người dùng`,children:<AddressList togleDelete={toggleDeleteModal}/>} ].map((item, i) => {
      const id = String(i + 1);
      return {
        key: id,
        label: item.title,
        children:item.children ,
        icon: item.icon,
      };
    })}
  />
          </div>

          <aside className="right">
            <h3>Đơn hàng</h3>

            <div className="items">
              {cart && cart.listCartItems && cart.listCartItems.length>0 && cart.listCartItems.map((it) => (
                <div className="item" key={it?.id}>
                  <div className="name">
                    {it?.food.name} <small>×{it?.quantity}</small>
                  </div>
                  <div className="price">
                    {(it?.totalPrice).toLocaleString()}₫
                  </div>
                </div>
              ))}
            </div>

            <div className="summary d-flex justify-content-end">
              <div className="total">
                <span>Tổng thanh toán: </span>
                <strong>{cart?.total}₫</strong>
              </div>
            </div>

            <div className="methods">
             {methodPayment && methodPayment.length>0 && methodPayment.map((item,index)=>{
              const isVnp = typeof item?.name === 'string' && /vnp/i.test(item.name);
              const isActive = method === item?.id;
              return  <label
                key={item?.id}
                className={`method ${isActive ? "active" : ""} ${isVnp ? "disabled" : ""}`}
                onClick={isVnp ? (e)=>{ e.preventDefault(); toast.info("Phương thức VNP chưa khả dụng"); } : undefined}
              >
                <input
                  type="radio"
                  name="pay"
                  value={item?.id}
                  checked={isActive}
                  disabled={isVnp}
                  onChange={() =>{
                    if(isVnp){
                      toast.info("Phương thức VNP chưa khả dụng");
                      return;
                    }
                    setNameMethod(item?.name);
                    setMethod(item?.id)
                  }}
                />
                <div className="meta">
                  <div className="title">{item?.name}</div>
                  <div className="desc">{item?.desciption}</div>
                </div>
              </label>
             })}
            </div>

            <button
              className="payButton"
              onClick={handlePay}
              disabled={!isValid() || loading}
              aria-disabled={!isValid() || loading}
            >
              {loading
                ? "Đang xử lý..."
                : `Thanh toán ${cart?.total}₫`}
            </button>
          </aside>
        </div>
      </div>
    </div>
    {isShowModalDelete && <DeleteAddressModal isOpen={isShowModalDelete} onClose={toggleDeleteModal}
    onConfirm={handleComfirmDelete} address={deleteAddress?.detail}
    />}
    </>
    
  );
}
