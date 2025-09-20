// File: AddressList.jsx
import React, { useContext, useState } from 'react';
import './AddressList.scss';
import { StoreContext } from '../../context/StoreContext';
import { addNewAddressService, updateAddressService } from '../../service/apiService';
import { data } from 'react-router';
import { toast } from 'react-toastify';

function AddressForm({updateId=null, initialData = {}, onSave, onCancel , isAdd=true , getAllAddress,setLoading }) {
  const [form, setForm] = useState({
    phone: initialData.phone || '',
    village: initialData.village || '',
    district: initialData.district || '',
    province: initialData.province || '',
    detail: initialData.detail || '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  const resetForm=()=>{
     setForm({
    phone: '',
    village: '',
    district: '',
    province:  '',
    detail: '',
  })
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if(isAdd)
    {
       setLoading(true);
      const response=await addNewAddressService(form);
      if(response && response.ec===201)
      {
        toast.success(response.em);
        getAllAddress();
       resetForm()
      }
       setLoading(false);
    }
    else 
    {
      if(updateId)
      {
         setLoading(true);
        const response=await updateAddressService(updateId,form);
        if(response && response.ec===200)
        {
          getAllAddress()
          toast.success(response.em);
          resetForm();
          onCancel()
          
        }
         setLoading(false);
      }
      
    }
  }
  
  return (
    <form className="addr-form" onSubmit={handleSubmit}>
      <div className="addr-grid">
        <input
          name="phone"
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="village"
          placeholder="Xã"
          value={form.village}
          onChange={handleChange}
          required
        />
        <input
          name="district"
          placeholder="Huyện"
          value={form.district}
          onChange={handleChange}
          required
        />
        <input
          name="province"
          placeholder="Tỉnh"
          value={form.province}
          onChange={handleChange}
          required
        />
      </div>
      <textarea
        name="detail"
        placeholder="Địa chỉ chi tiết"
        value={form.detail}
        onChange={handleChange}
        required
      />

      <div className="addr-actions">
        <button type="button" className="btn cancel" onClick={onCancel}>
          Hủy
        </button>
        <button type="submit" className="btn save">
         {isAdd ? "Thêm":"Cập nhật"}
        </button>
      </div>
    </form>
  );
}

export default function AddressList({togleDelete}) {
 const {address,getAllUserAddress,setLoading}= useContext(StoreContext)
  const [updateAddres,setUpdateAddress]=useState({})
  const [adding, setAdding] = useState(true);
  const [isOPen, SetIsOpen] = useState(false);
  const [isOpenDelete,setIsOpenDelete]=useState(false)
  const [updating, setUpdating] = useState(false);

  async function handleAdd(newAddress) {
  
    setAdding(false);
    SetIsOpen(true)
  }

  function handleUpdate(updated) {
    setAdding(false)
    setUpdating(true)
    
  }

 
  return (
    <div className="addr-container">
      <header className="addr-header">
        <h2 style={{fontSize:"22px"}}>Danh sách địa chỉ</h2>
        {adding && !isOPen&& (
          <button className="btn add" onClick={() =>{ SetIsOpen(true); setUpdating(false)} }>
            + Thêm địa chỉ
          </button>
        )}
      </header>

      {isOPen && (
        <AddressForm
        setLoading={setLoading}
          onSave={handleAdd}
          onCancel={() => SetIsOpen(false)}
          getAllAddress={getAllUserAddress}
        />
      )}

      {updating&& (
        <AddressForm
          initialData={updateAddres}
          onSave={handleUpdate}
          onCancel={() => {
            setAdding(true)
            setUpdating(false)
          }}
          isAdd={false}
          updateId={updateAddres?.id}
          getAllAddress={getAllUserAddress}
        />
      )}

      <ul className="addr-list">
        {address.map((a, i) => (
          <li key={i} className="addr-item">
            <div className="addr-info">
              <p><strong>ĐT:</strong> {a.phone}</p>
              <p>
                {a.detail}, {a.village}, {a.district}, {a.province}
              </p>
            </div>
            <div className="addr-item-actions">
              <button className="btn edit" onClick={  () =>{
                SetIsOpen(false)
                setUpdateAddress(a)
                setUpdating(true)
              } }>
                Sửa
              </button>
              <button  className="btn delete" onClick={() => togleDelete(a)}>
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


