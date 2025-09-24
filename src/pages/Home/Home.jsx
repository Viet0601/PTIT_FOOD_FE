import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
 
  return (
    <div className='homepage '>
        <Header/>
        <Menu />
      
        <FoodDisplay />
    </div>
  )
}

export default Home