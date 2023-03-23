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
import InputSearch from './InputSearch';

const MainNavigation = ({
  categories,
  activeCategory,
  isOpenNavigation,
}: {
  categories: Category[];
  activeCategory?: string;
  isOpenNavigation: boolean;
}) => {
  const router = useRouter();

  if (router.pathname === '/categories/[slug]') {
    activeCategory = router.query.slug as string;
    console.log(activeCategory);
  }

  return (
    <aside
      className={`fixed z-50 h-[100%] w-[100vw]  sm:w-[222px] ${
        isOpenNavigation ? 'translate-x-0' : '-translate-x-full '
      }  overflow-auto bg-asphalt duration-300 ease-in-out sm:translate-x-0`}
    >
      <div className="ml-8 mr-8 mt-8 flex h-[90%] flex-col">
        <Link href="/">
          <Image
            src={logo}
            alt="Build media logo"
            className="hidden max-w-full sm:block"
          />
        </Link>
        <nav>
          <div className="sm:mr-5 mt-20 text-center sm:mt-12 sm:text-left">
            <ul className="font-bold text-white">
              <li key={'00'} className="mb-5 sm:mb-[6px]">
                <Link
                  href={`/`}
                  className={`hover:text-orange ${
                    router.pathname == '/' ? 'text-orange' : ''
                  }`}
                >
                  Main
                </Link>
              </li>
              {categories.map(el => (
                <li key={el.id} className="mb-5 sm:mb-[6px]">
                  <Link
                    href={`/categories/${el.slug}`}
                    className={`hover:text-orange  ${
                      activeCategory === el.slug ? 'text-orange' : ''
                    }`}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
				<div className='mt-5'>
						<InputSearch />
				</div>
        <div className="mt-auto mb-2 flex justify-start gap-10 sm:justify-between sm:gap-0">
          <FacebookIcon />
          <TelegramIcon />
          <InstagramIcon />
          <EmailIcon />
        </div>
        <p className="mt-2 text-xs text-lightGrey">
          Created by Andrey Babkin, 2023
        </p>
      </div>
    </aside>
  );
};

export default MainNavigation;
