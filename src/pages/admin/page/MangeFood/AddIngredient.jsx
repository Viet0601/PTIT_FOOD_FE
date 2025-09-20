import React, { useContext, useState } from "react";
import "./AddIngredient.scss";
import { StoreContext } from "../../../../context/StoreContext";
import { addNewIngredient } from "../../../../service/apiService";
import { toast } from "react-toastify";

const AddIngredient = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
    const {loading,setLoading,getIngredient}= useContext(StoreContext);
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(loading ) return ;
    if (!name.trim() || !amount.trim()) return;

    const newIngredient = { name, unit:amount };
    setLoading(true)
    const reponse= await addNewIngredient(newIngredient);
    if(reponse && reponse.ec===201)
    {
        toast.success(reponse.em);
        setName("")
        setAmount("");
        getIngredient()
    }
    else 
    {
        toast.error(reponse.message)
    }
    setLoading(false)
  };

  return (
    <div className="add-ingredient">
      <form className="ingredient-form" onSubmit={handleSubmit}>
        <h2 className="title">Thêm Nguyên Liệu</h2>

        <div className="form-group">
          <label htmlFor="name">Tên nguyên liệu</label>
          <input
            type="text"
            id="name"
            placeholder="Nhập tên nguyên liệu..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Đơn vị</label>
          <input
            type="text"
            id="amount"
            placeholder="Ví dụ: ml,gram,củ,..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Thêm mới
        </button>
      </form>
    </div>
  );
};

export default AddIngredient;
