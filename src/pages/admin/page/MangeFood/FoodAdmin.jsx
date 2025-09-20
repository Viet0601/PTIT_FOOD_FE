import React from 'react'
import AddFood from './AddFood'

import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import MageListFood from './MageListFood';
import ManageListFoodAdmin from './MageListFood';
import AddIngredient from './AddIngredient';
import IngredientList from './IngredientList';
const FoodAdmin = () => {
  const items=[
    {
      id:1,
      label:"Danh sách món ăn",
      icon:<AppleOutlined/>,
      children:<ManageListFoodAdmin/>
    },
    {
      id:2,
      label:"Thêm món ăn",
      icon:<AppleOutlined/>,
      children:<AddFood/>
    },
    {
      id:3,
      label:"Thêm nguyên liệu",
      icon:<AppleOutlined/>,
      children:<AddIngredient/>
    },
    {
      id:4,
      label:"Danh sách nguyên liệu",
      icon:<AppleOutlined/>,
      children:<IngredientList/>
    },
  ]
  return (
    <div>
     <Tabs
    defaultActiveKey={items[0].id}
    items={items.map((item, i) => {
      return {
        key: item.id,
        label: item.label,
        children: item.children,
        icon: item.icon,
      };
    })}
  />
    </div>
  )
}

export default FoodAdmin