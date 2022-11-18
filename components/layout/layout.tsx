import React, { Fragment, FunctionComponent } from 'react'
import MainNavigation from './main-navigation';

interface LayoutProps {
	children: JSX.Element,
}

function Layout(props: LayoutProps) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout;