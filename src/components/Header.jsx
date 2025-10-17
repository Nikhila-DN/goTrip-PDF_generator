import React from 'react'
import logo from '../assets/goTrip_logo.svg'

const Header = () => {
  return (
    <div>
        <img 
            src={logo} 
            alt="goTrip-logo" 
            className='m-auto text-center'
        />
    </div>
  )
}

export default Header