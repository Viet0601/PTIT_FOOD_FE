import React, { useContext, useEffect, useState } from "react";
import "./AddFood.scss";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Select, Switch } from "antd";
import Row from "react-bootstrap/Row";
import IngredientManager from "./IngredientManager";
import { assets } from "../../../../assets/assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { Upload } from "antd";
import {useForm} from "react-hook-form"
import ImgCrop from "antd-img-crop";
import { StoreContext } from "../../../../context/StoreContext";
import { createNewFood, getFoodByIdService } from "../../../../service/apiService";
import Loading from "../../../../components/Loading/Loading";
import { queryKey } from "../../../../queryKey/queryKey";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
async function urlToFile(url, filename, mimeType) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  return new File([buffer], filename, { type: mimeType });
}

const UpdateFood = () => {
      const {CATEGORIES,nutrition,ingredient,loading, setLoading,updateFood} = useContext(StoreContext)
    const param=useParams()
     const [fileList, setFileList] = useState([
  ]);
   const [isAvailable,setIsavailable]=useState(false)
const [isVegetian,setIsVegetian]=useState(false)
const [categoryId,setCategoryId]=useState(null)
const [ingredients, setIngredients] = useState([
    
  ]);
    const {isError,isPending,refetch,data:food}=useQuery({
    queryKey:queryKey.fetchFoodById(param?.id),
    queryFn:async()=>{
       setLoading(true);
      const response= await getFoodByIdService(param?.id);

      if(response && response.ec===200){
        setUpdateForm(response.dt)
         setLoading(false);
        return response.dt ;
      }
        setLoading(false);
      return null;
    }
  })

  const getValidIngredient=(list)=>{
    let arr=[]
    for(let i=0;i<list.length;i++)
    {
      let res={
        id:list[i].id,
        amount:list[i].amount,
        updateId:list[i].updateId
      }
      arr.push(res);
    }
    return arr;
  }
const setUpdateForm=async(data)=>{
    setValue("name",data.name);
    setValue("description",data.description);
    setValue("price",data.price);
    setValue("serving",data.serving);
    setValue("shipTime",data.shipTime);
    setIsVegetian(data.vegetarian)
    setIsavailable(data.available)
    setCategoryId(data?.category?.id)
    const nutrition= data?.listNutritions
    nutrition.map((item)=>{
      
        setValue(item?.nutritionId,item?.amount)
    })
    const images=data?.listImages;
    let listImages=[]
   
    for(let i =0 ;i<images.length;i++)
    {
        let fileList=  {
      uid: Date.now(),
      name: 'image.jpg',
      status: 'done',
      url: images[i],
      originFileObj:await urlToFile(
        images[i],
    "image.jpg",
    "image/jpeg"
  )
        }
        listImages.push(fileList)
    }
    setFileList(listImages)
    const ingredients=data?.listIngredients;
    let listIngredients=[]
    for(let i=0;i<ingredients.length;i++)
    { 
      let items={
        boxId:Date.now() + i,
        id:ingredients[i].ingredientId,
        amount:ingredients[i].amount,
        updateId:ingredients[i].id
      }
      listIngredients.push(items)
      
    }
    setIngredients(listIngredients)

}


 
  const {register,getValues,reset,setValue}= useForm()
   const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
    const onChangeSelect = (e) => {
   setCategoryId(e)
   
  };
   const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const onSearch = (value) => {
  };
 
  
 
  
 
 const hasEmptyField = (arr) => {
  return arr.some(obj => 
    Object.values(obj).some(value => value === "" || value === null || value === undefined)
  );
};
  const findIdNutrition=(id,items)=>{
    for(let i =0 ;i<items.length;i++)
    {
      if(id===items[i].nutritionId)
      {
        return items[i].id;
      }
    }
    return '';
  }
  const getDataNutrition=()=>{
    const data=getValues();
    let res=[]
    if(nutrition.length===0) return[];
    for(let i =0;i<nutrition.length;i++)
    {
     let id= nutrition[i].id;
   
     let updateId=findIdNutrition(id,food.listNutritions);
      let item={
        id:id,
        amount:data[id],
        updateId:updateId
      }
      res.push(item)

    }
    return res;
  }
 const getAllCategory=()=>{
    let category=[]
    if(CATEGORIES && CATEGORIES.length>0)
    {
        for(let i=0;i<CATEGORIES.length;i++)
        {
            let item={
                value:CATEGORIES[i]?.id,
                label:CATEGORIES[i].name
            }
            category.push(item)
        }
    }
    
    return category;
  }
 
  const handleSummit = async (e) => {
    e.preventDefault();
    const dataNutrition= getDataNutrition();
    const data=getValues()
      data.category_id=categoryId;
        data.available=isAvailable;
        data.vegetarian=isVegetian;
      
    if(hasEmptyField([data]))
    {
      toast.error("Vui lòng điền đủ thông tin món ăn!")
      return;
    }
    if(fileList.length<2)
    {
      toast.error("Vui lòng chọn ít nhất 2 ảnh món ăn!")
      return;
    }
      if(!hasEmptyField(ingredients)){
        const validingredients= getValidIngredient(ingredients)
        data.ingredients=JSON.stringify(validingredients);
        data.nutritions=JSON.stringify(dataNutrition);
      
        data.images=fileList
        data.id=param?.id;
       updateFood(data)
    //     setLoading(true);
    //    const response=await createNewFood(data)
    //    console.log(response)
    //    if(response && response.ec===201)
    //    {
    //     toast.success(response.em);
    //     reset();
    //     setCategoryId(null)
    //     setFileList([])
    //     setIngredients([
    //     {boxId:Date.now(),id:'', amount: '' }
        
    //   ])
    //   setIsVegetian(false)
    //   setIsavailable(false)
    //   setLoading(false);
    //    }
    //    else 
    //    {
    //     setLoading(false)
    //     toast.error(response?.em)
    //    }
      }
      else 
    {
  toast.error("Vui lòng điền đủ nguyên liệu món ăn!")
    }
    
    

  };

  return (
    <>
    <div className="add-food">
      <Form className="add-food-form">
        <Form.Group as={Row} className="mb-3">
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <Form.Label>Tên món ăn</Form.Label>
            <Form.Control
              name="name"
             {...register("name",{required:true})}
           
              type="text"
            />
          </Col>
          <Col
            className="mt-3"
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <Form.Label>Mô tả món ăn</Form.Label>
            <textarea
              name="description"
              {...register("description",{required:true})}
          
              rows={4}
              className="form-control"
            />
          </Col>
          <Col className="mt-3" xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
            <Form.Label>Nhóm món ăn</Form.Label>
             <Select style={{width:"100%",padding:"0px"}}
             value={categoryId}
                         showSearch
                         placeholder="Chọn loại món ăn"
                         optionFilterProp="label"
                         onChange={onChangeSelect}
                         onSearch={onSearch}
                         options={getAllCategory()}
             />
           
          </Col>
          <Col className="mt-3" xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
            <Form.Label>Giá</Form.Label>
            <Form.Control
              name="price"
              {...register("price",{required:true})}
           
              type="text"
            />
          </Col>
          <Col className="mt-3" xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
            <Form.Label>Khẩu phần</Form.Label>
            <Form.Control
              name="serving"
             {...register("serving",{required:true})}
           
              type="number"
            />
          </Col>
          <Col className="mt-3" xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
            <Form.Label>Thời gian ship</Form.Label>
            <Form.Control
              name="serving"
              {...register("shipTime",{required:true})}
       
              type="number"
            />
          </Col>
         {nutrition && nutrition.length>0 && nutrition.map((n,index)=>(
           <Col key={n.id} className="mt-3" xxl={4} xl={4} lg={4} md={4} sm={4} xs={12}>
            <Form.Label>{n.name}</Form.Label>
            <Form.Control
             
              {...register(n.id,{required:true})}
          
              type="number"
            />
          </Col>
         ))}
          
          <Col
            className="mt-3"
            xxl={12}
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
             <Form.Label>Ảnh món ăn(4 ảnh)</Form.Label>
            <ImgCrop rotationSlider>
              <Upload
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
               
              >
                {fileList.length < 4 && "+ Upload"}
              </Upload>
            </ImgCrop>
            
          </Col>
           <Col className="mt-3" xxl={3} xl={3} lg={3} md={3} sm={3} xs={6}>
            <Form.Label style={{width:"100%"}}>Kích hoạt mở bán</Form.Label>
         
                 <Switch checked={isAvailable} onChange={()=>setIsavailable(!isAvailable)} />
          
           
          </Col>
           <Col className="mt-3" xxl={3} xl={3} lg={3} md={3} sm={3} xs={6}>
            <Form.Label style={{width:"100%"}}>Đồ chay</Form.Label>
         
                 <Switch checked={isVegetian} onChange={()=>setIsVegetian(!isVegetian)}  />
          
           
          </Col>
         
        </Form.Group>
      </Form>
      <IngredientManager  isUpdate={true} ingredients={ingredients} setIngredients={setIngredients} />
       <div className="add-food-btn-add">
            <button disabled={loading} onClick={handleSummit} type="submit" style={{cursor:loading ? "no-drop":"pointer"}}>
                Cập nhật
            </button>
          </div>
    </div>
      
      </>
  );
};

export default UpdateFood;
