import React from 'react';
import Footer from './footer';
import MainNavigation from './main-navigation';
import { Category } from '../../pages';

interface LayoutProps {
  children: JSX.Element;
	categories: Category[];
	singlePostCategory?: string;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <MainNavigation categories={props.categories} activeCategory={props.singlePostCategory}/>
      <div className="ml-[222px]">
        <main>
          <div className="pt-[29px] pl-[25px] pr-[58px]">{props.children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
