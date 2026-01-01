import React from 'react'
import Navbar from '../compo/Navbar'
import Architectural from '../pages/page/Architectural'
import Footer from '../compo/Footer'

function Architecturals() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Architectural />
      </div>
      <Footer />
    </div>
  )
}

export default Architecturals;
