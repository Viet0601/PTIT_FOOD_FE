import React, { useContext, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import "./FoodShowcase.scss"; // ⬅️ Tạo file SCSS theo mẫu ở cuối (copy phần /* --- SCSS --- */)
import { StoreContext } from "../../context/StoreContext";
import { useQuery } from "@tanstack/react-query";
import {  addToFavoriteService, getAllFoodService } from "../../service/apiService";
import { queryKey } from "../../queryKey/queryKey";
import { useNavigate } from "react-router";
import { LINK } from "../../utils/constant";
import { Pagination, Table } from "antd";
import { toast } from "react-toastify";

/**
 * Demo data — bạn có thể fetch từ API sau này
 */



const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function FoodGallery() {
  const navigate=useNavigate()
  const {CATEGORIES,favoriteFood,addToFavoriteFood,addToCart}=useContext(StoreContext)
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("0");
  const [sort, setSort] = useState("popular");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [listIdFavoriteFood,setlistIdFavoriteFood]=useState([]);
  const perPage = 8;
  const topRef = React.useRef(null);
  function removeAccents(str) {
    return str
      .normalize("NFD")              // tách chữ cái và dấu
      .replace(/[\u0300-\u036f]/g, "") // xóa dấu
      .replace(/đ/g, "d")             // thay đ -> d
      .replace(/Đ/g, "D");            // thay Đ -> D
  }
  useEffect(()=>{
    if(favoriteFood && favoriteFood.length>0)
    {
      let id=[]
      for(let i=0;i<favoriteFood.length;i++){
        id.push(favoriteFood[i].id);
      }
      setlistIdFavoriteFood(id);
    }
  },[favoriteFood])
    const { error,isError,data:foods } = useQuery({
  queryKey: queryKey.fetchFoodByCategory(page,category),
  queryFn: async () => {
    const response= await getAllFoodService(page,perPage,category==="0"?'ALL':category)
    if(response && response.ec===200)
    {
      return response.dt;
    }

    return []
  },
})
  
  const filtered = useMemo(() => {
    let items = foods && foods.listFood &&  foods.listFood.filter(d =>
      removeAccents(d.name.toLowerCase()).includes(
        removeAccents(query.trim().toLowerCase())
      )
    );
    if (sort === "price-asc" && items)   items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "price-desc"  && items) items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "popular"  && items) items = [...items].sort((a, b) => b.star - a.star);

    return items;
  }, [query, sort,foods]);


  const toggleFav = async(id) =>{
    addToFavoriteFood(id);
  }
    
  const handleChangePage=(e)=>{
    setPage(e)
  }
  useEffect(()=>{
    if (topRef && topRef.current) {
      const SCROLL_OFFSET = 80; // pixels to scroll above the component
      const targetTop = topRef.current.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  },[page])
  // Reset page khi thay filter
  React.useEffect(() => { setPage(1); }, [category]);
  return (
    <div className="fg-wrapper container" ref={topRef}>
      <header className="fg-header">
        <div className="left">
          <motion.h1 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Danh sách món ăn
          </motion.h1>
          <p className="subtitle">Đầy đủ các món ăn • Lọc theo loại • Theo giá cả</p>
        </div>
     
      </header>

      {/* Controls */}
      <div className="fg-controls">
        <div className="search">
          <Search size={18} />
          <input
            placeholder="Tìm món…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="icon-btn" aria-label="clear" onClick={() => setQuery("")}> 
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filters">
          <Filter size={18} />
          {CATEGORIES.map((c,index) => (
            <button
              key={index}
              className={"chip " + (Number(category) === c.id ? "active" : "")}
              onClick={() => setCategory(String(c?.id))}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="sort">
          <label>Sắp xếp</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Đánh giá cao</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.ul
          className={filtered && filtered.length>0 ? "fg-grid":"fg-grid-no-data"}
          layout
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        >
          {filtered && filtered.length>0 ? filtered.map((d) => (
            <motion.li key={d.id} className="card" variants={fadeIn} layout>
              <div className="thumb" style={{cursor:"pointer"}} onClick={()=>navigate(`${LINK.FOOD_DETAIL}/${d?.id}`)}>
                <img src={d.images[0]} alt={d.name} loading="lazy" />
                <button
                  className={"fav " + (listIdFavoriteFood.includes(d.id) ? "on" : "")}
                  onClick={(e) =>{
                    e.stopPropagation()
                    toggleFav(d.id)
                  }}
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
                {/* {d.rating.toFixed(1)} */}
                <div className="meta">
                  <span className="rating"><span style={{color:"#FFCD43"}}>★</span> {d?.star}</span>
                  <span className="price">{d.price.toLocaleString("vi-VN")}₫</span>
                </div>
                <button className="add-btn" onClick={() => addToCart({foodId:d?.id,quantity:1})}>
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </button>
              </div>
            </motion.li>
          )):<Table style={{width:"100%",height:"100%"}} columns={[]} dataSource={[]} />}
        </motion.ul>
      </AnimatePresence>

      {/* Pagination */}
      {foods && foods.listFood && foods.listFood.length>0 &&  <div className="fg-pagination">
        <Pagination  onChange={(e) => handleChangePage(e)} className="mt-4" align="center" current={page} total={foods && foods.totalPage  * 10} />
      </div>}

      {/* Gợi ý: Bạn có thể đưa cart & favorites lên Context/Redux khi làm thật */}

      {/* --- SCSS ---
      Tạo file: src/FoodGallery.scss
      Dán nội dung dưới đây vào file SCSS của bạn.
      Bạn có thể đổi màu chủ đạo bằng $primary.


      */}
    </div>
  );
}
