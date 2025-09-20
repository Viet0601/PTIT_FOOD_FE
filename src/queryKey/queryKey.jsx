export const queryKey={
    fetchFoodByCategory:(page,id)=>['fetchFoodByCategory',{page,id}],
    fetchAllFoodByPaginate:(page)=>['fetchAllFoodByPaginate',page],
    fetchFoodById:(id)=>['fetchFoodById',id],
    fetchAllOrderAdmin:(page)=>['fetchAllOrderAdmin',page],
    fetchAllOrderUser:(page)=>['fetchAllOrderUser',page],
    fetchAllResponseFeedback:(page)=>['fetchAllResponseFeedback',page],
    fetchListIngredient:(page)=>['fetchListIngredient',page],
  
}