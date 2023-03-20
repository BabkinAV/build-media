import React, { useState } from 'react';

const Hamburger = ({isOpenNavigation, setIsOpenNavigation}: {isOpenNavigation: boolean, setIsOpenNavigation: () => void},) => {
  const genericHamburgerLine = `h-0.5 w-7 rounded-full bg-white transition ease transform duration-300`;
  return (
    <button
      className="group flex flex-col items-center justify-center "
      onClick={setIsOpenNavigation}
    >
      <div
        className={`${genericHamburgerLine} mb-[3px]  ${
          isOpenNavigation && 'translate-y-[8px] rotate-45 group-hover:opacity-100'
        }`}
      />
      <div
        className={`${genericHamburgerLine} my-[3px] ${isOpenNavigation && 'opacity-0'}`}
      />
      <div
        className={`${genericHamburgerLine} mt-[3px] ${
          isOpenNavigation && '-translate-y-[8px] -rotate-45'
        }`}
      />
    </button>
  );
};

export default Hamburger;
