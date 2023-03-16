import React from 'react';
import Hamburger from './hamburger';

const Header = () => {
  return (
    <header className="fixed z-10 h-[67px] w-full bg-asphalt sm:hidden">
      <div className="pl-[19px] pt-6 w-max">
        <Hamburger />
      </div>
    </header>
  );
};

export default Header;
