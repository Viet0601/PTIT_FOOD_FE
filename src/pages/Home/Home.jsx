import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import Menu from '../../components/Menu/Menu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category,setcategory]=useState("All")
  return (
    <div className='homepage '>
        <Header/>
        <Menu category={category} setcategory={setcategory}/>
      
        <FoodDisplay category={category}/>
    </div>
  )
}

export default Home