import React from 'react'
import Header from '../Components/Header/Header'
import AllChats from '../Components/AllChats/AllChats'
import Footer from '../Components/Footer/Footer'
import NewChat from '../Components/NewChat/NewChat'

function Homepage() {
  return (
    <>
      <Header/>
      <AllChats/>
      <NewChat/>
      <Footer/>
    </>
  )
}

export default Homepage
