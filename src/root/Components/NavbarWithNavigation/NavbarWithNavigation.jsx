import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Monitor,
  Moon,
  Sun,
  ChevronRight,
  SunDim,
  Laptop,
  Search,
  Menu,
  X,
  Home,
  Cake,
  Gift,
  Info,
  Phone,
  Table2Icon,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/AuthContext/AuthContext";
import { navigateLinks } from "@/data/data";
import { useTheme } from "@/components/Theme/theme-provider"; // You'll need to create this

// Sample search suggestions array - you can replace this with your actual data
const searchSuggestions = [
  { id: 1, name: "Chocolate Cake", category: "Cakes", icon: "🍫" },
  { id: 2, name: "Vanilla Cake", category: "Cakes", icon: "🍦" },
  { id: 3, name: "Red Velvet", category: "Cakes", icon: "🍰" },
  { id: 4, name: "Birthday Special", category: "Offers", icon: "🎂" },
  { id: 5, name: "Anniversary Package", category: "Offers", icon: "💝" },
  { id: 6, name: "Cupcakes", category: "Categories", icon: "🧁" },
  { id: 7, name: "Pastries", category: "Categories", icon: "🥐" },
  { id: 8, name: "Wedding Cakes", category: "Special", icon: "💒" },
];

// ============= SMALLER COMPONENTS =============

// Theme Provider Setup (create this in a separate file: @/components/theme-provider.jsx)
/*
import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
*/

// Search Suggestions Component
const SearchSuggestions = ({ suggestions, onSelect, isVisible }) => {
  const { theme } = useTheme();
  
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <p className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2">Popular Suggestions</p>
        {suggestions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{item.category}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex rounded-r-xl overflow-hidden shadow-sm h-[44px]">
      <Button
        variant="ghost"
        onClick={() => setTheme("light")}
        className={`px-3 py-1.5 rounded-none border-r border-gray-300 dark:border-gray-600 h-full ${
          theme === 'light' 
            ? 'bg-purple-500 text-white hover:bg-purple-600' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <SunDim className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => setTheme("dark")}
        className={`px-3 py-1.5 rounded-none border-r border-gray-300 dark:border-gray-600 h-full ${
          theme === 'dark' 
            ? 'bg-purple-500 text-white hover:bg-purple-600' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <Moon className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => setTheme("system")}
        className={`px-3 py-1.5 rounded-none h-full ${
          theme === 'system' 
            ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <Laptop className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};

// Offer Badge Component
const OfferBadge = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center justify-between bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-700 rounded-l-xl px-3 py-1.5 w-full max-w-[240px] hover:bg-purple-200 dark:hover:bg-purple-900/50 transition cursor-pointer h-[44px] border-r-0">
      <div className="flex items-center gap-2">
        <img
          src="https://i.ibb.co/3R9W2sK/cake.png"
          alt="offer"
          className="w-8 h-8 rounded-full border dark:border-gray-600"
        />
        <div>
          <h3 className="text-purple-700 dark:text-purple-300 font-semibold text-xs">
            Valentine’s Day
          </h3>
          <p className="text-[10px] text-purple-600 dark:text-purple-400">2 days</p>
        </div>
      </div>
      <ChevronRight className="text-purple-600 dark:text-purple-400" size={16} />
    </div>
  );
};

// Desktop Search Component with Suggestions
const DesktopSearch = ({ searchTerm, setSearchTerm, showSuggestions, setShowSuggestions, suggestions, onSelectSuggestion }) => {
  const searchRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <div className="relative w-full max-w-[380px]" ref={searchRef}>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for cakes, categories, or flavors..."
        className="w-full pl-8 pr-10 py-1.5 h-[44px] rounded-none border-l-0 border-r-0 focus:ring-0 focus:outline-none bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
      />
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-3.5 w-3.5" />
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 dark:text-gray-500">
        ⌘K
      </span>
      
      {/* Filter suggestions based on search term */}
      <SearchSuggestions 
        suggestions={suggestions.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        )}
        onSelect={onSelectSuggestion}
        isVisible={showSuggestions && searchTerm.length > 0}
      />
    </div>
  );
};

// Mobile Search Component with Suggestions
const MobileSearch = ({ isOpen, searchTerm, setSearchTerm, showSuggestions, setShowSuggestions, suggestions, onSelectSuggestion }) => {
  const searchRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowSuggestions]);

  if (!isOpen) return null;

  return (
    <div className="w-full lg:hidden ms-auto" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for cakes..."
          className="w-full pl-9 pr-12 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500">
          ⌘K
        </span>
        
        {/* Mobile Search Suggestions */}
        <SearchSuggestions 
          suggestions={suggestions.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase())
          )}
          onSelect={onSelectSuggestion}
          isVisible={showSuggestions && searchTerm.length > 0}
        />
      </div>
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ item, className = "", isMobile = false }) => {
  const { theme } = useTheme();
  
  if (item.subItems) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center justify-between gap-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm w-full ${className}`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 ml-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          {item.subItems.map((subItem, index) => (
            <DropdownMenuItem key={index} asChild className="focus:bg-gray-100 dark:focus:bg-gray-700">
              <NavLink 
                to={subItem.path}
                className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
            ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
        } ${className}`
      }
    >
      <span className="text-lg">{item.icon}</span>
      <span className="font-medium ps-1">{item.label}</span>
    </NavLink>
  );
};

// Navigate Content Component
const NavigateContent = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full py-2 bg-white dark:bg-gray-900">
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
};

// Mobile Left Sheet Component
const MobileLeftSheet = ({ navLinks }) => {
  const { theme } = useTheme();
  
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="shrink-0 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <div className="flex flex-col h-full">
          {/* Mobile Logo in Sheet */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <img
              className="w-40 dark:brightness-90"
              src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
              alt="Logo"
            />
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <SheetClose asChild>
                      <a
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 rounded-lg transition-colors"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{link.name}</span>
                      </a>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Footer Actions */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
              Account
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ShoppingCart className="h-5 w-5" />
              Cart (0)
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Mobile Right Icons Component
const MobileRightIcons = ({ 
  onSearchClick, 
  isRightMenuOpen, 
  setIsRightMenuOpen 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex items-center gap-1 lg:hidden">
      {/* Table2Icon Button with Right Sheet */}
      <Sheet open={isRightMenuOpen} onOpenChange={setIsRightMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Table2Icon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px] p-0 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
          <div className="flex flex-col h-full">
            {/* Header with Close Button */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">Navigation Menu</h2>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsRightMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            {/* Navigate Content in Mobile Sheet */}
            <NavigateContent />
          </div>
        </SheetContent>
      </Sheet>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSearchClick}
        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" className="relative text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
        <ShoppingCart className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          0
        </span>
      </Button>

      <Button variant="ghost" size="icon" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
        <User className="h-5 w-5" />
      </Button>
    </div>
  );
};

// Desktop Right Section Component
const DesktopRightSection = ({ 
  searchTerm, 
  setSearchTerm, 
  showSuggestions, 
  setShowSuggestions,
  suggestions,
  onSelectSuggestion 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="hidden lg:flex items-center w-full justify-end gap-4">
      <OfferBadge />
      <DesktopSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
      />
      <div className="flex items-center ms-6 gap-4">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="ml-0 h-[44px] w-[44px] rounded-r-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-l border-gray-300 dark:border-gray-600 ms-4 text-gray-600 dark:text-gray-300"
        >
          <User className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};

// ============= MAIN COMPONENT =============

const NavbarWithNavigation = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();

  // Navigation links data
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cakes", href: "/cakes", icon: Cake },
    { name: "Offers", href: "/offers", icon: Gift },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    // Add your navigation logic here
    console.log('Selected:', suggestion);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full bg-white dark:bg-gray-900 shadow-sm flex flex-col lg:flex-row items-center justify-between p-4 lg:px-8 gap-4 lg:gap-0 relative border-b border-gray-200 dark:border-gray-800">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          <MobileLeftSheet navLinks={navLinks} />

          {/* Logo - Hidden on mobile */}
          <div className="hidden lg:block flex-shrink-0">
            <img
              className="w-32 sm:w-40 lg:w-52 h-auto dark:brightness-90"
              src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
              alt="Logo"
            />
          </div>

          <MobileRightIcons 
            onSearchClick={() => setIsSearchOpen(!isSearchOpen)}
            isRightMenuOpen={isRightMenuOpen}
            setIsRightMenuOpen={setIsRightMenuOpen}
          />
        </div>

        {/* Mobile Search Bar with Suggestions */}
        <MobileSearch 
          isOpen={isSearchOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={searchSuggestions}
          onSelectSuggestion={handleSuggestionSelect}
        />

        {/* Desktop Sections with Search Suggestions */}
        <DesktopRightSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          suggestions={searchSuggestions}
          onSelectSuggestion={handleSuggestionSelect}
        />
      </div>

      {/* Bottom Navigation Bar - Hidden on mobile, visible on desktop */}
      <div className="hidden lg:block border-t border-gray-200 dark:border-gray-800">
        <NavigateContent />
      </div>
    </>
  );
};

export default NavbarWithNavigation;