import React, { useContext, useState } from "react";
import "./FoodItem.scss";
import { Card } from "antd";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { BACKEND_IMAGE } from "../../utils/constant";
const { Meta } = Card;
const FoodItem = (props) => {
  const { item } = props;
  const {cartItem,removeToCart,addToCart,setcartItem}=useContext(StoreContext)
  const imageFile=`${BACKEND_IMAGE}/${item?.image}`
 
  return (
    <>
      <Card
        hoverable
        style={{ width: "100%" }}
        cover={<img style={{width:'100%', height:'auto'}} alt="example" src={imageFile} />}
      >
        {!cartItem[item?._id] ? (
          <div className="food-add-and-remove-have-no-count">
            <img onClick={()=>addToCart(item?._id)} src={assets.add_icon_green} alt="" />
          </div>
        ) : (
          <div className="food-add-and-remove-have-count">
            <img onClick={()=>removeToCart(item?._id)} src={assets.remove_icon_red} alt="" />
            <p className="food-count-order">{cartItem[item?._id]}</p>
            <img onClick={()=>addToCart(item?._id)} src={assets.add_icon_green} alt="" />
          </div>
        )}

        <div className="food-information">
          <div className="food-rating">
            <p className="food-name">{item.name}</p>
            <img src={assets.rating_starts} alt="" />
          </div>
          <p className="food-description">{item.description}</p>
          <p className="food-price">${item.price}</p>
        </div>
      </Card>
    </>
  );
};

export default FoodItem;
