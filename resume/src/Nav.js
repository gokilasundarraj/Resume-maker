import React from 'react'
import logo1 from './img/fullLogo.png'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className='nav'>
        <font className='f1'>
            <img src={logo1} alt='logo'/>
        </font>
        <ul className='f2'>
           <li>
          <Link to="/" className="li"><i class="fa-solid fa-house"></i>Home</Link>
        </li>
        <li>
          <Link to="/preview" className="li l2"><i class="fa-solid fa-address-card"></i> My resume</Link>
        </li>
        </ul>
    </div>
  )
}

export default Nav