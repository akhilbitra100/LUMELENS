import React from 'react'
import Navbar from '../compo/Navbar'
import Landscape from '../pages/page/Landscape'
import Footer from '../compo/Footer'

function Landscapes() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Landscape />
      </div>
      <Footer />
    </div>
  )
}

export default Landscapes;
