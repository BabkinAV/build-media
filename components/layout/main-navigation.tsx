import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
// import axios from 'axios';
import logo from '../../public/logo.png';
import FacebookIcon from '../icons/facebook';
import TelegramIcon from '../icons/telegram';
import InstagramIcon from '../icons/instagram';
import EmailIcon from '../icons/email';
import { Category } from '../../pages';


const MainNavigation = ({categories, activeCategory}: {categories: Category[], activeCategory?: string}) => {
	const router = useRouter();

	if (router.pathname === '/categories/[slug]') {
		activeCategory = router.query.slug as string;
		console.log(activeCategory);
	}


  return (
    <aside className="fixed h-[100%] w-[222px]  overflow-auto bg-asphalt hidden sm:block">
      <div className="ml-8 mr-8 mt-8 flex h-[90%] flex-col">
        <Link href="/">
          <Image src={logo} alt="Build media logo" className="max-w-full" />
        </Link>
        <nav>
          <div className="mr-5 mt-12">
            <ul className="font-bold text-white">
						<li key={'00'} className="mb-[6px]">
                  <Link href={`/`} className={`hover:text-orange ${router.pathname == '/'  ?  'text-orange': '' }`}>
                    Main
                  </Link>
                </li>
              {categories.map((el) => (
                <li key={el.id} className="mb-[6px]">
                  <Link href={`/categories/${el.slug}`} className={`hover:text-orange  ${activeCategory === el.slug  ?  'text-orange': '' }`}>
                    {el.name}
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
        <p className="mt-2 text-xs text-lightGrey">
          Created by Andrey V. Babkin, 2022
        </p>
      </div>
    </aside>
  );
};

export default MainNavigation;
