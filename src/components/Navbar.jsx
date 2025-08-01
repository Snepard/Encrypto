import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='text-white bg-black-900-200 h-13 flex justify-between items-center px-8 py-3'>
        <img src={logo} alt="ENCRYPTO" className='logo h-10 rounded-xl m-2 border-2 border-indigo-300'/>
        <ul>
        </ul>
    </nav>
  )
}

export default Navbar
