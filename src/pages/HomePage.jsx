import React from 'react'
import Navbar from '../components/Navbar'
import MainText from '../components/MainText'
import Input from '../components/Input'
import ShortLinks from '../components/ShortLinks'

const HomePage = () => {
  return (
    <div className='text-white'>
      <Navbar />
      <div className=' flex flex-col justify-start gap-4 text-center w-full pt-20'>
        <MainText />
        <Input />
      </div>
      <div className=' w-full pt-6 px-3'>
        <ShortLinks />
      </div>
    </div>
  )
}

export default HomePage