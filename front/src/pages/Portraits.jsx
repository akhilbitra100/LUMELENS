import React from 'react'
import Navbar from '../compo/Navbar'
import Portrait from '../pages/page/Portrait'
import Footer from '../compo/Footer'

function Portraits() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Portrait />
      </div>
      <Footer />
    </div>
  )
}

export default Portraits;
