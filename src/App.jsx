import NavBar from "./components/NavBar/NavBar"

import { Route, Routes, useLocation, useParams } from "react-router-dom"
import { LINK } from "./utils/constant"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import Footer from "./components/Footer/Footer"
import AppDownLoad from "./components/AppDownLoad/AppDownLoad"
import { useContext, useState } from "react"
import LoginSignUp from "./components/LoginSignUp/LoginSignUp"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import {ToastContainer,Bounce} from "react-toastify"
import VerifyOrder from "./components/VerifyOrder/VerifyOrder"
import ListOrder from "./components/ListOrder/ListOrder"
import FoodDetail from "./components/FoodDetail/FoodDetail"
import FoodShowcase from "./components/CollectionFood/CollectionFood"
import Favorites from "./components/FavoriteFood/Favorites"
import ContactPage from "./components/Contact/ContactPage"
import './App.scss'
import CustomerPolicy from "./pages/Policy/CustomerPolicy"
import Support from "./pages/Support/Support"
import AdminLayout from "./pages/admin/AdminLayout"
import Dashboard from "./pages/admin/page/Dashboard/Dashboard"
import FoodAdmin from "./pages/admin/page/MangeFood/FoodAdmin"
import Loading from "./components/Loading/Loading"
import { StoreContext } from "./context/StoreContext"
import OrderAdmin from "./pages/admin/page/ManageOrder/OrderAdmin"
import UpdateFood from "./pages/admin/page/MangeFood/UpdateFood"
import PaymentSuccess from "./components/PaymentSuccess/PaymentSuccess"
import PrivateRoute from "./PrivateRoute"
import NotFound from "./pages/NotFound/NotFound"
import Feedback from "./pages/admin/page/Feedback/Feedback"
import ResetPassword from "./components/LoginSignUp/ResetPassword"

const App = () => {
  const param=useLocation()
  const {loading}= useContext(StoreContext)
  const {isShowModalLogin,typeModal,settypeModal, setisShowModalLogin}=useContext(StoreContext)
  return (
    <>
    {isShowModalLogin && <LoginSignUp typeModal={typeModal} setTypeModal={settypeModal} isShow={isShowModalLogin} setIsShow={setisShowModalLogin}/>}
     <div className="app">
      
      {(param?.pathname.includes("/admin")===false &&  param?.pathname.includes(LINK.RESET_PASSWORD)===false)&& <NavBar  isShow={isShowModalLogin} setIsShow={setisShowModalLogin}/>}
      <Routes>
        <Route path={LINK.HOME} element={<Home/>} />
        <Route path={LINK.CART} element={<Cart/>} />
        <Route path={LINK.PLACE_ORDER} element={<PlaceOrder/>} />
        <Route path={LINK.LIST_ORDERS} element={<ListOrder/>} />
        <Route path={`${LINK.FOOD_DETAIL}/:id`} element={<FoodDetail/>} />
        <Route path={LINK.FOOD_FAVORITE} element={<Favorites/>} />
        <Route path={LINK.PAYMENT_SUCCESS} element={<PaymentSuccess/>} />
        <Route path={LINK.CONTACT} element={<ContactPage/>} />
        <Route path={LINK.CUSTOMER_POLICY} element={<CustomerPolicy/>} />
        <Route path={LINK.SUPPORT} element={<Support/>} />
        <Route path={LINK.RESET_PASSWORD} element={<ResetPassword/>} />
        <Route path={LINK.FOOD_COLLECTION} element={<FoodShowcase/>} />
        <Route path={`${LINK.VERIFY_ORDER}`} element={<VerifyOrder/>} />
        <Route path={`${LINK.ADMIM}`} element={<PrivateRoute><AdminLayout/></PrivateRoute>} >
          <Route index element={<Dashboard/>} />
          <Route path={LINK.ADMIN_MANAGE_FOOD} element={<FoodAdmin/>} />
          <Route path={LINK.ADMIN_MANAGE_ORDER} element={<OrderAdmin/>} />
          <Route path={`${LINK.ADMIN_UPDATE_FOOD}/:id`} element={<UpdateFood/>} />
          <Route path={`${LINK.ADMIN_FEEDBACK}`} element={<Feedback/>} />
        </Route>

        <Route path="*" element={<NotFound/>} />

      </Routes>
      {(param?.pathname.includes("/admin")===false &&  param?.pathname.includes(LINK.RESET_PASSWORD)===false)&&<AppDownLoad/>}
     
    </div>
   {(param?.pathname.includes("/admin")===false &&  param?.pathname.includes(LINK.RESET_PASSWORD)===false)&& <div className="footer_component">
       <Footer/>
    </div>}
    <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
     {loading &&  <Loading/>}
    </>
   
  )
}

export default App