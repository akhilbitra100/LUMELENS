import React from 'react'
import Navbar from '../compo/Navbar'
import Wildlife from '../pages/page/Wildlife'
import Footer from '../compo/Footer'

function Wildlifes() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Wildlife />
      </div>
      <Footer />
    </div>
  )
}

export default Wildlifes;
