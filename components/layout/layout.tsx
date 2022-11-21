import React, { Fragment, FunctionComponent } from 'react';
import MainNavigation from './main-navigation';

interface LayoutProps {
  children: JSX.Element;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <MainNavigation />
      <main className="ml-[222px] bg-pink-100">
        <div className="pt-[29px] pl-[25px] pr-[58px]">{props.children}</div>
      </main>
    </>
  );
}

export default Layout;
