import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='text-white bg-black-900-200 h-13 flex justify-between items-center px-8 py-3'>
        <img src={logo} alt="ENCRYPTO" className='logo h-10 rounded-xl m-2 border-2 border-indigo-300'/>
        <ul>
            <li className='flex gap-8 text-xl m-2'>
                <a className='hover:font-bold hover:underline text-indigo-300 duration-100' href='#'>Login</a>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
