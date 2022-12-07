import React from 'react';
import Footer from './footer';
import MainNavigation from './main-navigation';

interface LayoutProps {
  children: JSX.Element;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <MainNavigation />
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
