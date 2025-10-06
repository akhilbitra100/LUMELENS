import React from 'react'
import Navbar from '../compo/Navbar'
import Slider from '../compo/Slider'
import Footer from '../compo/Footer'
import Genres from '../compo/Genres'
import Ad from '../compo/Ad'
import Best from '../compo/Best'

function Home() {
  return (
    <>
      <Navbar />
      <Slider />
      <Genres />
      <Best />
      <Ad />
      <Footer />
    </>
  )
}

export default Home
