import React from 'react'
import Navbar from '../compo/Navbar'
import Auction from '../pages/page/Auction'
import Footer from '../compo/Footer'

function Auctions() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Auction />
      </div>
      <Footer />
    </div>
  )
}

export default Auctions;
