import React from 'react'
import Navbar from '../compo/Navbar'
import Search from '../compo/Search'
import Footer from '../compo/Footer'

function Searchs() {
  return (
    <div>
      <Navbar />
      <div className=" my-20 ">
      <Search />
      </div>
      <Footer />
    </div>
  )
}

export default Searchs
