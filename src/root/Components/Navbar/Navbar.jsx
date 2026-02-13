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

        {/* Logo - Hidden on mobile */}
        <div className="hidden lg:block flex-shrink-0">
          <img
            className="w-32 sm:w-40 lg:w-52 h-auto"
            src="https://i.ibb.co/nNjY5t0b/long-logo-sd.webp"
            alt="Logo"
          />
        </div>

        {/* Mobile Right Icons */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon">
            <Monitor className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
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

      {/* Desktop Sections with Equal Height - Attached */}
      <div className="hidden lg:flex items-center w-full justify-center gap-4">
        {/* Offer Badge */}
        <div className="flex items-center justify-between bg-purple-100 border border-purple-300 rounded-l-xl px-3 py-1.5 w-full max-w-[240px] hover:bg-purple-200 transition cursor-pointer h-[44px] border-r-0">
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/3R9W2sK/cake.png"
              alt="offer"
              className="w-8 h-8 rounded-full border"
            />
            <div>
              <h3 className="text-purple-700 font-semibold text-xs">
                Valentine’s Day
              </h3>
              <p className="text-[10px] text-purple-600">2 days</p>
            </div>
          </div>
          <ChevronRight className="text-purple-600" size={16} />
        </div>

        {/* Desktop Search - Attached to Offer Badge */}
        <div className="relative w-full max-w-[380px]">
          <Input
            type="text"
            placeholder="Search for cakes, categories, or flavors..."
            className="w-full pl-8 pr-10 py-1.5 h-[44px] rounded-none border-l-0 border-r-0 focus:ring-0 focus:outline-none"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
            ⌘K
          </span>
        </div>

        {/* Theme Icons and User Icon - Attached to Search */}
        <div className="flex items-center ms-6 gap-4">
          {/* Theme Toggle Group */}
          <div className="inline-flex rounded-r-xl overflow-hidden shadow-sm h-[44px]">
            <Button
              variant="ghost"
              className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-none border-r border-gray-300 h-full"
            >
              <SunDim className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-1.5 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-none border-r border-gray-300 h-full"
            >
              <Moon className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              className="px-3 py-1.5 bg-gradient-to-b from-purple-500 to-purple-700 text-white rounded-none h-full hover:from-purple-600 hover:to-purple-800"
            >
              <Laptop className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* User Icon - Separate from theme toggle group */}
          <Button
            variant="ghost"
            size="icon"
            className="ml-0 h-[44px] w-[44px] rounded-r-xl bg-gray-100 hover:bg-gray-200 border-l border-gray-300 ms-4"
          >
            <User className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;