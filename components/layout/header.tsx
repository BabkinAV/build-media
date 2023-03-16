import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoSmall from '../../public/logo.png'
import Hamburger from './hamburger';

const Header = () => {
  return (
    <header className="fixed z-10 h-[67px] w-full bg-asphalt sm:hidden">
      <div className="pl-[19px] pt-6 w-max">
        <Hamburger />
      </div>
			<Link href="/" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <Image src={logoSmall} alt="Build media logo" width={48}/>
      </Link>
    </header>
  );
};

export default Header;
