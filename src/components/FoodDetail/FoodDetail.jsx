import React, { useState, useEffect, useContext } from 'react';
import { Heart, ShoppingCart, Minus, Plus, Star, Clock, Users } from 'lucide-react';
import { useParams, useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { queryKey } from '../../queryKey/queryKey';
import { getFoodByIdService } from '../../service/apiService';
import "./FoodDetail.scss"
import { StoreContext } from '../../context/StoreContext';
import ReviewCard from '../ReviewCard/ReviewCard';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Table } from 'antd';
const FoodDetailPage = () => {
  
const param=useParams()
const {addToCart,addToFavoriteFood,favoriteFood,setLoading}= useContext(StoreContext)
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');
  const {isError,isPending,refetch,data:foodDetail}=useQuery({
    queryKey:queryKey.fetchFoodById(param?.id),
    queryFn:async()=>{
      setLoading(true)
      const response= await getFoodByIdService(param?.id);
      if(response && response.ec===200){
        setLoading(false)
        return response.dt ;
      }
      setLoading(false)
      return {};
    }
  })

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    
    const data={
      foodId:param?.id,
      quantity:quantity
    }
    addToCart(data)
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };
  
  return (
    <div className='food_deltail_cover_all'>
       <div className="food-detail-container">
      

      <div className="container">
        <div className="food-detail-content">
          {/* Image Gallery */}
          <div className="image-gallery">
            <img 
              src={foodDetail && foodDetail.listImages[selectedImage]}
              alt={foodDetail?.name}
              className="main-image"
            />
            <div className="thumbnail-container">
              { foodDetail && foodDetail.listImages.length>0 &&  foodDetail.listImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${foodDetail?.name} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{foodDetail && foodDetail.name}</h1>
              
              <div className="product-meta">
                <div className="rating">
                  <Star size={18} className="star-icon" fill="currentColor" />
                  <span>{foodDetail?.star}</span>
                  <span className="rating-text">({foodDetail?.feedbacks} đánh giá)</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{foodDetail && foodDetail.shipTime} phút</span>
                </div>
                <div className="meta-item">
                  <Users size={16} />
                  <span>{foodDetail && foodDetail.serving} người</span>
                </div>
              </div>

              <div className="price">{formatPrice(foodDetail && foodDetail.price ? foodDetail.price : 0)}</div>
              <p className="description">{foodDetail && foodDetail.description}</p>
            </div>

            <div className="actions-section">
              <div className="quantity-controls">
                <span className="quantity-label">Số lượng:</span>
                <div className="quantity-input">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <div className="quantity-display">{quantity}</div>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <div className="action-buttons">
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  <ShoppingCart size={20} />
                  Thêm vào giỏ hàng
                </button>
                <button 
                  className={`wishlist-btn ${favoriteFood && favoriteFood.length>0 && favoriteFood.some((item)=>item.id===Number(param?.id)) ? 'active' : ''}`}
                  onClick={() => addToFavoriteFood(param?.id)}
                >
                  <Heart  size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="details-section">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Thành phần
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Dinh dưỡng
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'ingredients' && (
              <div className="ingredients-grid">
                {foodDetail && foodDetail.listIngredients.length>0 && foodDetail.listIngredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-name">{ingredient.name}</span>
                    <span className="ingredient-amount">{ingredient.amount} {ingredient.unit}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="nutrition-grid">
                {foodDetail && foodDetail.listNutritions.length>0 && foodDetail.listNutritions.map((nutrient, index) => {
                  if(nutrient.name==="Calories"){
                    return <div key={index} className="nutrition-item">
                    <div className="nutrition-value">{nutrient.amount}</div>
                    <div className="nutrition-name">{nutrient.name}</div>
                    <div className="nutrition-unit">kcal</div>
                  </div>
                  }
                  else
                  {
                   return <div key={index} className="nutrition-item">
                    <div className="nutrition-value">{nutrient.amount}</div>
                    <div className="nutrition-name">{nutrient.name}</div>
                    <div className="nutrition-unit">g</div>
                  </div>
                  }
                
                })}
              </div>
            )}
          </div>
        </div>
      </div>
       <div className='container' style={{maxHeight:"500px", width:"100%", margin: "0 auto", padding: "20px 10px 20px 20px",boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",borderRadius:"8px",overflow:"hidden" }}>
       <p>Đánh giá khách hàng</p>
       <PerfectScrollbar>
         <div className='w-100'>
          {foodDetail && foodDetail.reviewCustomers && 
          foodDetail.reviewCustomers.listFeedbacks && foodDetail.reviewCustomers.listFeedbacks.length>0 ?
          foodDetail.reviewCustomers.listFeedbacks.map((r, i) => (
        <ReviewCard key={i} review={r} />
      )):<Table style={{width:"100%"}} columns={[]} dataSource={[]} />}
         </div>
       </PerfectScrollbar>
     
    </div>
    </div>
    </div>
   
  );
};

export default FoodDetailPage;
