import React from 'react';
import Image from 'next/image';
import logo from '../../public/logo.png';


const mainNavigation = () => {
  return (
    <aside className="fixed h-[100%] w-[222px]  overflow-auto bg-asphalt">
			<Image
        src={logo}
        alt="Build media logo"
				className='ml-10 mt-8'
      />
      <nav>mainNavigation</nav>
    </aside>
  );
};

export default mainNavigation;
