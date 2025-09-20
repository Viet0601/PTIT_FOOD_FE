import React from 'react'


import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import ManageOrderAdmin from './ManageOrderAdmin';
import ManageListFoodAdmin from '../MangeFood/MageListFood';


const OrderAdmin = () => {
  const items=[
    {
      id:1,
      label:"Đơn hàng mới",
      icon:<AppleOutlined/>,
      children:<ManageOrderAdmin/>
    }
  ]
  return (
    <div>
     <Tabs
    defaultActiveKey="1"
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

export default OrderAdmin;