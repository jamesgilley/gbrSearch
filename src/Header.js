import React from 'react'
import {Link} from 'react-router-dom';

function Header() {
  
  return (
    <div>


        <h3><Link to="/"><b>Search books</b></Link></h3>

        <h3><Link to="/saves"><b>Saved books</b></Link></h3>
    
    </div>
  )
}

export default Header