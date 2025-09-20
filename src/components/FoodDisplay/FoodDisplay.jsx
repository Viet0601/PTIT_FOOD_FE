import React, { useContext, useEffect } from "react";
import "./FoodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination, Table } from "antd";
import { useNavigate } from "react-router";
import { LINK } from "../../utils/constant";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../../queryKey/queryKey";
import { getAllFoodService } from "../../service/apiService";

const DISHES = [
  { id: 1, name: "Bún Bò Huế", price: 59000, category: "Món chính", rating: 4.8, img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop" },
  { id: 2, name: "Phở Bò", price: 55000, category: "Món chính", rating: 4.9, img: "https://images.unsplash.com/photo-1544025162-84b7e6aa8f6f?q=80&w=1200&auto=format&fit=crop" },
  { id: 3, name: "Gỏi Cuốn", price: 35000, category: "Khai vị", rating: 4.7, img: "https://images.unsplash.com/photo-1544025161-d8b7b1a69831?q=80&w=1200&auto=format&fit=crop" },
  { id: 4, name: "Bánh Mì", price: 25000, category: "Khai vị", rating: 4.6, img: "https://images.unsplash.com/photo-1604908176997-4313b5a4b4b9?q=80&w=1200&auto=format&fit=crop" },
  { id: 5, name: "Chè 3 Màu", price: 30000, category: "Tráng miệng", rating: 4.5, img: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1200&auto=format&fit=crop" },
  { id: 6, name: "Bánh Flan", price: 28000, category: "Tráng miệng", rating: 4.4, img: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?q=80&w=1200&auto=format&fit=crop" },
  { id: 7, name: "Cà Phê Sữa", price: 22000, category: "Đồ uống", rating: 4.8, img: "https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=1200&auto=format&fit=crop" },
  { id: 8, name: "Trà Đào", price: 26000, category: "Đồ uống", rating: 4.6, img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop" },
  { id: 9, name: "Cơm Tấm", price: 52000, category: "Món chính", rating: 4.7, img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop" },
  { id: 10, name: "Nem Rán", price: 42000, category: "Khai vị", rating: 4.7, img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1200&auto=format&fit=crop" },
  { id: 11, name: "Chè Khúc Bạch", price: 32000, category: "Tráng miệng", rating: 4.5, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=1200&auto=format&fit=crop" },
  { id: 12, name: "Nước Chanh", price: 18000, category: "Đồ uống", rating: 4.3, img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1200&auto=format&fit=crop" },
];


const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const FoodDisplay = (props) => {
  const {favoriteFood,addToFavoriteFood,addToCart,limit,setLoading} = useContext(StoreContext);
  // const { category } = props;
  const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sort, setSort] = useState("popular");
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(1);
    const navigate=useNavigate()
    const topRef = React.useRef(null)
    
    const {data:foods,isLoading,isError,error,isPending,refetch:refetchListFoods}= useQuery({
      queryKey:queryKey.fetchAllFoodByPaginate(page),
      queryFn:async()=>{
        // setLoading(true)
        const reponse= await getAllFoodService(page,limit,"ALL");
        if(reponse && reponse.ec==200)
        {
          // setLoading(false)
          return reponse.dt;
        }
        // setLoading(false)
        return [];
  
      }
    }) 
    const handleChangePage=(e)=>{
      setPage(e)
      if(topRef && topRef.current){
        const SCROLL_OFFSET = 80;
        const targetTop = topRef.current.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    }
   
   
    const toggleFav = (id) =>
      setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  
   
  
    // Reset page khi thay filter
    React.useEffect(() => { setPage(1); }, [query, category, sort]);
  
  return (
    <div className="food-display container" ref={topRef}>
      <h2>Món ăn gần bạn</h2>
      {/* <div className="food-display-list row mt-3">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-4 food-item" key={index}>
                <FoodItem item={item} />
              </div>
            );
          }
        })}
      </div> */}
        <AnimatePresence mode="popLayout">
       {foods && foods.listFood && foods.listFood.length>0&& <motion.ul
          className="fg-grid"
          layout
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          { foods && foods.listFood && foods.listFood.length>0 &&  foods.listFood.map((d) => (
            <motion.li key={d.id} className="card" variants={fadeIn} layout>
              <div className="thumb" style={{cursor:"pointer"}} onClick={()=>navigate(`${LINK.FOOD_DETAIL}/${d?.id}`)}>
                <img src={d.images[0]} alt={d.name} loading="lazy" />
                <button
                  className={"fav " + (favoriteFood.some((item)=>item.id===d.id) ? "on" : "")}
                  onClick={(e) =>{
                    e.stopPropagation();
                    addToFavoriteFood(d.id)
                  } }
                  aria-label="Yêu thích"
                >
                  <Heart size={18} />
                </button>
              </div>
              <div className="info">
                <div className="title-row">
                  <h3>{d.name}</h3>
                  <span className="category">{d.category.name}</span>
                </div>
                <div className="meta">
                  <span className="rating">★ {d.star}</span>
                  <span className="price">{d.price.toLocaleString("vi-VN")}₫</span>
                </div>
                <button className="add-btn" onClick={() => addToCart({foodId:d.id,quantity:1})}>
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </button>
              </div>
            </motion.li>
          ))}
        </motion.ul>}
      {foods && foods.listFood && foods.listFood.length===0 &&   <div className="box_empty w-100">
          <Table style={{width:"100%",height:"100%"}} columns={[]} dataSource={[]} />
        </div>}
      </AnimatePresence>

      {/* Pagination */}
          {foods && foods.listFood && foods.listFood.length>0 &&  <Pagination onChange={(e)=>handleChangePage(e)} className="mt-4" align="center" current={page} total={!isNaN(foods.totalPage) ? foods.totalPage*10 : "1"} />}

    </div>
  );
};

export default FoodDisplay;
