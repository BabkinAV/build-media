import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import myPic from '../../assets/header-1.jpg';
import dayjs from 'dayjs';

interface PostHeaderProps {
	title: string;
	categoryName: string;
	postDate: string;
	imageLink: string;
}

const PostHeader = ({title, categoryName, postDate, imageLink} : PostHeaderProps) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(46, 61, 69, 0.92) 13.62%, rgba(46, 61, 69, 0) 58.26%), url(${imageLink}`,
      }}
      className="h-100 flex h-[400px] flex-col-reverse rounded-[19px] bg-cover bg-no-repeat px-5 py-4"
    >
      <div>
        <div className="text-base font-normal leading-4 text-white">
          <Link href="#">{categoryName}</Link>
        </div>
        <h1 className="text-3xl font-bold text-white py-2">
					{title}
        </h1>
        <div className="text-base font-normal leading-4 text-lighterGrey">
          <Link href="#">{dayjs(postDate).format('DD.MM.YYYY')}</Link>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
