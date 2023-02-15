import React from 'react'
import Navbar from './Navbar'

export default function layout({children}) {
  return (
    <>
      <Navbar />
      <div className='pt-16'>
        {children}
      </div>
    </>
  )
}
