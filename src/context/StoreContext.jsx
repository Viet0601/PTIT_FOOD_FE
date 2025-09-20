import { createContext, useEffect, useState } from "react";
import {addToCartService, addToFavoriteService, CancelOrderService, getAllCategoryService, getAllFoodService, getAllIngredientService, getAllMethodPaymentService, getAllNutritionService, getAllUserAddressService, getCartService, getMyOrderService, getMyProfileService, LogoutService, updateFoodService } from "../service/apiService";
import {useDispatch, useSelector} from "react-redux"
import { isLogoutSuccess, updateProfile } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { LINK } from "../utils/constant";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../queryKey/queryKey";

export const StoreContext=createContext(null)
const StoreContextProvider=(props)=>{
    const navigate=useNavigate()
    const limit=8;
    const [pageOrder,setPageOrder]=useState(1)
    const token = useSelector(state=>state.user.token)
    const dispatch=useDispatch()
    const [loading, setLoading] = useState(false);
    const [CATEGORIES,setCATEGORIES]=useState([]);
    const [nutrition,setNutrition]=useState([]);
    const [ingredient,setIngredient]=useState([]);
    const [favoriteFood,setFavoriteFood]=useState([])
    const [cart,setCart]=useState([])
    const [foods,setFoods]=useState([])
    const [order,setOrder]=useState([])
    const [address,setAddress]=useState([]);
    const [methodPayment,setmethodPayment]=useState([]);
     const [isShowModalLogin, setisShowModalLogin]=useState(false);
  const [typeModal,settypeModal] = useState("LOGIN")
    const resetStatusIntial=()=>{
        setFavoriteFood([])
        setCart([])
        setOrder([])
        setAddress([])
    }
    const updateFood=async(data)=>{
        setLoading(true)
        const response= await updateFoodService(data)
        if(response && response.ec===200)
        {
            toast.success(response.em);
            navigate(LINK.ADMIN_MANAGE_FOOD)
            
        }
        else 
        {
            toast.error(response.em)
        }
        setLoading(false)
    }
    const getNutritrion=async()=>{
        setLoading(true)
        const response=await getAllNutritionService();
       
        if(response && response.ec===200)
        {
            setNutrition(response.dt)
        }
        setLoading(false)
    }
        const getIngredient=async()=>{
             setLoading(true);
            const response=await getAllIngredientService();
        
            if(response && response.ec===200)
            {
                setIngredient(response.dt)
            }
             setLoading(false);
        }
    const getProfile=async()=>{
        setLoading(true)
        const response= await getMyProfileService();
        if(response && response.ec===200){
            const data={
                email:response?.dt?.email,
                fullName: response?.dt?.fullName,
                role:response?.dt?.role?.name
            } 
             setFavoriteFood(response?.dt?.favoriteFoods);
            dispatch(updateProfile(data));
        }
        else 
        {
            toast.error(response.em);
        }
        setLoading(false)
    }
    const addToFavoriteFood=async(id)=>{
        if(!token)
        {
            setisShowModalLogin(true)
            return ;
        }
        setLoading(true);
        const response= await addToFavoriteService(id);
            if(response && response.ec===200){
              toast.success(response.em);
              setFavoriteFood(response.dt);
            }
            else if(response && response.status===403)
        {
            setisShowModalLogin(true)
        }
             else 
        {
            toast.error(response.em);
        }
        setLoading(false)
    }
    const addToCart=async(data)=>{
         if(!token)
        {
            setisShowModalLogin(true)
            return ;
        }
         setLoading(true);
        const response= await addToCartService(data);
        if(response && response.ec===200){
            toast.success(response.em);
            setCart(response.dt);
        }
        else if(response && response.status===403)
        {
            setisShowModalLogin(true)
        }
         else 
        {
            toast.error(response.em);
        }
         setLoading(false);
    }
 
    const {data:orderPagenate,isPending,isError,error,refetch:refetchOrderPagenate}= useQuery({
        queryKey:queryKey.fetchAllOrderUser(pageOrder),
        queryFn:async()=>{
            if(!token) return []
             setLoading(true);
            const response=await getMyOrderService(pageOrder,limit);
            if(response && response.ec===200)
            {
                 setLoading(false);
                return response.dt;
            }
            return {list:[],currentPage:0,totalPages:0}
        },
        enabled:true,
        keepPreviousData:true,
        staleTime:30 * 1000, 
    })  
    const getAllUserAddress=async()=>{
         setLoading(true);
        const response=await getAllUserAddressService();
        if(response && response.ec===200)
        {
            setAddress(response.dt)
        }
         setLoading(false);
    }
    const getUserCart=async()=>{
         setLoading(true);
         const response= await getCartService();
         if(response && response.ec===200){
            setCart(response.dt);
         }
          else 
        {
            toast.error(response.em);
        }
         setLoading(false);
    }
    const getAllCategory=async()=>{
        const response=await getAllCategoryService()
        if(response && response.ec===200)
        {
            setCATEGORIES(response?.dt);
           
        }
         else 
        {
            toast.error(response.em);
        }
    }
   
    const getAllFood=async(page)=>{
         setLoading(true);
        const response = await getAllFoodService(page,limit)
         if(response && response.ec===200)
        {
            setFoods(response.dt)
        }
         setLoading(false);
    }
    const getAllMethodPayment=async()=>{
        const response= await getAllMethodPaymentService();
        if(response && response.ec===200)
        {
            setmethodPayment(response.dt)
        }
    }
    const cancelOrder=async(id)=>{
         setLoading(true);
        const response = await CancelOrderService(id);
        if(response && response.ec===200)
        {
            toast.success(response?.em);
            refetchOrderPagenate();
        }
        else 
        {
            toast.error(response?.em);
        }
         setLoading(false);
    }
    const handleLogout=async()=>{
         setLoading(true);
        const response=await LogoutService();
        if(response && response.ec===200){
          dispatch(isLogoutSuccess());
          localStorage.removeItem("access_token")
          resetStatusIntial()
        }
         setLoading(false);
      }
    useEffect(()=>{
        if(token)
        {
        getProfile()
        getUserCart()
        getAllUserAddress();
        refetchOrderPagenate()
        getAllMethodPayment()
        getNutritrion()
        getIngredient()
        }
    },[token])
    useEffect(()=>{
        getAllCategory()
    },[])
    const contextValue={dispatch,getProfile,CATEGORIES,favoriteFood,setFavoriteFood,getUserCart,cart,resetStatusIntial,orderPagenate,refetchOrderPagenate
   ,addToFavoriteFood,addToCart,getAllUserAddress,address,order,cancelOrder,getAllMethodPayment,methodPayment,  setPageOrder,pageOrder,
   setLoading,loading,nutrition,setNutrition,ingredient,setIngredient,limit,foods,getAllFood,updateFood,settypeModal,typeModal,setisShowModalLogin,isShowModalLogin,
   handleLogout,getIngredient
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider