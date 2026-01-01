import React from 'react'
import Navbar from '../compo/Navbar'
import Street from '../pages/page/Street'
import Footer from '../compo/Footer'

function Streets() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Street />
      </div>
      <Footer />
    </div>
  )
}

export default Streets;
