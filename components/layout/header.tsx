import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import Hamburger from './hamburger';

const Header = ({
  isOpenNavigation,
  setIsOpenNavigation,
}: {
  isOpenNavigation: boolean;
  setIsOpenNavigation: () => void;
}) => {
  return (
    <header className="fixed z-[100] h-[67px] w-full bg-asphalt sm:hidden">
      <div className="w-max pl-[19px] pt-6">
        <Hamburger
          setIsOpenNavigation={setIsOpenNavigation}
          isOpenNavigation={isOpenNavigation}
        />
      </div>
      <Link
        href="/"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
      >
        <Image src={logo} alt="Build media logo" width={48} />
      </Link>
    </header>
  );
};

export default Header;
