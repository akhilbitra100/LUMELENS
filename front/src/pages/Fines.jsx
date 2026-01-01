import React from 'react'
import Navbar from '../compo/Navbar'
import Fine from '../pages/page/Fine'
import Footer from '../compo/Footer'

function Fines() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Fine />
      </div>
      <Footer />
    </div>
  )
}

export default Fines;
