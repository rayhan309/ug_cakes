import React, { useState } from "react";
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

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Navigation links data
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cakes", href: "/cakes", icon: Cake },
    { name: "Offers", href: "/offers", icon: Gift },
    { name: "About", href: "/about", icon: Info },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <div className="w-full bg-white shadow-sm flex flex-col lg:flex-row items-center justify-between p-4 lg:px-8 gap-4 lg:gap-0 relative">
      {/* Logo and Mobile Menu */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-4">
        {/* Mobile Menu Trigger */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
            <div className="flex flex-col h-full">
              {/* Mobile Logo in Sheet */}
              <div className="p-6 border-b">
                <img
                  className="w-40"
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
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-colors"
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
              <div className="border-t p-4 space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <User className="h-5 w-5" />
                  Account
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  Cart (0)
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            className="w-32 sm:w-40 lg:w-52"
            src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
            alt="Logo"
          />
        </div>

        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Search Bar - Conditionally shown */}
      <div className={`w-full lg:hidden ${isSearchOpen ? "block" : "hidden"}`}>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for cakes..."
            className="w-full pl-9 pr-12 py-2"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            ⌘K
          </span>
        </div>
      </div>

      {/* Offer Badge - Hidden on mobile when search is open */}
      <div className={`${isSearchOpen ? "hidden lg:flex" : "flex"} items-center justify-between bg-purple-100 border border-purple-300 rounded-xl px-4 py-2 w-full max-w-[260px] hover:bg-purple-200 transition cursor-pointer`}>
        <div className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/3R9W2sK/cake.png"
            alt="offer"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <h3 className="text-purple-700 font-semibold text-sm">
              Valentine’s Day
            </h3>
            <p className="text-xs text-purple-600">2 days</p>
          </div>
        </div>
        <ChevronRight className="text-purple-600" size={18} />
      </div>

      {/* Desktop Search */}
      <div className="relative w-full max-w-[420px] hidden lg:block">
        <Input
          type="text"
          placeholder="Search for cakes, categories, or flavors..."
          className="w-full pl-9 pr-12 py-2"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
          ⌘K
        </span>
      </div>

      {/* Theme Icons */}
      <div className="flex items-center gap-2">
        {/* Desktop Navigation Links - Hidden on mobile */}
        <nav className="hidden  items-center gap-1 mr-4">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-purple-700 hover:bg-purple-50"
              asChild
            >
              <a href={link.href}>{link.name}</a>
            </Button>
          ))}
        </nav>

        {/* Theme Toggle Group */}
        <div className="inline-flex rounded-xl overflow-hidden shadow-md">
          <Button
            variant="ghost"
            className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-none border-r border-gray-300 h-auto"
          >
            <SunDim className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-none border-r border-gray-300 h-auto"
          >
            <Moon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            className="px-4 py-3 sm:px-6 sm:py-4 bg-gradient-to-b from-purple-500 to-purple-700 text-white rounded-none h-auto hover:from-purple-600 hover:to-purple-800"
          >
            <Laptop className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Icon for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden relative"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            0
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;