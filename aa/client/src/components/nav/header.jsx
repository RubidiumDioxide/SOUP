import { useState } from 'react';
import { Link } from 'react-router-dom' ;
import './header.css'; 

export default function Header(){
  const [current, setCurrent] = useState('h');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <header>
      <nav>
        <Link to="/welcome" class="nav-link">SignUp & LogIn</Link>
        <Link to="/allprojects" class="nav-link">All Projects</Link>
        <Link to={`/user`} class="nav-link">My Profile</Link>
        <Link to="/myprojects" class="nav-link">My Projects</Link>
        <Link to="/notifications" class="nav-link">Notifications</Link>
      </nav>
    </header>
  )
}; 