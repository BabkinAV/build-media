import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import myPic from '../../assets/header-1.jpg';

const PostHeader = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(46, 61, 69, 0.92) 13.62%, rgba(46, 61, 69, 0) 58.26%), url(${myPic.src}`,
      }}
      className="h-100 flex h-[400px] flex-col-reverse rounded-[19px] bg-cover bg-no-repeat px-5 py-4"
    >
      <div>
        <div className="text-base font-normal leading-4 text-white">
          <Link href="#">Industry news</Link>
        </div>
        <h2 className="text-3xl font-bold text-white py-2">
          How entrepreneurs cope with rising prices for building materials
        </h2>
        <div className="text-base font-normal leading-4 text-lighterGrey">
          <Link href="#">07.12.2021</Link>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
