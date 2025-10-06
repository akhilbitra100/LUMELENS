import React from 'react'
import Navbar from '../compo/Navbar'
import SellerDashboard from '../pages/page/SellerDashboard'
import Footer from '../compo/Footer'

function SellerDashboards() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <SellerDashboard />
      </div>
      <Footer />
    </div>
  )
}

export default SellerDashboards;
