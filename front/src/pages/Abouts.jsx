import React from 'react'
import Navbar from '../compo/Navbar'
import About from '../pages/page/About'
import Footer from '../compo/Footer'
function Abouts() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <About />
      </div>
      <Footer />
    </div>
  )
}

export default Abouts
