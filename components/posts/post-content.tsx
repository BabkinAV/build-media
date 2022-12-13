import React from 'react';
import PostHeader from './post-header';

interface PostContentProps {
  title: string;
  // imageLink: string;
  categoryName: string;
  // postDate: string;
  postContent: string;
}

const PostContent = ({
  postContent,
  title,
  categoryName,
}: PostContentProps) => {
  return (
    <article>
      <div className=" rounded-[19px] bg-lightestGrey">
        <PostHeader title={title} categoryName={categoryName} />
        <div
          className="px-5 py-4 text-base text-asphalt"
          dangerouslySetInnerHTML={{ __html: postContent }}
        ></div>
      </div>
    </article>
  );
};

export default PostContent;
