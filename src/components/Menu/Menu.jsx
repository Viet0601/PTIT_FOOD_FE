import React from "react";
import "./Menu.scss";
import { menu_list } from "../../assets/assets/frontend_assets/assets";

const Menu = (props) => {
    const {category,setcategory} = props
  return (
    <div className="menu container" id="menu-list">
      <h2>Thực đơn hôm nay</h2>
      <p>Vô số món ăn thơm ngon, đặc biệt dành riêng cho quý khách</p>
      <div className="menu-list">
        {menu_list.map((item,index)=>(
          
           <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="menu-list-item" key={index}>
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                <p>{item.menu_name}</p>
            </div>
        ))}
       
      </div>
      <hr/>
    </div>
  );
};

export default Menu;
