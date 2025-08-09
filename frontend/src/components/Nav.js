import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');                                        
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/signup')        
  }
  return (
    <div>
      <img alt="logo" className='logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4DF-c3Ls1U1IbvkLi2nuLms1VybBBhXUoavCqOjIjS9LJ4IeSkGBcJ9eAN6eyQ80ZyQk&usqp=CAU'></img>
      {auth ? <ul className='nav-ul'>
        <li><Link to = '/' > Products </Link></li>
        <li><Link to = '/add' > Add Product </Link></li>
       <li><Link to = '/update' > Update Product </Link></li> 
        <li><Link to = '/profile' > Profile </Link></li>
        <li><Link onClick={logout} to = '/signup' > LogOut( ({JSON.parse(auth).Name}))</Link></li>
      </ul> :
        <ul className='nav-ul  nav-right'>
          <li><Link to = '/signup' > SignUp </Link></li>
          <li><Link to = '/login' > Login </Link></li>
        </ul>
      }
    </div>
  )
}
export default Nav;