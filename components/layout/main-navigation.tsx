import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import FacebookIcon from '../icons/facebook';
import TelegramIcon from '../icons/telegram';
import InstagramIcon from '../icons/instagram';
import EmailIcon from '../icons/email';

const items: string[] = [
  'Main',
  'Industry news',
  'Digitalization',
  'Roads',
  'Direct speech',
  'Technology',
  'Renovation',
];

type mainNavigationProps = {
  menuItems?: string[];
};

const mainNavigation: React.FC<mainNavigationProps> = ({
  menuItems = items,
}) => {
  return (
    <aside className="fixed h-[100%] w-[222px]  overflow-auto bg-asphalt">
      <div className="ml-8 mr-8 mt-8 flex h-[90%] flex-col">
        <Link href="/">
          <Image src={logo} alt="Build media logo" className="max-w-full" />
        </Link>
        <nav>
          <div className="mr-5 mt-12">
            <ul className="font-bold text-white">
              {menuItems.map((el) => (
                <li
                  key={menuItems.indexOf(el)}
                  className="mb-[6px] first:text-orange"
                >
                  <Link href="#" className="hover:text-orange">
                    {el}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mt-auto flex justify-between">
          <FacebookIcon />
          <TelegramIcon />
          <InstagramIcon />
          <EmailIcon />
        </div>
				<p className='text-lightGrey text-xs mt-2'>Created by Andrey V. Babkin, 2022</p>
      </div>
    </aside>
  );
};

export default mainNavigation;
