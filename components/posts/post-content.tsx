import React from 'react';
import PostHeader from './post-header';


const PostContent = () => {
  return (
    <article>
      <div className="h-[1000px] rounded-[19px] bg-lightestGrey">
				<PostHeader />
				<p>post content</p>
			</div>
    </article>
  );
};

export default PostContent;
