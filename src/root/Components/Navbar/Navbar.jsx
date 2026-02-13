import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';
import { BiArrowFromLeft } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  

  return (
    <nav className='flex'>
      <div>
        <img src="/public/img/long-logo-dark-sd.webp" className='w-100' alt="" />
      </div>
      <div className='flex'>
      <img src="/public/img/valentines-day.webp" alt="" className='size-8 rounded-full'/>
      <div>
        <h1>Valentine's Day</h1>
        <h1>Tomorrow</h1>
      </div>
        <IoIosArrowForward />
      </div>
      <div>
    <Field orientation="horizontal">
      <Input type="search" placeholder="Search..." />
      <Button>Search</Button>
    </Field>

      </div>
    </nav>
  );
};

export default Navbar;