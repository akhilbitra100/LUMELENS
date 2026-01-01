import React from 'react'
import Navbar from '../compo/Navbar'
import Bw from '../pages/page/Bw'
import Footer from '../compo/Footer'

function Bws() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Bw />
      </div>
      <Footer />
    </div>
  )
}

export default Bws;
