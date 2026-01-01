import React from 'react'
import Navbar from '../compo/Navbar'
import Event from '../pages/page/Event'
import Footer from '../compo/Footer'

function Events() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Event />
      </div>
      <Footer />
    </div>
  )
}

export default Events;
