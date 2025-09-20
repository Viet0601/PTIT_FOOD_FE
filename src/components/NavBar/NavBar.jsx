import React, { useContext, useEffect, useState } from "react";
import "./NavBar.scss";
import { Badge } from "antd";
import { assets } from "../../assets/assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LINK } from "../../utils/constant";
import { StoreContext } from "../../context/StoreContext";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";
import { LogoutService } from "../../service/apiService";
import { isLogoutSuccess } from "../../redux/userSlice";
import { Heart, ShoppingCart, Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { HiBars4 } from "react-icons/hi2";
import { HiOutlineXMark } from "react-icons/hi2";

const NavBar = (props) => {
  
  const { isShow, setIsShow } = props;
  const [isShowMenu,setIsShowMenu]=useState(true);
  const [isShowMenuMobile,setIsShowMenuMobile]=useState(false);
  const [selected, setselected] = useState("home");
  const { favoriteFood,cart, handleLogout} = useContext(StoreContext);
  const   isAuthenticated=useSelector(state=>state.user.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const goHome = () => {
    if (location.pathname === LINK.HOME) {
      scrollToTop();
    } else {
      
      navigate(LINK.HOME);
    }
  };
  const handleToggleLogout=async()=>{
    handleLogout()
  }
  useEffect(()=>{
    const resetSize=()=>{
      if(window.innerWidth<=1200)
    {
      setIsShowMenu(false);
    }
    else 
    {
      setIsShowMenu(true);
    }
    }
    resetSize()
    window.addEventListener("resize",resetSize);
    return ()=>window.removeEventListener("resize",resetSize);
    
  },[window.innerWidth])
  return (
    <div className="navbar container mb-3">
     
      {isShowMenu?<img onClick={()=>goHome()} className="navbar-logo" src={assets.logo} alt="Ảnh logo" />:<HiBars4 onClick={()=>setIsShowMenuMobile(true)} style={{cursor:"pointer"}} size={30}/>}
      {!isShowMenu && (
  <div className={`navbar-mobile ${isShowMenuMobile ? "show" : ""}`}>
    <HiOutlineXMark
      onClick={() => setIsShowMenuMobile(false)}
      className="icon-cancel"
    />
    {/* nội dung menu */}
    <ul className="menu-mobile">
      <li><Link to={LINK.HOME} onClick={()=>{ setIsShowMenuMobile(false); setselected("home"); if(location.pathname===LINK.HOME){ scrollToTop(); }}}>Trang chủ</Link></li>
      <li><Link to={LINK.FOOD_COLLECTION}>Menu</Link></li>
      <li><a href="#app-mobile-download">Ứng dụng di động</a></li>
      <li><Link to={LINK.CONTACT}>Liên hệ</Link></li>
      <li><Link to={LINK.SUPPORT}>Hỗ trợ</Link></li>
    </ul>
  </div>
)}
      <ul className={`${isShowMenu?"navbar-menu":"navbar-menu-hidden"}`}>
        <Link
          to={LINK.HOME}
          onClick={() => { setselected("home"); if(location.pathname===LINK.HOME){ scrollToTop(); } }}
          className={selected === "home" ? "active" : ""}
        >
          Trang chủ
        </Link>
        <Link 
          to={LINK.FOOD_COLLECTION}
          onClick={() => setselected("menu")}
          className={selected === "menu" ? "active" : ""}
        >
          Menu
        </Link>
        <a
          href="#app-mobile-download"
          onClick={() => setselected("mobile-app")}
          className={selected === "mobile-app" ? "active" : ""}
        >
          Ứng dụng di động
        </a>
        <Link
          to={LINK.CONTACT}
          onClick={() => setselected("contact-us")}
          className={selected === "contact-us" ? "active" : ""}
        >
          Liên hệ
        </Link>
        <Link
          to={LINK.SUPPORT}
          onClick={() => setselected("support")}
          className={selected === "support" ? "active" : ""}
        >
          Hỗ trợ
        </Link>
      </ul>
      <div className="navbar-right">
        <div className="pill" style={{cursor:"pointer"}} onClick={()=>navigate(LINK.CART)}>
            <ShoppingCart size={18} />
            <span>Giỏ hàng</span>
            <b className="badge">{cart && cart.listCartItems && cart.listCartItems.length ? cart.listCartItems.length : 0}</b>
          </div>
          <div className="pill" style={{cursor:"pointer"}} onClick={()=>navigate(LINK.FOOD_FAVORITE)}>
            <Heart size={18} />
            <span>Yêu thích</span>
            <b className="badge">{favoriteFood && favoriteFood.length}</b>
          </div>
        {!isAuthenticated ? (
          <button onClick={() => setIsShow(!isShow)} className="btn-login">
            Đăng nhập
          </button>
        ) : (
         <NavDropdown
             
              title="Cài đặt"
             className="drop-down"
            >
              <div className="drop-down-item">
                <HiOutlineShoppingBag/>
                <Link to={LINK.LIST_ORDERS}>Đơn hàng</Link>
              </div>
              <div className="drop-down-item">
                <CiLogout/>
                <Link onClick={()=>handleLogout()} to={""}>Đăng xuất</Link>
              </div>
            </NavDropdown>
        )}
      </div>
    </div>
  );
};

export default NavBar;
