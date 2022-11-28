import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import myPic from '../../assets/image 1.png';

const Card = () => {
  return (
    <Link href="/about">
      <div className="h-80 rounded-[19px] bg-lightestGrey px-[20px] pt-[15px] pb-[40px] relative">
        {/* transition-all hover:translate-y-[-5px] hover:shadow-md */}
        <div className="flex flex-col h-full justify-between">
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
				<div className='font-medium text-darkGrey'>
					<span>Industry news</span><span className='mx-2'>&#183;</span><span>27.11.2022</span>
				</div>
      </div>
    </Link>
  );
};

export default Card;
