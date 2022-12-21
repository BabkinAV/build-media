import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import axios from 'axios';
import logo from '../../public/logo.png';
import FacebookIcon from '../icons/facebook';
import TelegramIcon from '../icons/telegram';
import InstagramIcon from '../icons/instagram';
import EmailIcon from '../icons/email';
import { Category } from '../../pages';


const MainNavigation = ({categories}: {categories: Category[]}) => {
  // const [categoryData, setCategoryData] = useState<Category[]>([
  //   { id: 0, name: 'Main', slug: 'Main' },
  // ]);

  // useEffect(() => {
  //   axios
  //     .get<Category[]>(
  //       `http://localhost/build-media/wp-json/wp/v2/categories?_fields=name,%20id,%20slug`
  //     )
  //     .then((res) => {
  //       setCategoryData([{ id: 0, name: 'Main', slug: 'Main' }, ...res.data]);
  //     })
  //     .catch((error: string) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <aside className="fixed h-[100%] w-[222px]  overflow-auto bg-asphalt">
      <div className="ml-8 mr-8 mt-8 flex h-[90%] flex-col">
        <Link href="/">
          <Image src={logo} alt="Build media logo" className="max-w-full" />
        </Link>
        <nav>
          <div className="mr-5 mt-12">
            <ul className="font-bold text-white">
              {categories.map((el) => (
                <li key={el.id} className="mb-[6px] first:text-orange">
                  <Link href={`/categories/${el.slug}`} className="hover:text-orange">
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
