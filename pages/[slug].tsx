import React from 'react';
import { Router, useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  return (
    <div>
      <h1>Single post page: {router.query.slug}</h1>
    </div>
  );
};

export default PostPage;
