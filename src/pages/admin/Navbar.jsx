import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { LogoutService } from "../../service/apiService";
import { isLogoutSuccess } from "../../redux/userSlice";
import "./Navbar.scss";
import { LINK } from "../../utils/constant";
import { useQueryClient } from "@tanstack/react-query";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setLoading} = useContext(StoreContext)
  const queryClient=useQueryClient()
  const handleLogout = async () => {
    try {
       setLoading(true);
      const response = await LogoutService();
      if (response && response.ec === 200) {
        dispatch(isLogoutSuccess());
        queryClient.clear();
        localStorage.removeItem("access_token")
      }
    } catch (error) {
      // noop: optionally show a toast in the future
    }
    finally{
       setLoading(false);
    }
  };

  return (
    <div className="navbar">
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      {/* <h1 className="title">Trang quản trị</h1> */}
      <div className="right">
        
        <button className="logout-btn" onClick={handleLogout}>
          <CiLogout size={18} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
