import React from 'react';
import { Router, useRouter } from 'next/router';
import Card from '../components/card/card';
import PostContent from '../components/posts/post-content';
-PostContent;
let arr = [0, 1, 2, 3];

const PostPage = () => {
  const router = useRouter();
  return (
    <div className="grid max-w-7xl  grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] gap-5">
			<PostContent />
      <div className="flex flex-col gap-5">
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
