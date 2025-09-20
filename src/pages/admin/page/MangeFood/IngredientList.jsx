import React, { useEffect, useState } from "react";
import "./IngredientList.scss";
import { Pagination, Table } from "antd";
import { useContext } from "react";
import { StoreContext } from "../../../../context/StoreContext";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../../../queryKey/queryKey";
import { getAllIngredientService, updateIngredientService } from "../../../../service/apiService";
import { toast } from "react-toastify";

const IngredientList = ({  onUpdate, onDelete }) => {
const {limit,loading,setLoading}=useContext(StoreContext)
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const {data:ingredients,isLoading,isPending,refetch}=useQuery({
    queryKey:queryKey.fetchListIngredient(currentPage),
    queryFn:async()=>{
         setLoading(true);
        const response = await getAllIngredientService(currentPage,limit);
      
        if(response && response.ec===200)
        {
            setLoading(false)
            setTotal(response?.dt?.totalPage);
            return response.dt?.list;
        }
        setLoading(false)
        return []
    }
  })

  const handleEdit = (index, item) => {
    setEditingIndex(index);
    setEditName(item.name);
    setEditAmount(item.unit);
  };

  const handleSave = async(index,id) => {
    if(loading) return;
    if (!editName.trim() || !editAmount.trim() || !id) return;
    const data={
        name:editName,
        unit:editAmount
    }
    setLoading(true);
    const response =await updateIngredientService(data,id);
    if(response && response.ec===200)
    {
        toast.success(response.em);
        setEditingIndex(null);
        refetch()
    }
    else 
    {
        toast.error(response.message)
    }
    setLoading(false)
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };
  const handleChangePage=(e)=>{
    setCurrentPage(e);
    setEditingIndex(null)
  }
 
  // const filtered = React.useMemo(() => {
  //   if (!query.trim()) return items &&  items.list || [];
  //   const q = query.toLowerCase();
  //   return items &&   items.list.filter((f) =>
  //     f.name.toLowerCase().includes(q) ||
  //     f.email.toLowerCase().includes(q) ||
  //     f.subject.toLowerCase().includes(q) ||
  //     f.message.toLowerCase().includes(q)
  //   );
  // }, [items && items.list, query]);

  return (
    <div className="ingredient-list" style={{minHeight:"300px"}}>
       <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="title">Danh sách nguyên liệu</h2>
      <button onClick={()=>refetch()} className="btn-detail">Làm mới</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tên nguyên liệu</th>
            <th>Đơn vị</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {ingredients && ingredients.length>0 && ingredients.map((item, idx) => (
            <tr key={idx}>
              <td>
                {editingIndex === idx ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingIndex === idx ? (
                  <input
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                ) : (
                  item.unit
                )}
              </td>
              <td>
                {editingIndex === idx ? (
                  <>
                    <button className="btn save" onClick={() => handleSave(idx,item?.id)}>
                      Lưu
                    </button>
                    <button className="btn cancel" onClick={handleCancel}>
                      Hủy
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(idx, item)}
                    >
                      Sửa
                    </button>
                  
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
      {ingredients && ingredients && ingredients.length>0 &&   <Pagination onChange={(page)=>handleChangePage(page)} className="mt-4" align="center" current={currentPage} total={total  * 10} />}
      </div>
    {ingredients  && ingredients.length===0 && <Table dataSource={[]} columns={[]}/>}
    
    </div>
  );
};

export default IngredientList;
