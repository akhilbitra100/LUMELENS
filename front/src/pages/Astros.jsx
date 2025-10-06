import React from 'react'
import Navbar from '../compo/Navbar'
import Astro from '../pages/page/Astro'
import Footer from '../compo/Footer'

function Astros() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Astro />
      </div>
      <Footer />
    </div>
  )
}

export default Astros;
