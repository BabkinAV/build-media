import React from 'react';
import Footer from './footer';
import MainNavigation from './main-navigation';
import { Category } from '../../pages';
import Header from './header';

interface LayoutProps {
  children: JSX.Element;
  categories: Category[];
  singlePostCategory?: string;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <MainNavigation
        categories={props.categories}
        activeCategory={props.singlePostCategory}
      />
      <Header />
      <main className="flex min-h-screen flex-col justify-between pt-[55px] sm:ml-[222px]">
        <div className="pt-[29px] pl-[25px] pr-[25px] sm:pr-[58px]">
          {props.children}
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Layout;
