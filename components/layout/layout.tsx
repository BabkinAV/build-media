import React, { Fragment, FunctionComponent } from 'react';
import MainNavigation from './main-navigation';

interface LayoutProps {
  children: JSX.Element;
}

function Layout(props: LayoutProps) {
  return (
    <>
      <aside className="fixed h-[100%] overflow-auto  w-[222px] bg-blue-200">
        <MainNavigation />
      </aside>
      <main className="ml-[222px] bg-pink-100">{props.children}</main>
    </>
  );
}

export default Layout;
