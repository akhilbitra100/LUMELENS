import React from 'react'
import Navbar from '../compo/Navbar'
import Profile from '../compo/Profile'
import Footer from '../compo/Footer'

function Profiles() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Profile />
      </div>
      <Footer />
    </div>
  )
}

export default Profiles
