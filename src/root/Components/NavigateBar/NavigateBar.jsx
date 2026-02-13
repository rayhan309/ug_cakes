import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navigateLinks } from '@/data/data';

function Navigate() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [visibleLinks, setVisibleLinks] = useState([]);
  const [hiddenLinks, setHiddenLinks] = useState([]);

  // Get window width on mount and resize
  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth(); // Initial call
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  // Calculate how many links to show based on screen width
  useEffect(() => {
    if (windowWidth === 0) return;

    let visibleCount = navigateLinks.length; // Default: show all

    // Calculate based on screen width
    if (windowWidth >= 1024) {
      // Large screens: show all
      visibleCount = navigateLinks.length;
    } else if (windowWidth >= 768) {
      // Tablets: show 5 links
      visibleCount = 5;
    } else if (windowWidth >= 480) {
      // Small tablets/large phones: show 3 links
      visibleCount = 3;
    } else if (windowWidth >= 375) {
      // Medium phones: show 2 links
      visibleCount = 2;
    } else {
      // Very small phones (320px): show 1 link
      visibleCount = 1;
    }

    // Ensure we don't show more than total links
    visibleCount = Math.min(visibleCount, navigateLinks.length);
    
    setVisibleLinks(navigateLinks.slice(0, visibleCount));
    setHiddenLinks(navigateLinks.slice(visibleCount));
  }, [windowWidth]);

  const NavItem = ({ item, className = "", hideLabel = false }) => {
    if (item.subItems) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className={`flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-xs sm:text-sm ${className}`}>
            <span>{item.icon}</span>
            {!hideLabel && <span className="font-medium">{item.label}</span>}
            <ChevronDown className="h-3 w-3 ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
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
          `flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm whitespace-nowrap ${
            isActive 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          } ${className}`
        }
      >
        <span>{item.icon}</span>
        {!hideLabel && <span className="font-medium">{item.label}</span>}
      </NavLink>
    );
  };

  return (
    <div className="w-full py-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-center items-center">
          {/* Desktop - All Links (1024px+) */}
          <div className="hidden lg:flex items-center gap-1">
            {navigateLinks.map((item) => (
              <div key={item.id}>
                <NavItem item={item} />
              </div>
            ))}
          </div>

          {/* Tablet/Mobile - Dynamic Links + More */}
          <div className="flex lg:hidden items-center gap-1 justify-center">
            {/* Very small screens (320px): Show icons only */}
            {windowWidth < 375 && visibleLinks.map((item) => (
              <div key={item.id}>
                <NavItem item={item} hideLabel={true} />
              </div>
            ))}

            {/* Small screens (375px+): Show icons + labels */}
            {windowWidth >= 375 && visibleLinks.map((item) => (
              <div key={item.id}>
                <NavItem item={item} />
              </div>
            ))}

            {/* More Dropdown if there are hidden links */}
            {hiddenLinks.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 hover:text-gray-900 text-xs sm:text-sm">
                  <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="font-medium">More</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {hiddenLinks.map((item) => (
                    <DropdownMenuItem key={item.id} asChild>
                      <NavLink
                        to={item.path}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-sm"
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </NavLink>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
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