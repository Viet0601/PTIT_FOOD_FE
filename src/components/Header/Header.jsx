import React, { useContext } from 'react'
import './Header.scss'
import { LINK } from '../../utils/constant'
import { StoreContext } from '../../context/StoreContext'
const Header = () => {
  const {navigate}=useContext(StoreContext)
  return (
    <div className='header '>
        <div className='header-content'>
            {/* <h2>Đặt món ăn bạn yêu thích</h2>
            <p>Chọn ngay từ thực đơn phong phú với nhưng món ăn có nguyên liệu đặc biệt và từ các chuyên gia ẩm thực, nâng cao chất lượng bữa ăn của bạn. Món ngon ngay nào</p> */}
            <button onClick={()=>navigate(LINK.FOOD_COLLECTION)}>Xem thực đơn</button>
        </div>
    </div>
  )
}

export default Header