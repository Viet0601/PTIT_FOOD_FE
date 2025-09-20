import React, { useState, useEffect } from "react";
import "./ManageListFoodAdmin.scss";
import { useContext } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { Pagination } from "antd";
import { useNavigate } from "react-router";
import { LINK } from "../../../../utils/constant";
import DeleteFoodModal from "../../../../components/Modal/DeleteFoodModal";
import { deleteFoodAdminService, getAllFoodService } from "../../../../service/apiService";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../../../queryKey/queryKey";
import EmptyBox from "../../../../components/Emty/EmptyBox";


const ManageListFoodAdmin = () => {
  const [showDelete,setShowDelete]=useState(false);
  const navigate=useNavigate()
  const {limit,getAllFood,setLoading}=useContext(StoreContext)
  const [page,setPage]=useState(1);
  const [foodDelete,setFoodDelete]=useState(undefined)
  useEffect(() => {
    window.scrollTo({top:0,behavior:"smooth"});
  }, [page]);
  const {data:foods,isLoading,isError,error,isPending,refetch:refetchListFoods}= useQuery({
    queryKey:queryKey.fetchAllFoodByPaginate(page),
    queryFn:async()=>{
      setLoading(true)
      const reponse= await getAllFoodService(page,limit,"ALL");
      if(reponse && reponse.ec==200)
      {
        setLoading(false)
        return reponse.dt;
      }
      setLoading(false)
      return [];

    }
  })    
  const handleEdit = (id) => {
    navigate(`${LINK.ADMIN_UPDATE_FOOD}/${id}`)
  };

  const handleDelete = async() => {
    const id= foodDelete?.id;
    if(id)
    {
       setLoading(true);
      const response =await deleteFoodAdminService(id);
      if(response && response.ec===200)
      {
        toast.success(response.em);
        setShowDelete(false)
      }
      else 
      {
         toast.error(response.em);
      }
       setLoading(false);
    }
  };
  const toggleModal=(item)=>{
    if(showDelete)
    {
      setShowDelete(!showDelete)
      setFoodDelete(undefined)
    }
    else 
    {
      setShowDelete(!showDelete)
      setFoodDelete(item)
    }
  }
const handleChangePage=(e)=>{
  setPage(e)
}
  return (
    <>
    <div className="admin-foods">
      <div className="d-flex align-items-center justify-content-between">

      <h2 className="title">Quản lý Món Ăn</h2>
        <button onClick={()=>refetchListFoods()} className="btn-detail">Làm mới</button>
      </div>
      <div className="foods-table">
        <div className="table-header">
          <div>Ảnh</div>
          <div>Tên món</div>
          <div>Loại</div>
          <div>Giá</div>
          <div>Hành động</div>
        </div>
        {foods && foods.listFood && foods.listFood.length>0 && foods.listFood.map((food) => (
          <div className="table-row" key={food.id}>
            <div>
              <img src={food.images[0]} alt={food.name} className="food-img" />
            </div>
            <div>{food.name}</div>
            <div>{food.category.name}</div>
            <div>{food.price.toLocaleString()} đ</div>
            <div className="actions">
              <button
                className="btn edit"
                onClick={() => handleEdit(food.id)}
              >
                Sửa
              </button>
              <button
                className="btn delete"
                onClick={() => toggleModal(food)}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      {foods && foods.listFood && foods.listFood.length>0 ?  <Pagination onChange={(e)=>handleChangePage(e)} className="mt-4" align="center" current={page} total={foods.totalPage  * 10} />
      :<EmptyBox/>}
    </div>
      {showDelete && <DeleteFoodModal onClose={toggleModal} isOpen={showDelete} foodName={foodDelete?.name} onConfirm={handleDelete} />}
    </>
  );
};

export default ManageListFoodAdmin;
