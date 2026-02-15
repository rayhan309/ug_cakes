import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navigateLinks } from '@/data/data';

function Navigate() {
  const [windowWidth, setWindowWidth] = useState(0);

  // Get window width on mount and resize
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth(); // Initial call
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const NavItem = ({ item, className = "", isMobile = false }) => {
    if (item.subItems) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className={`flex   items-center justify-between gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-sm w-full ${className}`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 ml-4">
            {item.subItems.map((subItem, index) => (
              <DropdownMenuItem key={index} asChild>
                <NavLink 
                  to={subItem.path}
                  className="w-full px-3 py-2 text-sm hover:bg-gray-100"
                >
                  {subItem.label}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center px-1 rounded-lg transition-colors text-sm w-full ${
            isActive 
              ? 'bg-blue-50 text-blue-600 font-medium ' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 '
          } ${className}`
        }
      >
        <span className="text-lg ">{item.icon}</span>
        <span className="font-medium ps-1">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <div className="w-full py-2">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Horizontal View (1024px+) */}
        <div className="hidden lg:flex items-center justify-center gap-2">
          {navigateLinks.map((item) => (
            <div key={item.id}>
              <NavItem item={item} />
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Vertical List View (< 1024px) */}
        <div className="lg:hidden">
          <nav className="flex flex-col space-y-1 max-w-md mx-auto">
            {navigateLinks.map((item) => (
              <NavItem key={item.id} item={item} isMobile={true} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

function NavigateBar() {
  return (
    <div>
      <Navigate />
    </div>
  );
}

export default NavigateBar;