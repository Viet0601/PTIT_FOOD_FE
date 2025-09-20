import { data } from "react-router";
import axios from "../axios";

export const LoginService=(data)=>{
    return axios.post('/login',data,{withCredentials:true})
}
export const LogoutService=()=>{
    return axios.post('/logout',{},{withCredentials:true})
}
export const getMyProfileService=()=>{
    return axios.get(`/api/v1/profile`,{withCredentials:true});
}
export const getAllCategoryService=()=>{
    return axios.get(`/category`);
}
export const getAllFoodService=(page='',limit='',category='')=>{
    
    if(page && limit){
          return axios.get(`/food?page=${page}&limit=${limit}&category=${category}`,{withCredentials:true})
     
        } 
    else  return axios.get(`/food`,{withCredentials:true})
}
export const getFoodByIdService=(id)=>{
    return axios.get(`food/${id}`,{withCredentials:true})
}
export const getCartService=()=>{
    return axios.get(`/api/v1/cart`,{withCredentials:true})
}
export const addToFavoriteService=(id)=>{
    return axios.put(`/api/v1/food/add-favorite/${id}`);
}
export const addToCartService=(data)=>{
    return axios.post(`/api/v1/cart/add`,data);
}
export const deleteCartItemService=(id)=>{
    return axios.delete(`/api/v1/cart/delete/${id}`);
}
export const getAllUserAddressService=()=>{
    return axios.get(`/api/v1/address`);
}
export const getMyOrderService=(page,limit)=>{
    return axios.get(`/api/v1/order?page=${page}&limit=${limit}`);
}
export const CancelOrderService=(id)=>{
    return axios.delete(`/api/v1/order/cancel/${id}`);
}
export const getAllMethodPaymentService=()=>{
    return axios.get(`/api/v1/payment`);
}
export const createNewOrderService=(data)=>{
    return axios.post(`/api/v1/order`,data);
}
export const sendFeedBackService=(data)=>{
    return axios.post(`/api/v1/feedback/${data?.id}`,data?.feedback);
}
export const getAllNutritionService=()=>{
    return axios.get(`/api/v1/nutrition`);
}
export const getAllIngredientService=(page,limit)=>{
    if(page && limit)  return axios.get(`/api/v1/ingredient?page=${page}&limit=${limit}`);
    return axios.get(`/api/v1/ingredient`);
}
export const createNewFood=(data)=>{
      const form = new FormData();
      form.append("available", data.available);
      form.append("category_id", data.category_id);
      form.append("description", data.description);
      form.append("ingredients", data.ingredients);
      form.append("name", data.name);
      form.append("nutritions", data.nutritions);
      form.append("price", data.price);
      form.append("serving", data.serving);
      form.append("shipTime", data.shipTime);
      form.append("vegetarian", data.vegetarian);
      const images= data?.images;
      for(let i=0;i<images.length;i++)
      {
        
        form.append("files", images[i].originFileObj);
      }
      
      return axios.post(`/api/v1/admin/food`,form,{
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export const updateFoodService=(data)=>{
     const form = new FormData();
      form.append("available", data.available);
      form.append("category_id", data.category_id);
      form.append("description", data.description);
      form.append("ingredients", data.ingredients);
      form.append("name", data.name);
      form.append("nutritions", data.nutritions);
      form.append("price", data.price);
      form.append("serving", data.serving);
      form.append("shipTime", data.shipTime);
      form.append("vegetarian", data.vegetarian);
      const images= data?.images;
     
      for(let i=0;i<images.length;i++)
      {
      
        form.append("files", images[i].originFileObj);
      }
      
     return axios.put(`/api/v1/admin/food/${data?.id}`,form,{
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export const deleteFoodAdminService=(id)=>{
    return axios.delete(`/api/v1/admin/food/${id}`)
}
export const getAllOrderAdminService=(page,limit)=>{
    return axios.get(`/api/v1/admin/order?page=${page}&limit=${limit}`);
}
export const getAllStatusOrderAdminService=()=>{
    return axios.get('/api/v1/admin/status-order');
}
export const updateStatusOrderService=(data)=>
{
    return axios.put(`/api/v1/admin/order/status`,data)
}
export const addNewAddressService=(data)=>{
    return axios.post(`/api/v1/address`,data)
}
export const updateAddressService=(id,data)=>{
    return axios.put(`/api/v1/address/${id}`,data)
}
export const updateOrderPaidSuccessService=(id)=>{
    return axios.put(`/api/v1/order/payment-success/${id}`);
}
export const deleteAddressUserService=(id)=>{
    return axios.delete(`/api/v1/address/${id}`)
}
export const deleteUserAddressService=(id)=>{
    return axios.delete(`/api/v1/address/${id}`);
}
export const getAllResponseFeedbackService=(page,limit)=>{
    if(!page || !limit) return ;
    return axios.get(`/api/v1/admin/response?page=${page}&limit=${limit}`);

}
export const sendFeedbackResponse= (data)=>{
    return axios.post(`/response`,data);
}
export const addNewIngredient=(data)=>{
    return axios.post(`/api/v1/admin/ingredient`,data);
}
export const updateIngredientService=(data,id)=>{
    return axios.put(`/api/v1/admin/ingredient/${id}`,data);
}
export const sendOTPService=(data)=>{
    return axios.post(`/send-otp`,data);
}
export const resetPasswordService=(data)=>{
    return axios.put(`/reset-password`,data)
}















export const RegisterService=(data)=>{
    return axios.post('/register',data)
}
// export const getAllFoodService=()=>{
//     return axios.get('/get-all-food');
// }
// export const addToCartService=(data,access_token)=>{
//     return axios.post('/add-to-cart',data,{headers:{access_token}})
// }
export const removeToCartService=(data,access_token)=>{
    return axios.post('/remove-to-cart',data,{headers:{access_token}})
}
export const getAllCartService=(access_token)=>{
    return axios.post('/get-all-cart',{},{headers:{access_token}})
}
export const placeOrderService=(data,access_token)=>{
    
    return axios.post('/place-order',data,{headers:{access_token}})
}
export const getListOrderService=(access_token)=>{
    
    return axios.post('/get-list-order',{},{headers:{access_token}})
}
export const verifyOrderService=(data)=>{
    
    return axios.post('/verify-order',data)
}