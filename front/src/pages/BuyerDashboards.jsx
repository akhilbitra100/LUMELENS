import React from 'react'
import Navbar from '../compo/Navbar'
import BuyerDashboard from '../pages/page/BuyerDashboard'
import Footer from '../compo/Footer'

function BuyerDashboards() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <BuyerDashboard />
      </div>
      <Footer />
    </div>
  )
}

export default BuyerDashboards;
