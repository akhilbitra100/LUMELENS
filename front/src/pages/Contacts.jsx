import React from 'react'
import Navbar from '../compo/Navbar'
import Contact from '../pages/page/Contact'
import Footer from '../compo/Footer'

function Contacts() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default Contacts
