import React from 'react'
import Navbar from '../compo/Navbar'
import Macro from '../pages/page/Macro'
import Footer from '../compo/Footer'

function Macros() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Macro />
      </div>
      <Footer />
    </div>
  )
}

export default Macros;
