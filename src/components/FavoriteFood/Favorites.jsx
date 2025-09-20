
import React, { useContext, useMemo, useState } from "react";
import "./Favorites.scss";
import { StoreContext } from "../../context/StoreContext";
import emptyImage from "../../assets/assets/frontend_assets/empty.png"
import { useNavigate } from "react-router";
import { LINK } from "../../utils/constant";

export default function Favorites({
  initialItems,
  onAddToCart,
  onRemove,
}) {
  const {favoriteFood,CATEGORIES,addToFavoriteFood,addToCart}=useContext(StoreContext)
  const navigate=useNavigate()

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(CATEGORIES.map((i) => i.name)));
    return ["All", ...cats];
  }, [CATEGORIES]);

  const filtered = useMemo(() => {
    let out = [...favoriteFood];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      out = out.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.name.toLowerCase().includes(q) ||
          (i.description?.toLowerCase().includes(q) ?? false)
      );
    }

    if (category !== "All") {
      out = out.filter((i) => i.category.name === category);
    }
    switch (sortBy) {
      case "price_asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        // recommended: keep demo order (or apply custom ranking)
        break;
    }

    return out;
  }, [favoriteFood, query, category, sortBy]);

  const handleRemove = (id) => {
    if (onRemove) {
      onRemove(id);
    }
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const handleAddToCart = (item) => {
    const foodId=item?.id;
    const quantity=1;
    if(foodId)
    {
      addToCart({foodId,quantity})
    }
  };

  return (
    <div className="fv-page container">
      <header className="fv-header">
        <h1>Món yêu thích</h1>
        <p>Lưu trữ những món bạn thích để đặt nhanh hơn.</p>
      </header>

      <div className="fv-toolbar">
        <div className="fv-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, loại, mô tả..."
            aria-label="Tìm món yêu thích"
          />
          <span className="fv-search-icon" aria-hidden>🔎</span>
        </div>

        <div className="fv-controls">
          <div className="fv-categories" role="tablist" aria-label="Bộ lọc danh mục">
            {categories && categories.length>0 && categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={`fv-chip ${category === c ? "active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="fv-sort">
            <span>Sắp xếp:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recommended">Gợi ý</option>
              <option value="price_asc">Giá tăng dần</option>
              <option value="price_desc">Giá giảm dần</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="fv-empty">
          <img
            src={emptyImage}
            alt="Empty favorites"
            loading="lazy"
          />
          <h3>Chưa có món yêu thích</h3>
          <p>Hãy thêm những món bạn thích để xem lại tại đây.</p>
          <button className="fv-btn" onClick={() => navigate(LINK.FOOD_COLLECTION)}>Khám phá món ăn</button>
        </div>
      ) : (
        <ul className="fv-grid" role="list">
          {filtered && filtered.length >0 && filtered.map((item) => (
            <li key={item.id} className="fv-card" role="listitem">
              <div className="fv-media">
                <img src={item && item.images[0]} alt={item?.name} loading="lazy" />
                {item.rating && (
                  <div className="fv-badge" aria-label={`Đánh giá ${item.rating}`}>
                    ★ 4.8
                  </div>
                )}
                <button
                  className="fv-like active"
                  title="Xóa khỏi yêu thích"
                  aria-label="Xóa khỏi yêu thích"
                  onClick={() => addToFavoriteFood(item.id)}
                >
                  ❤
                </button>
              </div>

              <div className="fv-body">
                <h3 className="fv-title" title={item?.name}>{item?.name}</h3>
                <div className="fv-meta">
                  <span className="fv-category">{item?.category?.name}</span>
                  <span className="fv-dot" />
                  <span className="fv-price">{item?.price.toLocaleString()} đ</span>
                </div>
                {item?.description && <p className="fv-desc">{item?.description}</p>}
              </div>

              <div className="fv-actions">
                <button className="fv-btn outline" onClick={() => addToFavoriteFood(item.id)}>
                  Gỡ yêu thích
                </button>
                <button className="fv-btn" onClick={() => handleAddToCart(item)}>
                  Thêm vào giỏ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

