import React from 'react';
import PostHeader from './post-header';

interface PostContentProps {
  title: string;
  imageLink: string;
  categoryName: string;
  postDate: string;
  postContent: string;
	categorySlug: string
}

const PostContent = ({
  postContent,
  title,
  categoryName,
	postDate,
	imageLink,
	categorySlug
}: PostContentProps) => {
  return (
    <article>
      <div className=" rounded-[19px] bg-lightestGrey">
        <PostHeader title={title} categoryName={categoryName} postDate={postDate} imageLink={imageLink} categorySlug={categorySlug}/>
        <div
          className="px-5 py-4 text-base text-asphalt [&>h2]:font-bold [&>h2]:text-xl [&>h2]:my-5 [&>p]:my-2"
          dangerouslySetInnerHTML={{ __html: postContent }}
        ></div>
      </div>
    </article>
  );
};

export default PostContent;
