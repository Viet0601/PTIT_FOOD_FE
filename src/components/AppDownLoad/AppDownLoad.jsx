import React from 'react'
import './AppDownLoad.scss'
import { assets } from '../../assets/assets/frontend_assets/assets'
const AppDownLoad = () => {
  return (
    <div className='app-down-load' id='app-mobile-download'>
        <h3>Tải ứng dụng để trải nghiệm tốt hơn</h3>
        <p>PTIT Shop</p>
        <div className='app-down-load-platform'>
            <img src={assets.play_store} alt=''/>
            <img src={assets.app_store} alt=''/>
        </div>
    </div>
  )
}

export default AppDownLoad