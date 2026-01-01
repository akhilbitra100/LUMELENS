import React from 'react'
import Navbar from '../compo/Navbar'
import Fashion from '../pages/page/Fashion'
import Footer from '../compo/Footer'

function Fashions() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Fashion />
      </div>
      <Footer />
    </div>
  )
}

export default Fashions;
