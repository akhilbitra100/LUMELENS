import React from 'react'
import Navbar from '../compo/Navbar'
import Sport from '../pages/page/Sport'
import Footer from '../compo/Footer'

function Sports() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Sport />
      </div>
      <Footer />
    </div>
  )
}

export default Sports;
