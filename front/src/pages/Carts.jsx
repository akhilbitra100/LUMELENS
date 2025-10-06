import React from 'react'
import Navbar from '../compo/Navbar'
import Cart from '../pages/page/Cart'
import Footer from '../compo/Footer'

function Carts() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Cart />
      </div>
      <Footer />
    </div>
  )
}

export default Carts;
