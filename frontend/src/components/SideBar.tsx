import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dashboard from '../assets/Images/task-actions.png';
import logo from '../assets/icons/logo.png'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
const navigate=useNavigate()
  const navItems = [
    { name: 'Home', icon: dashboard, path: '/dashboard' },
  ];

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const renderNavItemName = (name: string[] | string) => {
    if (Array.isArray(name)) {
      return (
        <span className="ml-2 text-sm text-white">
          {name[0]}
          <br />
          {name[1]}
        </span>
      );
    }
    return <span className="ml-2 text-sm text-white">{name}</span>;
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-black transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex p-2 py-3 border-gray-700 cursor-pointer`} >
        <img
          src={logo}
          alt="Company Logo"
          className={`transition-all duration-300 ${isOpen ? 'h-12 w-12' : 'h-12 w-12'}`}
        />
      </div>
      <nav className="flex-1 my-8">
        {navItems.map((item) => (
          <a
            key={item.path}
            // href={item.path}
            onClick={(e)=>{navigate(`${item.path}`)}}
            className={`flex cursor-pointer rounded-md items-center m-2 my-4 p-3 px-1 h-14 transition-colors ${location.pathname.startsWith(item.path) ? 'bg-red-600' : 'hover:bg-gray-700'}`}
          >
            <img src={item.icon} className={`h-8 w-8 ${isOpen ? 'mr-4' : 'mr-auto'}`} />
            {isOpen && renderNavItemName(item.name)}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;