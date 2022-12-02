import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import myPic from '../../assets/image 1.png';

interface CardProps {
  className?: string;
}

const Card = ({ ...props }: CardProps) => {
  return (
    <Link href="/about">
      <div className="relative h-80 rounded-[19px] bg-lightestGrey px-[20px] pt-[15px] pb-[40px]">
        {/* transition-all hover:translate-y-[-5px] hover:shadow-md */}
        <div className="flex h-full flex-col justify-between">
          <div>
            <h5 className="text-lg font-medium">
              The contractor continues construction of the largest sewer in Ufa
            </h5>
            <p className="font-light">The line will be approximately...</p>
          </div>
          <div className="h-[150px] w-[100%]">
            <Image
              src={myPic}
              alt="Picture of the author"
              width={600}
              height={400}
            />
          </div>
        </div>
        <div className="absolute bottom-2 left-5 font-medium text-darkGrey">
          <span>Industry news</span>
          <span className="mx-2">&#183;</span>
          <span>27.11.2022</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
