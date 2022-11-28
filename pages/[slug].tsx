import React from 'react';
import { Router, useRouter } from 'next/router';
import Card from '../components/card/card';
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const PostPage = () => {
  const router = useRouter();
  return (
    <div className="grid max-w-7xl grid-flow-row grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-5">
      <div className="row-span-full h-[1000px] bg-blue-200">
        Main Content Area
      </div>
      <div className='flex flex-col gap-5'>
        {arr.map((el) => (
          <div className="col-start-2" key={el}>
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
