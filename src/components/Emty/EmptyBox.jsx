import React from 'react'
import './EmptyBox.scss'
import { Table } from 'antd'
const EmptyBox = () => {
  return (
    <div className='w-100 ' style={{minHeight:"300px"}}>
        <Table dataSource={[]} columns={[]} />
    </div>
  )
}

export default EmptyBox