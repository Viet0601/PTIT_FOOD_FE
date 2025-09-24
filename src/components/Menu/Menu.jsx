import React, { useContext } from "react";
import "./Menu.scss";
import { menu_list } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodListLoading from "../Loading/FoodListLoading";
import { LINK } from "../../utils/constant";

const Menu = () => {
   const {CATEGORIES,loadingCategory,setCategory,navigate} = useContext(StoreContext)
  return (
    <div className="menu container" id="menu-list">
      <h2>Thực đơn hôm nay</h2>
      <p>Vô số món ăn thơm ngon, đặc biệt dành riêng cho quý khách</p>
      <div className="mt-2">
        {loadingCategory ? <FoodListLoading count={4}/> :  <div className="menu-list">
        {CATEGORIES && CATEGORIES.length>0 && CATEGORIES.map((item,index)=>(
          
           <div onClick={()=>{
            setCategory(item.id);
            navigate(LINK.FOOD_COLLECTION)
           }} className="menu-list-item" key={index}>
                <img  src={item.url || ''} alt="" />
                <p>{item.name}</p>
            </div>
        ))}
       
      </div>}
      </div>
      <hr/>
    </div>
  );
};

export default Menu;
