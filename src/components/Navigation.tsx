import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="Header_list__scGXv">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `Header_link__V7S6z ${isActive ? 'Header_link_active__4poOx' : 'false'}`
            }
          >
            Все котики
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/likedCats" 
            className={({ isActive }) => 
              `Header_link__V7S6z ${isActive ? 'Header_link_active__4poOx' : 'false'}`
            }
          >
            Любимые котики
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation; 