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
import { createNewFood } from "../../../../service/apiService";
import Loading from "../../../../components/Loading/Loading";
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
const AddFood = () => {
const [isAvailable,setIsavailable]=useState(false)
const [isVegetian,setIsVegetian]=useState(false)
const [categoryId,setCategoryId]=useState(null)

const [ingredients, setIngredients] = useState([
    {boxId:Date.now(),id:'', amount: '' }
  ]);
  const {CATEGORIES,nutrition,ingredient,loading,setLoading,getAllFood} = useContext(StoreContext)
  const [fileList, setFileList] = useState([
   
  ]);
  const {register,getValues,reset}= useForm()
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
 
  const [image, setimage] = useState("");
  const [food, setFood] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
 
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
 
 const hasEmptyField = (arr) => {
  return arr.some(obj => 
    Object.values(obj).some(value => value === "" || value === null || value === undefined)
  );
};

  const getDataNutrition=()=>{
    const data=getValues();
    let res=[]
    if(nutrition.length===0) return[];
    for(let i =0;i<nutrition.length;i++)
    {
     let id= nutrition[i].id;
      let item={
        id:id,
        amount:data[id]
      }
      res.push(item)

    }
    return res;
  }
  const getValidIngredient=(list)=>{
    let arr=[]
    for(let i=0;i<list.length;i++)
    {
      let res={
        id:list[i].id,
        amount:list[i].amount
      }
      arr.push(res);
    }
    return arr;
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
        setLoading(true);
       const response=await createNewFood(data)
       if(response && response.ec===201)
       {
        toast.success(response.em);
        reset();
        setCategoryId(null)
        setFileList([])
        setIngredients([
        {boxId:Date.now(),id:'', amount: '' }
        
      ])
      setIsVegetian(false)
      setIsavailable(false)
      setLoading(false);
      getAllFood(1);
      window.scrollTo({top:0,behavior:"smooth"});
       }
       else 
       {
        setLoading(false)
        toast.error(response?.em)
       }
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
      <IngredientManager ingredients={ingredients} setIngredients={setIngredients} />
       <div className="add-food-btn-add">
            <button disabled={loading} onClick={handleSummit} type="submit" style={{cursor:loading ? "no-drop":"pointer"}}>
              {"Thêm món ăn"}
            </button>
          </div>
    </div>
      
      </>
  );
};

export default AddFood;
